export type ResponseBody<
  T = void,
  K extends number = 200000,
  L extends string = 'ok',
> = T extends void
  ? {
      message: L;
      code: K;
    }
  : {
      data: T;
      message: L;
      code: K;
    };

export interface ResponseUnauthorized<T = 401000, K = string> {
  message: K;
  code: T;
}

export interface ResponseForbidden<T = 403000, K = string> {
  message: K;
  code: T;
}

export interface ResponseNotFound<T = 404000, K = string> {
  message: K;
  code: T;
}

export interface QueryBase {
  limit: number;
  offset: number;
}
