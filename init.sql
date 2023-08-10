CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

INSERT INTO categories (name) VALUES ('Task'), ('Random Thought'), ('Idea');

CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  timeOfCreation VARCHAR(255) NOT NULL,
  noteCategory SERIAL NOT NULL REFERENCES categories(id),
  noteContent TEXT NOT NULL,
  datesMentioned VARCHAR(255),
  isArchived BOOLEAN NOT NULL
);

INSERT INTO notes (name, timeOfCreation, noteCategory, noteContent, datesMentioned, isArchived)
VALUES
  ('Shopping list', '2021-04-20 12:00', 1, 'Tomatoes, Bread', '', false),
  ('The theory of evolution', '2021-04-27 14:30', 2, 'Life''s journey is an unpredictable dance, where the steps we take shape the music we leave behind.', '', true),
  ('New feature', '2021-05-05 15:36', 3, 'Implement new feature (3/5/2021, 5/5/2021)', '3/5/2021, 5/5/2021', false),
  ('Sweet dream', '2021-05-07 17:54', 2, 'Had an interesting dream last night', '', false),
  ('Birthday gift', '2021-05-15 10:03', 1, 'Grace has a birthday on 17/05/2021. Don''t forget to buy a gift.', '17/05/2021', false),
  ('Trip', '2021-05-17 03:25', 1, 'Plan a weekend trip', '', false),
  ('Pet-project', '2021-07-21 20:45', 3, 'Idea for a new project: Create a recipe sharing app', '', false);
