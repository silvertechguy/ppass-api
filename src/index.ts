import express, { Express, Response, Request } from "express";
import cors from "cors";
import Redis from "ioredis";
import { pwnedAPICheck } from "./utils/passwordChecker";
const main = async () => {
  const app: Express = express();
  app.use(cors());
  const redis = new Redis();
  app.get(
    "/api/v1/ppass",
    async (req: Request, res: Response): Promise<Response> => {
      try {
        let password;
        if (req.query && req.query.password) {
          password = (req.query as any).password; // "as" (typescript type assertion)
          //  we assert the type of req.query to be any with the keyword as
        }
        // || means if at least one of them is true do the following
        if (password === "" || password === undefined) {
          return res.json({ error: "That's not a real password!" });
        }

        const result: string | null = await redis.get(password);
        if (!result) {
          const counter: number = await pwnedAPICheck(password);
          await redis.set(password, counter);
          await redis.expire(password, 86400);
          return res.json({ counter });
        }
        return res.json({ counter: +result });
      } catch (error) {
        console.error(error);
      }
    }
  );
  const PORT: string | number = process.env.PORT || "4000";
  app.listen(parseInt(PORT), () => {
    console.log("server started on localhost:4000");
  });
};
main().catch((err) => {
  console.error(err);
});
