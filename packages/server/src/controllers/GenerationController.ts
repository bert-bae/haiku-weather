import { Controller, Get, Route, SuccessResponse, Tags } from "tsoa";
import { OpenAiService } from "../services/OpenAiService";
import { WeatherService } from "../services/WeatherService";

@Route("generate")
@Tags("Generate")
export class GenerationController extends Controller {
  private openAi: OpenAiService;
  private weather: WeatherService;
  constructor() {
    super();
    this.openAi = new OpenAiService();
    this.weather = new WeatherService();
  }

  /**
   * Retrieves the details of an existing template
   * @param id The template's unique ID
   * @returns Template
   */
  @SuccessResponse(200, "Template")
  @Get("")
  public async getWeatherReport(): Promise<any> {
    const weather = await this.weather.getWeather({
      lat: "49.282730",
      lon: "-123.120735",
    });
    console.log(weather);
    // const response = await this.openAi.getPrompt(
    //   "The weather is sunny and warm. Write me a haiku about the weather."
    // );
    // const bestChoice = response.choices[0].message;
    // const image = await this.openAi.getImage(bestChoice.content || "");
    return {
      weather,
      // weatherReport: {
      //   image,
      //   message: bestChoice.content,
      // },
    };
  }
}
