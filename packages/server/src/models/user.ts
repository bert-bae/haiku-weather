import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { ExtendedWithDate } from "./types";

/**
 * User objects allow you to associate actions performed
 * in the system with the user that performed them.
 * The User object contains common information across
 * every user in the system regardless of status and role.
 */
export interface IUser {
  /**
   * The unique identifier provided by the API
   * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}
   * @example "52907745-7672-470e-a803-a2f8feb52944"
   */
  id: string;
  /**
   * The email the user used to register his account
   * @pattern ^(.+)@(.+)$ please provide correct email
   * @example tsoa@example.com
   */
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface IOmittedUser extends Omit<IUser, "password"> {}

export class UsersModel extends Model<
  ExtendedWithDate<IUser>,
  Optional<IUser, "id">
> {
  public id!: string;
  public email!: string;
  public password!: string;
  public firstName?: string;
  public lastName?: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const init = (sequelizeConnection: Sequelize) => {
  UsersModel.init(
    {
      id: {
        type: DataTypes.STRING,
        autoIncrement: false,
        primaryKey: true,
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize: sequelizeConnection,
      timestamps: true,
      modelName: "Users",
    }
  );
  return UsersModel;
};

export default init;
