import axios, { AxiosResponse } from "axios";
import axiosRetry from "axios-retry";
import { Session, SessionContext, SessionMedia } from "../types/session";

axiosRetry(axios, {
  retries: 10,
  retryDelay: axiosRetry.exponentialDelay,
});

export class SessionClient {
  private internalHost: string;

  constructor(internalHost: string) {
    this.internalHost = internalHost;
  }

  public getSessionById(sessionId: string): Promise<Session> {
    return axios
      .get<Session>(`${this.internalHost}/sessions/${sessionId}`)
      .then((response: AxiosResponse<Session>) => response.data)
      .catch((error) => {
        console.error(`Failed to retrieve session with id ${sessionId}`, error);
        throw new Error(
          `Failed to retrieve session with id ${sessionId}, ${error.message}`
        );
      });
  }

  public getSessionMediaById(sessionId: string): Promise<SessionMedia[]> {
    return axios
      .get<SessionMedia[]>(`${this.internalHost}/sessions/${sessionId}/media`)
      .then((response: AxiosResponse<SessionMedia[]>) => response.data)
      .catch((error) => {
        console.error(
          `Failed to retrieve media for session with id ${sessionId}`,
          error.message
        );
        throw new Error(
          `Failed to retrieve media for session with id ${sessionId}, ${error.message}`
        );
      });
  }

  public getSessionContextById(sessionId: string): Promise<SessionContext[]> {
    return axios
      .get<SessionContext[]>(`${this.internalHost}/media-context/${sessionId}`)
      .then((response: AxiosResponse<SessionContext[]>) => response.data)
      .catch((error) => {
        console.error(
          `Failed to retrieve context for session with id ${sessionId}`,
          error
        );
        throw new Error(
          `Failed to retrieve context for session with id ${sessionId} ${error.message}`
        );
      });
  }
}
