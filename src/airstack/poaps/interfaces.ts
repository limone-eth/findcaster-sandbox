interface PoapEventImage {
  extraSmall: string;
  large: string;
  medium: string;
  original: string;
  small: string;
}

interface PoapEvent {
  eventName: string;
  eventURL: string;
  startDate: string;
  endDate: string;
  country: string;
  city: string;
  contentValue: {
    image: PoapEventImage;
  };
}

interface Poap {
  eventId: number;
  poapEvent: PoapEvent;
}

interface PageInfo {
  nextCursor: string | null;
  prevCursor: string | null;
}

interface PoapsOwnedByFarcasterUserResult {
  Poaps: {
    Poap: Poap[];
    pageInfo: PageInfo;
  };
}

interface PoapsOwnedByFarcasterUserVariables {
  farcasterUser: string; // Change the type accordingly if Identity is not a string
}

export type {
  PoapEventImage,
  PoapEvent,
  Poap,
  PageInfo,
  PoapsOwnedByFarcasterUserResult,
  PoapsOwnedByFarcasterUserVariables,
};
