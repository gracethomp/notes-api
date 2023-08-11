import { Category } from "./Category";

export interface Note {
  id: number;
  name: string;
  timeofcreation: string;
  notecategory: Category;
  notecontent: string;
  datesmentioned: string;
  isarchived: boolean;
}
