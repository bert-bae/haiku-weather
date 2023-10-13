import { Controller, Get, Route, SuccessResponse, Query, Tags } from "tsoa";
import { OpenAiService } from "../services/OpenAiService";
import { IGetWeatherResult, WeatherService } from "../services/WeatherService";

interface IGetWeatherReportResult {
  weather: IGetWeatherResult;
  imageUrl: string;
  poem: string;
}

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
  public async getWeatherReport(
    @Query() lat: string,
    @Query() lon: string
  ): Promise<IGetWeatherReportResult> {
    const weather = await this.weather.getWeather({
      lat,
      lon,
    });

    const prompt = this.generateWeatherHaikuPrompt(weather.summary);
    const response = await this.openAi.getPrompt(prompt);
    const poem = response.choices[0].message;
    const image = await this.openAi.getImage(
      this.generateWeatherImagePrompt(prompt)
    );
    return {
      weather,
      imageUrl: image.data.find((img) => img.url)?.url || "",
      poem: poem.content || "",
    };
  }

  private generateWeatherImagePrompt(prompt: string): string {
    return `Van Gogh painting of a city where people are walking around experiencing ${prompt}`;
  }

  private generateWeatherHaikuPrompt(
    summary: IGetWeatherResult["summary"]
  ): string {
    const {
      temperature,
      humidity,
      weather,
      visibility,
      wind,
      cloud,
      rain,
      snow,
    } = summary;
    let weatherSentence = `the weather that is ${weather} and feels ${temperature} that is ${humidity}. The view is ${visibility} with ${cloud} skies. The wind is ${wind}.`;
    if (rain !== "None") {
      weatherSentence += ` The rain is ${rain}.`;
    }

    if (snow !== "None") {
      weatherSentence += ` The snow is ${snow}.`;
    }

    return (
      "You are a poet specializing in writing Haikus. Write me a haiku about " +
      weatherSentence
    );
  }
}
