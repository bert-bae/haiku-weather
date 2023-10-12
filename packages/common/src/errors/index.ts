export class CustomError extends Error {
  constructor(public code: number, msg: string) {
    super(msg);
    this.message = msg;
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}

export class AuthorizationError extends CustomError {
  constructor(msg: string) {
    super(401, msg);
    this.message = "Authorzation failed: " + this.message;
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}

export class BadRequest extends CustomError {
  constructor(msg: string) {
    super(400, msg);
    this.message = "Bad request: " + this.message;
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, BadRequest.prototype);
  }
}

export class NotFound extends CustomError {
  constructor(msg: string) {
    super(404, msg);
    this.message = "Not found: " + this.message;
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NotFound.prototype);
  }
}
