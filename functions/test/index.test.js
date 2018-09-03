
const _ = require('lodash');
const should = require('chai').should();
const expect = require('chai').expect();

const index = require('../index.js');

describe('Promisestest', () => {
  let maybe;
  beforeEach(() => {
    maybe = () => Promise.resolve('yo');
  });
  it('should be an Object', () => {
    const result = maybe();
    _.isObject(result).should.be.true;
  });
  it('should work', () => maybe());
  it('should work and return data', () => maybe()
    .then((data) => {
      data.should.equal('yo');
    }));
});

describe('#Promises', () => {
  let maybe;
  beforeEach(() => {
    maybe = () => index.dialogflowFirebaseFulfillment();
  });
  it('should be an Object', () => {
    const result = maybe();
    _.isObject(result).should.be.true;
  });
  it('should work', () => maybe());
  it('should work and return data', () => maybe()
    .then((data) => {
      // data.should.equal('yo');
    }));
});
