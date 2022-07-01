import axios, { AxiosError } from "axios";
import { Router } from "express";
import { asyncMiddleware } from "../middlewares/asyncMiddleware";
import { SessionService } from "../services/sessionService";

const SessionsRouter = (service: SessionService): Router => {
  const router = Router();

  router.get(
    "/:sessionId",
    asyncMiddleware(async (req, res) => {
      try {
        const sessionId = req.params.sessionId || "";
        res.status(200).json(await service.getSessionInfoById(sessionId));
      } catch (error) {
        console.error("Error happened", error);
        if (!!error && axios.isAxiosError(error)) {
          return res
            .status((error as AxiosError).response?.status || 500)
            .json({ message: (error as AxiosError).response?.data });
        }
        return new Error(`Unknown error was thrown ${error}`);
      }
    })
  );

  return router;
};

export { SessionsRouter };
