import { Controller, Get, Route, SuccessResponse, Tags } from "tsoa";
import { OpenAiService } from "../services/OpenAiService";

@Route("tenerate")
@Tags("Generate")
export class TemplatesController extends Controller {
  private openAi: OpenAiService;
  constructor() {
    super();
    this.openAi = new OpenAiService();
  }

  /**
   * Retrieves the details of an existing template
   * @param id The template's unique ID
   * @returns Template
   */
  @SuccessResponse(200, "Template")
  @Get("")
  public async getWeatherReport(): Promise<any> {
    return true;
  }
}
