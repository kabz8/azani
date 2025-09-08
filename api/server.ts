import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { Server } from "http";
import app from "../server/app";
import { createServer } from "http";

let server: Server | undefined;

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (!server) {
    server = createServer((req_, res_) => app(req_ as any, res_ as any));
  }
  server.emit("request", req, res);
}


