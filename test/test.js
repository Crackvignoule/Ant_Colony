const assert = require('assert');
const Cell = require('../js/models/cell');

describe('Cell', function() {
    it('should create a new Cell instance', function() {
        const cell = new Cell();
        assert(cell instanceof Cell);
    });
});