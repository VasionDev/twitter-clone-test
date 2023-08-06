import { User } from "./user";

export interface Tweet {
  id: number;
  content: string;
  published: string;
  user: User
}