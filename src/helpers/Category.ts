import { ObjectId } from "mongodb";

export interface Category {
  category: string;
  active: number;
  archived: number;
}
