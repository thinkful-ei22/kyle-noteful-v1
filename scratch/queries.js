'use strict';

const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

// GET Notes with search
notes.filter('cats', (err, list) => {
  if (err) {
    console.error(err);
  }
  console.log(list);
});

// GET Notes by ID
notes.find(1005, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item);
  } else {
    console.log('not found');
  }
});

// PUT (Update) Notes by ID
const updateObj = {
  title: 'New Title',
  content: 'Blah blah blah'
};

notes.update(1005, updateObj, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item);
  } else {
    console.log('not found');
  }
});

// POST to create a new note
const newItem = {
  title: 'Title of New Item',
  content: 'Here is some content. That\'s all.'
};
notes.create(newItem, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item);
  } else {
    console.log('not created');
  }
});

// DELETE to delete a note by ID
const noteID = 1006;
notes.delete(noteID, (err, len) => {
  if (err) {
    console.log(err);
  }
  if (len) {
    console.log(`Note id #${noteID} was deleted and returned a length of ${len}`);
  } else {
    console.log('unable to delete');
  }
});
