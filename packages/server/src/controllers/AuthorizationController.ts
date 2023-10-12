import {
  Body,
  Controller,
  Example,
  Post,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UsersService } from "../services/UserService";
import { IUser } from "../models/user";
import { AuthorizationError, NotFound } from "@haikuweather/common";

type UserLoginRequest = Pick<IUser, "email" | "password">;
type UserAuthorizationRequest = { token: string };

@Route("auth")
@Tags("Authorization")
export class AuthorizationController extends Controller {
  private userService: UsersService;
  constructor() {
    super();
    this.userService = new UsersService();
  }

  /**
   * Pass credentials to verify user login.
   * @param loginRequest The user email and password
   * @example login {
   *  "password": "SomeSecurePassword12345",
   *  "email": "test@example.com"
   * }
   */
  @SuccessResponse(200, "Authenticated")
  @Response<NotFound>(404, "User not found")
  @Response<AuthorizationError>(401, "Invalid crendentials")
  @Post("/login")
  @Example<UserLoginRequest>({
    email: "tsoa@example.com",
    password: "SomeComplexPassword12345",
  })
  public async login(
    @Body() login: UserLoginRequest
  ): Promise<UserAuthorizationRequest> {
    const { email, password } = login;
    const user = await this.userService.readByEmail(email);
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      throw new AuthorizationError("Invalid credentials.");
    }

    const token = this.signToken(
      JSON.stringify({ email: user.email, id: user.id, scopes: [] })
    );
    return {
      token,
    };
  }

  private signToken = (data: string) => {
    return jwt.sign(
      {
        data,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
  };
}
