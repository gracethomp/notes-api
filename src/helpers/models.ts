// models.ts
import { DataTypes, Model, Sequelize } from "sequelize";
import { Note } from "./Note";
import { Category } from "./Category";

export interface NoteInstance extends Model<Note>, Note {}

export interface CategoryInstance extends Model<Category>, Category {}

export function initializeModels(sequelize: Sequelize) {
  const note = sequelize.define<NoteInstance>("notes", {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timeofcreation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notecategory: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    notecontent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    datesmentioned: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isarchived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  const Category = sequelize.define<CategoryInstance>("categories", {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return {
    note,
    Category,
  };
}
