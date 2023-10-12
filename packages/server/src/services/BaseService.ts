import { ProviderContext } from "../contextualizer";

export abstract class BaseService {
  public ctx: ProviderContext;

  constructor(ctx: ProviderContext) {
    this.ctx = ctx;
  }

  public async create(input): Promise<any> {}
  public async read(input): Promise<any> {}
  public async readById(input): Promise<any> {}
  public async readAll(input): Promise<any> {}
  public async update(input): Promise<any> {}
  public async delete(input): Promise<any> {}
}
