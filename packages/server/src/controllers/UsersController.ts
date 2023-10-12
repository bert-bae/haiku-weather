import {
  Body,
  Controller,
  Example,
  Get,
  Path,
  Post,
  Response,
  Route,
  SuccessResponse,
  ValidateError,
  Security,
  Request,
  Tags,
} from "tsoa";
import { UserCreateRequest, UsersService } from "../services/UserService";
import { IOmittedUser, IUser } from "../models/user";

@Route("users")
@Tags("Users")
export class UsersController extends Controller {
  private userService: UsersService;
  constructor() {
    super();
    this.userService = new UsersService();
  }

  /**
   * Retrieves the details of an existing user.
   * @param id The user's unique ID
   */
  @SuccessResponse(200, "User")
  @Get("{id}")
  @Example<Omit<IUser, "password">>({
    id: "UUID",
    firstName: "Billy",
    lastName: "Bob",
    email: "tsoa@example.com",
  })
  @Security("jwt", [])
  public async getUser(
    @Path() id: string,
    @Request() req
  ): Promise<IOmittedUser> {
    return this.userService.readById(id);
  }

  /**
   * @param user The user object with email, names and password.
   * @example user {
   *  "password": "SomeSecurePassword12345",
   *  "firstName": "First",
   *  "lastName": "Last",
   *  "email": "test@example.com"
   * }
   */
  @SuccessResponse(201, "User created")
  @Response(401, "Unauthorized")
  @Response<ValidateError>(422, "Validation failed")
  @Post()
  public async createUser(
    @Body() user: UserCreateRequest
  ): Promise<{ id: string }> {
    this.setStatus(201);
    const { id } = await this.userService.create(user);
    return { id };
  }
}
