import 'express';

declare module 'express' {
  interface Request {
    id_user: string;
  }
}
