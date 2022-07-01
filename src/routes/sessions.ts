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
        return res
          .status(error.response.status)
          .json({ message: error.response.data });
      }
    })
  );

  return router;
};

export { SessionsRouter };
