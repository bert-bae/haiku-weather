import log from "loglevel";
import { Sequelize, ModelStatic } from "sequelize";
import initUserModel, { UsersModel } from "./models/user";
import initTemplateModel, { TemplatesModel } from "./models/template";

export type ProviderContext = {
  logger: {
    info: (message) => void;
    warn: (message, data) => void;
    error: (message, data) => void;
  };
  models: {
    users: ModelStatic<UsersModel>;
    templates: ModelStatic<TemplatesModel>;
  };
};

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  { ...config, operatorsAliases: true }
);

const createProviderContext = (): ProviderContext => {
  return {
    logger: log,
    models: {
      users: initUserModel(sequelize),
      templates: initTemplateModel(sequelize),
    },
  };
};

export const context = createProviderContext();
