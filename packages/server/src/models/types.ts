import { Model } from "sequelize";

export type Constructor<T> = new (...args: any[]) => T;
export type ModelType<T extends Model<T>> = Constructor<T> & typeof Model;

export type ExtendedWithDate<T> = T & {
  createdAt: Date;
  updatedAt: Date;
};

export interface IDateProperties {
  createdAt: Date;
  updatedAt: Date;
}
