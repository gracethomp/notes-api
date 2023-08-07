const conn = new Mongo();
const db = conn.getDB("mydb");

const notesCollection = db.getCollection("notes");
const categoriesCollection = db.getCollection("categories");

const notes = [
  {
    name: "Shopping list",
    timeOfCreation: "April 20, 2021, 12:00",
    noteCategory: "Task",
    noteContent: "Tomatoes, Bread",
    datesMentioned: "",
    isArchived: false,
  },
  {
    name: "The theory of evolution",
    timeOfCreation: "April 27, 2021, 14:30",
    noteCategory: "Random Thought",
    noteContent:
      "Life's journey is an unpredictable dance, where the steps we take shape the music we leave behind.",
    datesMentioned: "",
    isArchived: true,
  },
  {
    name: "New feature",
    timeOfCreation: "May 5, 2021, 15:36",
    noteCategory: "Idea",
    noteContent: "Implement new feature (3/5/2021, 5/5/2021)",
    datesMentioned: "3/5/2021, 5/5/2021",
    isArchived: false,
  },
  {
    name: "Sweet dream",
    timeOfCreation: "May 7, 2021, 17:54",
    noteCategory: "Random Thought",
    noteContent: "Had an interesting dream last night",
    datesMentioned: "",
    isArchived: false,
  },
  {
    name: "Birthday gift",
    timeOfCreation: "May 15, 2021, 10:03",
    noteCategory: "Task",
    noteContent:
      "Grace has a birthday on 17/05/2021. Don't forget to buy a gift.",
    datesMentioned: "17/05/2021",
    isArchived: false,
  },
  {
    name: "Trip",
    timeOfCreation: "May 17, 2021, 3:25",
    noteCategory: "Task",
    noteContent: "Plan a weekend trip",
    datesMentioned: "",
    isArchived: false,
  },
  {
    name: "Pet-project",
    timeOfCreation: "July 21, 2021, 20:45",
    noteCategory: "Idea",
    noteContent: "Idea for a new project: Create a recipe sharing app",
    datesMentioned: "",
    isArchived: false,
  },
];

const categories = [
  {
    name: "Task",
  },
  {
    name: "Random Thought",
  },
  {
    name: "Idea",
  },
];

notesCollection.insertMany(notes);
categoriesCollection.insertMany(categories);
