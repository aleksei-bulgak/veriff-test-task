import {
  SessionContext,
  SessionMedia,
  SessionMediaWithContext,
} from "../types/session";

const mergeMediaAndContextById = (
  sessionMedia: SessionMedia[],
  sessionContext: SessionContext[]
): SessionMediaWithContext[] => {
  const mediaMap = sessionMedia.reduce((acc, media) => {
    acc.set(media.id, media);
    return acc;
  }, new Map<string, SessionMedia>());

  return sessionContext
    .filter((context) => mediaMap.has(context.mediaId))
    .filter((context) => {
      const media = mediaMap.get(context.mediaId);
      const isFront =
        media.context === "document-front" && context.context === "front";
      const isBack =
        media.context === "document-back" && context.context === "back";
      return isFront || isBack;
    })
    .map((context) => {
      const media = mediaMap.get(context.mediaId);
      return {
        ...context,
        context: media.context,
        mimeType: media.mimeType,
      } as SessionMediaWithContext;
    });
};

const sortMediaByProbabilityDesc = (
  medias: SessionMediaWithContext[]
): SessionMediaWithContext[] => {
  if (!medias || medias.length === 0) {
    return [];
  }

  return medias.sort((first, second) => {
    const firstProbability = first.probability;
    const secondProbability = second.probability;

    if (firstProbability > secondProbability) {
      return -1;
    }
    if (firstProbability < secondProbability) {
      return 1;
    }
    return 0;
  });
};

export { mergeMediaAndContextById, sortMediaByProbabilityDesc };
