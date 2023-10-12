import { v4 } from "uuid";
import bcrypt from "bcrypt";
import { IOmittedUser, IUser } from "../models/user";
import { BaseService } from "./BaseService";
import { context } from "../contextualizer";
import { BadRequest, NotFound } from "@haikuweather/common";

export type UserCreateRequest = Omit<IUser, "id">;

export class UsersService extends BaseService {
  private salt: number;
  constructor() {
    super(context);
    this.salt = 12;
    this.create = this.create.bind(this);
    this.readByEmail = this.readByEmail.bind(this);
    this.readById = this.readById.bind(this);
    this.readAll = this.readAll.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async readByEmail(email: string): Promise<IUser> {
    const found = await this.ctx.models.users.findOne({ where: { email } });
    if (!found) {
      throw new NotFound(`User with email ${email} does not exist.`);
    }
    const user = found.toJSON();
    return user;
  }

  public async readById(id: string): Promise<IOmittedUser> {
    const found = await this.ctx.models.users.findOne({ where: { id } });
    if (!found) {
      throw new NotFound(`User with ID ${id} does not exist.`);
    }
    const user = found.toJSON();
    return this.redact(user);
  }

  public async create(user: UserCreateRequest): Promise<IOmittedUser> {
    const newUser: IUser = {
      ...user,
      id: v4(),
      password: await this.hashPassword(user.password),
    };
    const exists = await this.ctx.models.users.findOne({
      where: { email: user.email },
    });
    if (exists) {
      throw new BadRequest(`User with email ${user.email} already exists`);
    }

    await this.ctx.models.users.create(newUser);
    return this.redact(newUser);
  }

  private redact(user: IUser): IOmittedUser {
    const clean: Partial<IUser> = user;
    delete clean.password;
    return clean as IOmittedUser;
  }

  private async hashPassword(plainPw: string) {
    const salt = await bcrypt.genSalt(this.salt);
    return bcrypt.hash(plainPw, salt);
  }
}
