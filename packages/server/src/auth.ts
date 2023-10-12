import { AuthorizationError } from "@haikuweather/common";
import * as express from "express";
import * as jwt from "jsonwebtoken";
import { UsersService } from "./services/UserService";

const userService = new UsersService();

const extractBearerToken = (authorization: string) => {
  const [_, token] = authorization.split(" ");
  return token;
};

const JWT_SECRET = "secret";
export function expressAuthentication(
  req: express.Request,
  securityName: string,
  scopes: string[]
): Promise<any> {
  // if (securityName === "api_key") {
  //   let token;
  //   if (req.query && req.query.access_token) {
  //     token = req.query.access_token;
  //   }

  //   if (token === "abc123456") {
  //     return Promise.resolve({
  //       id: 1,
  //       name: "Ironman",
  //     });
  //   } else {
  //     return Promise.reject({});
  //   }
  // }

  const token = extractBearerToken(
    (req.headers["authorization"] as string) || ""
  );

  return new Promise((resolve, reject) => {
    if (!token) {
      reject(new AuthorizationError("No token provided"));
    }
    jwt.verify(token, JWT_SECRET, function (err, decoded) {
      if (err) {
        reject(err);
      } else {
        // Check if JWT contains all required scopes

        for (let scope of scopes) {
          if (!decoded.scopes.includes(scope)) {
            reject(new Error("JWT does not contain required scope."));
          }
        }
        const { id } = JSON.parse(decoded.data);
        userService.readById(id).then((user) => resolve(user));
      }
    });
  });
}
