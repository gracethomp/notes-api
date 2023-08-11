// models.ts
import { DataTypes, Model, Sequelize } from "sequelize";
import { Note } from "./Note";
import { Category } from "./Category";

export interface NoteInstance extends Model<Note>, Note {
  category: CategoryInstance;
}

export interface CategoryInstance extends Model<Category>, Category {}

export function initializeModels(sequelize: Sequelize) {
  const category = sequelize.define<CategoryInstance>("categories", {
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
      references: {
        model: 'categories', 
        key: 'id',
      }
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

  note.belongsTo(category, { foreignKey: 'notecategory', as: 'category' });

  return {
    note,
    Category: category,
  };
}
