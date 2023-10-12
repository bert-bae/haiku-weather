import { Request } from "express";
import { IOmittedUser } from "../models/user";
export interface ExtendedRequest extends Request {
  user: IOmittedUser; // or any other type
}
