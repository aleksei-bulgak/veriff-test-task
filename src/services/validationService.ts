import { SessionContext, SessionMedia } from "../types/session";

const sessionMediaContext = ["document-front", "document-back"];
const invalidSessionContext = "none";

const filterInvalidMedias = (medias: SessionMedia[]): SessionMedia[] => {
  if (!medias) {
    return [];
  }

  return medias.filter(
    (media) => !!media.context && sessionMediaContext.includes(media.context)
  );
};

const filterInvalidContexts = (
  contexts: SessionContext[]
): SessionContext[] => {
  if (!contexts) {
    return [];
  }

  return contexts.filter(
    (context) => !!context.context && context.context !== invalidSessionContext
  );
};

export { filterInvalidContexts, filterInvalidMedias };
