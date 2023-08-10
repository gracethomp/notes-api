import { DataTypes, Sequelize } from "sequelize";

const DB_NAME = "yourdb";
const DB_USER = "youruser";
const DB_PASSWORD = "yourpassword";
const DB_HOST = "localhost";
const DB_PORT = 5432;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
});

export async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export function getSequelizeInstance() {
  return sequelize;
}

export function getSequelizeModels() {
  const Note = sequelize.define("Note", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timeOfCreation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    noteCategory: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    noteContent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    datesMentioned: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  const Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return {
    Note,
    Category,
  };
}
