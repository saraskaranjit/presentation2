export interface DiscussionTile {
  id: number;
  title: string;
  description: string;
  category:
    | "applications"
    | "benefits"
    | "challenges"
    | "ethics"
    | "global-nepal";
}

export interface Participant {
  id: number;
  name: string;
  fullName: string;
  question: string;
  hasSpoken: boolean;
}

export type CategoryColor = {
  [key in DiscussionTile["category"]]: string;
};
