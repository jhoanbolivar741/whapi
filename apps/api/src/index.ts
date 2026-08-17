import { Elysia } from "elysia";
import cors from "@elysia/cors";
import { auth } from "./modules/auth";
import { initWhatsApp, whatsapp } from "./modules/whatsapp";

const app = new Elysia({ prefix: "/api" })
  .use(cors())
  .all("/auth/*", async (context) => {
    const { request, status } = context;
    if (["POST", "GET"].includes(request.method)) {
      return auth.handler(request);
    }
    return status(405);
  })
  .use(whatsapp)
  .get("/", () => "Ok")
  .listen(3000, (server) => {
    console.log(`Server is running at ${server.hostname}:${server.port}`);
    initWhatsApp();
  });

export type App = typeof app;
