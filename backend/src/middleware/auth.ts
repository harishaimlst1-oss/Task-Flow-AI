import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

type SessionToken = {
  sub: string;
  email: string;
  role: string;
  orgId: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: SessionToken;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Missing token" });
  }
  const [, token] = authHeader.split(" ");
  try {
    const decoded = jwt.verify(token, env.jwtSecret) as SessionToken;
    req.user = decoded;
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};
