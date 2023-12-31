# Haiku Weather App

The Haiku weather App utilizes 3 API services to create a unique way to get your daily weather details. By using the OpenWeather API and parsing this data to digestable summaries, a prompt can be generated to OpenAI's LLM model to create a Haiku poem for us. This prompt is then used inspire the image generation model to create a painting in Van Gogh's style then displayed to users.

The location API is used on the browser so location permission is required. This information is used to identify the region to search with the OpenWeather API.

## Examples

![Gif](./examples/example.gif)
![Desktop](./examples/desktop.png)
![Mobile](./examples/mobile.png)

## Getting started

Install dependencies:

```sh
cd web && npm i
cd server && npm i
```

Setup environment variables:

```sh
cp web/.env.template web/.env
cp server/.env.template server/.env
```

- Configure the values. You need to create an OpenWeather and OpenAI account to get API keys. View Services section below.

Start:

```sh
cd Web && npm run dev
cd server && npm run dev
```

Generate Web Orval clients:

```sh
cd web && npm run compile
```

- Server needs to have run with recent changes with the OpenAPI spec file generated to `server/build/swagger.json`

#### Running with Docker

1. Setup environment variables.
2. Generate docker images with `make build`.

- Alternatively, you can go into web and server folders and run `docker build ./`

3. From project root, run `docker compose up`

## Tech Stack

Web:

- React, Typescript, Redux, React-query, and Orval
- Orval is used to generate the React-Query data generated by the server's OpenAPI specs.

Backend:

- APIs: OpenAI and OpenWeather
- Typescript, Tsoa, OpenAPI
- Tsoa is used to generate the OpenAPI specs to be used by the Web's Orval generation client.

## Services

OpenAI

- Image and report poem generation
- [Site](https://openai.com/)

OpenWeather

- Live weather data
- [Site](https://home.openweathermap.org/api_keys)
