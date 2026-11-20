
export interface Brigader {
  id: number;
  name: string;
  appearance: string;
  picUrl: string | null;
  element: string;
  bio: string | null;
  squad: number;
  role: string;
  description?: string | null;
}

export type BrigaderInput = Pick<
  Brigader,
  | "name"
  | "appearance"
  | "picUrl"
  | "element"
  | "bio"
  | "squad"
  | "role"
>;
