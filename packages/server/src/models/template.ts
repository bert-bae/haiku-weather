import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IDateProperties } from "./types";

export interface ITemplate extends IDateProperties {
  id: string;
  userId: string;
  content: string;
}

export class TemplatesModel extends Model<
  ITemplate,
  Optional<ITemplate, "id">
> {
  public id!: string;
  public userId!: string;
  public content!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const init = (sequelizeConnection: Sequelize) => {
  TemplatesModel.init(
    {
      id: {
        type: DataTypes.STRING,
        autoIncrement: false,
        primaryKey: true,
      },
      userId: DataTypes.STRING,
      content: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize: sequelizeConnection,
      timestamps: true,
      modelName: "Templates",
    }
  );
  return TemplatesModel;
};

export default init;
