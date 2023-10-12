/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GenerationController } from './../src/controllers/GenerationController';
import type { RequestHandler, Router } from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "IWeatherReport": {
        "dataType": "refObject",
        "properties": {
            "coord": {"dataType":"nestedObjectLiteral","nestedProperties":{"lat":{"dataType":"double","required":true},"lon":{"dataType":"double","required":true}},"required":true},
            "weather": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"icon":{"dataType":"string","required":true},"description":{"dataType":"string","required":true},"main":{"dataType":"string","required":true},"id":{"dataType":"double","required":true}}},"required":true},
            "base": {"dataType":"string","required":true},
            "main": {"dataType":"nestedObjectLiteral","nestedProperties":{"humidity":{"dataType":"double","required":true},"pressure":{"dataType":"double","required":true},"temp_max":{"dataType":"double","required":true},"temp_min":{"dataType":"double","required":true},"feels_like":{"dataType":"double","required":true},"temp":{"dataType":"double","required":true}},"required":true},
            "visibility": {"dataType":"double","required":true},
            "wind": {"dataType":"nestedObjectLiteral","nestedProperties":{"gust":{"dataType":"double","required":true},"deg":{"dataType":"double","required":true},"speed":{"dataType":"double","required":true}},"required":true},
            "clouds": {"dataType":"nestedObjectLiteral","nestedProperties":{"all":{"dataType":"double","required":true}},"required":true},
            "dt": {"dataType":"double","required":true},
            "sys": {"dataType":"nestedObjectLiteral","nestedProperties":{"sunset":{"dataType":"double","required":true},"sunrise":{"dataType":"double","required":true},"country":{"dataType":"string","required":true},"id":{"dataType":"double","required":true},"type":{"dataType":"double","required":true}},"required":true},
            "timezone": {"dataType":"double","required":true},
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "cod": {"dataType":"double","required":true},
            "rain": {"dataType":"nestedObjectLiteral","nestedProperties":{"3h":{"dataType":"double"},"1h":{"dataType":"double"}},"required":true},
            "snow": {"dataType":"nestedObjectLiteral","nestedProperties":{"3h":{"dataType":"double"},"1h":{"dataType":"double"}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IWeatherSummary": {
        "dataType": "refObject",
        "properties": {
            "temperature": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Freezing"]},{"dataType":"enum","enums":["Cold"]},{"dataType":"enum","enums":["Chilly"]},{"dataType":"enum","enums":["Warm"]},{"dataType":"enum","enums":["Hot"]},{"dataType":"enum","enums":["Very hot"]}],"required":true},
            "humidity": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Dry"]},{"dataType":"enum","enums":["Humid"]},{"dataType":"enum","enums":["Very humid"]}],"required":true},
            "weather": {"dataType":"string","required":true},
            "visibility": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Clear"]},{"dataType":"enum","enums":["Fog"]},{"dataType":"enum","enums":["Misty"]},{"dataType":"enum","enums":["Haze"]}],"required":true},
            "wind": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Calm"]},{"dataType":"enum","enums":["Light breeze"]},{"dataType":"enum","enums":["Moderate breeze"]},{"dataType":"enum","enums":["Strong breeze"]},{"dataType":"enum","enums":["Fresh gale"]},{"dataType":"enum","enums":["Strong gale"]},{"dataType":"enum","enums":["Whole gale"]},{"dataType":"enum","enums":["Storm"]},{"dataType":"enum","enums":["Hurricane"]}],"required":true},
            "cloud": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Clear"]},{"dataType":"enum","enums":["Some clouds"]},{"dataType":"enum","enums":["Cloudy"]}],"required":true},
            "rain": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["None"]},{"dataType":"enum","enums":["Light"]},{"dataType":"enum","enums":["Moderate"]},{"dataType":"enum","enums":["Heavy"]},{"dataType":"enum","enums":["Very heavy"]}],"required":true},
            "snow": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["None"]},{"dataType":"enum","enums":["Light"]},{"dataType":"enum","enums":["Moderate"]},{"dataType":"enum","enums":["Heavy"]},{"dataType":"enum","enums":["Very heavy"]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IGetWeatherResult": {
        "dataType": "refObject",
        "properties": {
            "raw": {"ref":"IWeatherReport","required":true},
            "summary": {"ref":"IWeatherSummary","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IGetWeatherReportResult": {
        "dataType": "refObject",
        "properties": {
            "weather": {"ref":"IGetWeatherResult","required":true},
            "imageUrl": {"dataType":"string","required":true},
            "poem": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/generate',
            ...(fetchMiddlewares<RequestHandler>(GenerationController)),
            ...(fetchMiddlewares<RequestHandler>(GenerationController.prototype.getWeatherReport)),

            function GenerationController_getWeatherReport(request: any, response: any, next: any) {
            const args = {
                    lat: {"in":"query","name":"lat","required":true,"dataType":"string"},
                    lon: {"in":"query","name":"lon","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GenerationController();


              const promise = controller.getWeatherReport.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            response.status(statusCode || 200)
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'queries':
                    return validationService.ValidateParam(args[key], request.query, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
