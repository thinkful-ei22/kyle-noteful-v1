'use strict';

const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Reality check', function() {

  it('true should be true', function() {
    expect(true).to.be.true;
  });

  it('2 + 2 should equal 4', function() {
    expect(2 + 2).to.equal(4);
  });

});

describe('Express static', function() {

  it('GET request "/" should return the index page', function() {
    return chai.request(app)
      .get('/')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });

});

describe('404 handler', function() {

  it('should respond with 404 when given a bad path', function() {
    return chai.request(app)
      .get('/DOES/NOT/EXIST')
      .then(function(res) {
        expect(res).to.have.status(404);
      });
  });

});

describe('GET /api/notes', function() {

  it('should return the default of 10 Notes as an array', function() {
    return chai.request(app)
      .get('/api/notes')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(10);
      });
  });

  it('should return an array of objects with the `id`, `title`, and `content` keys', function() {
    const expectedKeys = ['id', 'title', 'content'];
    
    return chai.request(app)
      .get('/api/notes')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');

        res.body.forEach(function(item) {
          expect(item).to.be.an('object');
          expect(item).to.have.keys(expectedKeys);
        });
      });
  });

  it('should return correct search results for a valid query', function() {
    const validQuery = '?searchTerm=gaga';

    return chai.request(app)
      .get(`/api/notes${validQuery}`)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(1);
      });
  });

  it('should return an empty array for an incorrect query', function() {
    const invalidQuery = '?searchTerm=DOESNOTEXIST';

    return chai.request(app)
      .get(`/api/notes${invalidQuery}`)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(0);
      });
  });

});

describe('GET /api/notes/:id', function() {

  it('should return correct note object with `id`, `title`, and `content` for a given id', function() {
    const expectedKeys = ['id', 'title', 'content'];
    const testNote = {
      id: 1005,
      title: '10 ways cats can help you live to 100',
      content: 'Posuere sollicitudin aliquam ultrices sagittis orci a. Feugiat sed lectus vestibulum mattis ullamcorper velit. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Velit egestas dui id ornare arcu odio. Molestie at elementum eu facilisis sed odio morbi. Tempor nec feugiat nisl pretium. At tempor commodo ullamcorper a lacus. Egestas dui id ornare arcu odio. Id cursus metus aliquam eleifend. Vitae sapien pellentesque habitant morbi tristique. Dis parturient montes nascetur ridiculus. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Aliquam faucibus purus in massa tempor nec feugiat nisl.'
    };

    return chai.request(app)
      .get(`/api/notes/${testNote.id}`)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys(expectedKeys);
        expect(res.body).to.deep.equal(testNote);
      });
  });

  it('should respond with a 404 for an invalid id (`/api/notes/DOESNOTEXIST`)', function() {
    const invalidId = 'DOESNOTEXIST';
    
    return chai.request(app)
      .get(`/api/notes/${invalidId}`)
      .then(function(res) {
        expect(res).to.have.status(404);
      });
  });

});

describe('POST /api/notes', function() {

  it('should create and return a new item with location header when provided valid data', function() {
    const validData = {
      title: '5 reasons my cat will eat your cat',
      content: 'Because, reasons...'
    };

    return chai.request(app)
      .post('/api/notes')
      .send(validData)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.headers.location).to.exist;
      });
  });

  it('should return an object with a message property "Missing `title` in request body" when missing "title" field', function() {
    const titleMissing = {
      content: 'I have deliberately sent an object without a `title` field'
    };
    const expectedErrorMessage = 'Missing `title` in request body';

    return chai.request(app)
      .post('/api/notes')
      .send(titleMissing)
      .then(function(res) {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.equal(expectedErrorMessage);
      });
  });

});

describe('PUT /api/notes/:id', function() {

  it('should update and return a note object when given valid data', function() {
    const testNote = {
      id: 1005,
      title: '10 ways cats can help you live to 100',
      content: 'Posuere sollicitudin aliquam ultrices sagittis orci a. Feugiat sed lectus vestibulum mattis ullamcorper velit. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Velit egestas dui id ornare arcu odio. Molestie at elementum eu facilisis sed odio morbi. Tempor nec feugiat nisl pretium. At tempor commodo ullamcorper a lacus. Egestas dui id ornare arcu odio. Id cursus metus aliquam eleifend. Vitae sapien pellentesque habitant morbi tristique. Dis parturient montes nascetur ridiculus. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Aliquam faucibus purus in massa tempor nec feugiat nisl.'
    };
    const validData = {
      title: '9 ways cats can help you live to 99',
      content: 'Updated via PUT'
    };
    const expectedKeys = ['id', 'title', 'content'];

    return chai.request(app)
      .put(`/api/notes/${testNote.id}`)
      .send(validData)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys(expectedKeys);
        expect(res.body.id).to.equal(testNote.id);
        expect(res.body.title).to.equal(validData.title);
        expect(res.body.content).to.equal(validData.content);
      });
  });

  it('should respond with a 404 for an invalid id (`/api/notes/DOESNOTEXIST`)', function() {
    const invalidId = 'DOESNOTEXIST';
    const validData = {
      title: '9 ways cats can help you live to 99',
      content: 'Updated via PUT'
    };

    return chai.request(app)
      .put(`/api/notes/${invalidId}`)
      .send(validData)
      .then(function(res) {
        expect(res).to.have.status(404);
      });
  });

  it('should return an object with a message property "Missing `title` in request body" when missing "title" field', function() {
    const testNote = {
      id: 1005,
      title: '10 ways cats can help you live to 100',
      content: 'Posuere sollicitudin aliquam ultrices sagittis orci a. Feugiat sed lectus vestibulum mattis ullamcorper velit. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Velit egestas dui id ornare arcu odio. Molestie at elementum eu facilisis sed odio morbi. Tempor nec feugiat nisl pretium. At tempor commodo ullamcorper a lacus. Egestas dui id ornare arcu odio. Id cursus metus aliquam eleifend. Vitae sapien pellentesque habitant morbi tristique. Dis parturient montes nascetur ridiculus. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Aliquam faucibus purus in massa tempor nec feugiat nisl.'
    };
    const titleMissing = {
      content: 'I have deliberately sent an object without a `title` field'
    };
    const expectedErrorMessage = 'Missing `title` in request body';

    return chai.request(app)
      .put(`/api/notes/${testNote.id}`)
      .send(titleMissing)
      .catch(function(err) { err.response; })
      .then(function(res) {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.exist;
        expect(res.body.message).to.equal(expectedErrorMessage);
      });
  });

});

describe('DELETE /api/notes/:id', function() {

  it('should delete an item by id', function() {
    const testNote = {
      id: 1005,
      title: '10 ways cats can help you live to 100',
      content: 'Posuere sollicitudin aliquam ultrices sagittis orci a. Feugiat sed lectus vestibulum mattis ullamcorper velit. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Velit egestas dui id ornare arcu odio. Molestie at elementum eu facilisis sed odio morbi. Tempor nec feugiat nisl pretium. At tempor commodo ullamcorper a lacus. Egestas dui id ornare arcu odio. Id cursus metus aliquam eleifend. Vitae sapien pellentesque habitant morbi tristique. Dis parturient montes nascetur ridiculus. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Aliquam faucibus purus in massa tempor nec feugiat nisl.'
    };

    return chai.request(app)
      .delete(`/api/notes/${testNote.id}`)
      .then(function(res) {
        expect(res).to.have.status(204);
      });
  });

});
