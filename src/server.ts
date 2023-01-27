import express, { NextFunction, Request, response, Response } from "express";
import "express-async-errors";

const app = express();

app.use(express.json());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    response.status(400).json({
      message: err.message,
    });
  }
  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.listen(3333, () => console.log("Server is running! 🚀"));
