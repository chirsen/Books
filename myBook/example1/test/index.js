require('should');
const mylib = require('../index.js');

describe('My First Test', () => {
    it('should get "Hello"', () => {
        mylib().should.be.eql('Hello');
    });
});