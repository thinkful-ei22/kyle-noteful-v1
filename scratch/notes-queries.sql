-- Select all the notes
SELECT * FROM notes;



-- Select all the notes and limit by 5
-- SELECT * FROM notes
-- limit 5;



-- Select all the notes and change the sort order.
-- Experimanet with sorting by `id`, `title`, and `created`.
-- Try both ascending and descending
-- SELECT * FROM notes
-- ORDER BY title ASC;



-- Select notes where title matches a string exactly
-- SELECT * FROM notes
-- WHERE title = 'The most boring article about cats you''ll ever read'



-- Select notes where title is LIKE a string. In other words,
-- the title contains the word or phrase (e.g `cats` or `ways`)
-- SELECT * FROM notes
-- WHERE title LIKE '%ways%'



-- Update the title and content of a specific note
-- UPDATE notes
--   SET title = '5 reasons why my cat will eat your cat',
--       content = 'Because, reasons...'
--   WHERE title = '10 ways cats can help you live to 100';



-- Insert a new note. Try providing incomplete data like missing
-- `content` or `title` fields.
-- INSERT INTO notes (title, content) VALUES
--   ('New test note title', 'New test note content');
-- INSERT INTO notes (title) VALUES
--   ('Another test note title without content');
-- INSERT INTO notes (content) VALUES
--   ('Another test note content without a title');
--   ERROR:  23502: null value in column "title" violates not-null constraint
--   DETAIL:  Failing row contains (14, null, Another test note content without a title, 2018-07-02 13:04:36.369568).



-- Delete a note by id
-- DELETE FROM notes
--   WHERE id = 5;