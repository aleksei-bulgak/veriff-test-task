import axios, { AxiosResponse } from "axios";
import axiosRetry from "axios-retry";
import { Session, SessionContext, SessionMedia } from "../types/session";

axiosRetry(axios, {
  retries: 10,
  retryDelay: axiosRetry.exponentialDelay,
});

export default class SessionClient {
  private internalHost: string;

  constructor(internalHost: string) {
    this.internalHost = internalHost;
  }

  public async getSessionById(sessionId: string): Promise<Session> {
    return await axios
      .get<Session>(`${this.internalHost}/sessions/${sessionId}`)
      .then((response: AxiosResponse<Session>) => response.data)
      .catch((e) => {
        console.error(`Failed to retrieve session with id ${sessionId}`);
        throw new Error(`Failed to retrieve session with id ${sessionId}`);
      });
  }

  public async getSessionMediaById(sessionId: string): Promise<SessionMedia[]> {
    return await axios
      .get<SessionMedia[]>(`${this.internalHost}/sessions/${sessionId}/media`)
      .then((response: AxiosResponse<SessionMedia[]>) => response.data)
      .catch((e) => {
        console.error(
          `Failed to retrieve media for session with id ${sessionId}`,
        );
        throw new Error(
          `Failed to retrieve media for session with id ${sessionId}`,
        );
      });
  }

  public async getSessionContextById(
    sessionId: string,
  ): Promise<SessionContext[]> {
    return await axios
      .get<SessionContext[]>(`${this.internalHost}/media-context/${sessionId}`)
      .then((response: AxiosResponse<SessionContext[]>) => response.data)
      .catch((e) => {
        console.error(
          `Failed to retrieve context for session with id ${sessionId}`,
        );
        throw new Error(
          `Failed to retrieve context for session with id ${sessionId}`,
        );
      });
  }
}
