import SessionClient from "../clients/internalClient";
import { SessionData } from "../types/session";
import validationService from "./validationService";
import transformerService from "./transformerService";

export default class SessionService {
  private sessionClient: SessionClient;

  constructor(sessionClient: SessionClient) {
    this.sessionClient = sessionClient;
  }

  public async getSessionInfoById(sessionUuid: string): Promise<SessionData> {
    let [sessionInfo, sessionMedia, sessionContext] = await Promise.all([
      this.sessionClient.getSessionById(sessionUuid),
      this.sessionClient.getSessionMediaById(sessionUuid),
      this.sessionClient.getSessionContextById(sessionUuid),
    ]).catch((err) => {
      console.error(`Failed to get info for session ${sessionUuid}`, err);
      throw new Error(`Failed to get info for session ${sessionUuid}`);
    });

    sessionMedia = validationService.filterInvalidMedias(sessionMedia);
    sessionContext = validationService.filterInvalidContexts(sessionContext);
    const sessionMediaGrouped = transformerService.sortMediaByProbabilityDesc(
      transformerService.mergeMediaAndContextById(sessionMedia, sessionContext),
    );

    return { ...sessionInfo, media: sessionMediaGrouped };
  }
}
