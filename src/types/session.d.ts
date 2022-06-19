
type SessionStatus = "internal_manual_review";
type MimeType = "image/png";
type SessionContextType = "back" | "front" | "none";

export type SessionMediaContext = "document-front" | "document-back";

export type Session = {
  id: string;
  status: "internal_manual_review";
};

export type SessionMedia = {
  id: string;
  mimeType: MimeType;
  context: SessionMediaContext;
};

export type SessionContext = {
  id: string;
  mediaId: string;
  context: SessionContextType;
  probability: number;
};

export type SessionData = {
  id: string;
  status: SessionStatus;
  media: SessionMediaWithContext[];
};

export type SessionMediaWithContext = {
  id: string;
  mediaId: string;
  mimeType: MimeType;
  context: SessionMediaContext;
  probability: number;
};
