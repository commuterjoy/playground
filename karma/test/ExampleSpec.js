
var thing = require('../lib/Thing.js');

describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(new thing()).toBeDefined();
  });
});
