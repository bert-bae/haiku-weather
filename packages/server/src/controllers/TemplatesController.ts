import {
  Body,
  Controller,
  Example,
  Get,
  Path,
  Post,
  Put,
  Response,
  Route,
  SuccessResponse,
  ValidateError,
  Security,
  Request,
  Tags,
} from "tsoa";
import { ITemplate } from "../models/template";
import TemplatesService from "../services/TemplatesService";
import { ExtendedRequest } from "./extensions.type";

@Route("templates")
@Tags("Templates")
export class TemplatesController extends Controller {
  private templateService: TemplatesService;
  constructor() {
    super();
    this.templateService = new TemplatesService();
  }

  /**
   * Retrieves the details of an existing template
   * @param id The template's unique ID
   * @returns Template
   */
  @SuccessResponse(200, "Template")
  @Get("{id}")
  @Example<ITemplate>({
    id: "UUID",
    userId: "UUID",
    content: "Template Content",
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  @Security("jwt", [])
  public async getTemplate(@Path() id: string): Promise<ITemplate> {
    return this.templateService.readById(id);
  }

  /**
   * @param template The template content.
   * @example template {
   *  "content": "Some template content"
   * }
   */
  @SuccessResponse(201, "Template created")
  @Response(401, "Unauthorized")
  @Response<ValidateError>(422, "Validation failed")
  @Post("")
  @Security("jwt", [])
  public async createTemplate(
    @Request() req: ExtendedRequest,
    @Body() template: Pick<ITemplate, "content">
  ): Promise<{ id: string }> {
    this.setStatus(201);
    const { id } = await this.templateService.create({
      ...template,
      userId: req.user!.id,
    });
    return { id };
  }

  @SuccessResponse(200, "Template Updated")
  @Response(401, "Unauthorized")
  @Response<ValidateError>(422, "Validation failed")
  @Put("{id}")
  @Security("jwt", [])
  public async updateTemplate(
    @Path() id: string,
    @Body() template: Pick<ITemplate, "content">,
    @Request() request: ExtendedRequest
  ): Promise<void> {
    this.setStatus(200);
    await this.templateService.updateOne({
      id,
      userId: request.user!.id,
      content: template.content,
    });
  }
}
