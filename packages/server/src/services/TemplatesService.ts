import { FindOptions } from "sequelize";
import { v4 } from "uuid";
import { BaseService } from "./BaseService";
import { context } from "../contextualizer";
import { ITemplate } from "../models/template";
import { NotFound } from "@haikuweather/common";

export default class TemplatesService extends BaseService {
  constructor() {
    super(context);
    this.create = this.create.bind(this);
    this.readById = this.readById.bind(this);
    this.readAll = this.readAll.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async readById(id: string): Promise<ITemplate> {
    const entry = await this.ctx.models.templates.findOne({ where: { id } });
    if (!entry) {
      throw new NotFound(`Template with ID ${id} does not exist.`);
    }
    return entry;
  }

  public async create(
    input: Pick<ITemplate, "content" | "userId">
  ): Promise<ITemplate> {
    const template: ITemplate = {
      id: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...input,
    };
    await this.ctx.models.templates.create(template);
    return template;
  }

  public async readAll(input: FindOptions<ITemplate>) {
    const entries = await this.ctx.models.templates.findAll(input);
    return entries;
  }

  public async updateOne(values: Pick<ITemplate, "userId" | "content" | "id">) {
    const updated: Pick<ITemplate, "content" | "updatedAt"> = {
      content: values.content,
      updatedAt: new Date(),
    };
    return this.ctx.models.templates.update(updated, {
      where: {
        id: values.id,
        userId: values.userId,
      },
      returning: true,
    });
  }
}
