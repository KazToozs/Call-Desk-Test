// const _ = require('lodash');
// const should = require('chai').should();
const { expect } = require('chai');

const mocks = require('node-mocks-http');
const assert = require('assert');
const index = require('../index.js');
const weather = require('../weather.js');

// Test weather Promise
describe('Working Promise', () => {
  let maybe;
  beforeEach(() => {
    maybe = () => weather.callWeatherApi('San Francisco', '');
  });
  it('should be an Object', () => {
    const result = maybe();
    expect(result).to.be.a('Object');
  });
  it('should work', () => maybe());
});

// Index testing
describe('Testing index', () => {
  const request = mocks.createRequest({
    body: {
      queryResult: {
        method: 'GET',
        parameters: {
          'geo-city': 'San Francisco',
        },
      },
    },

  });

  const response = mocks.createResponse();
  it('cannot find the weather', () => {
    index.dialogflowFirebaseFulfillment(request, response);

    assert.equal('I don\'t know the weather but I hope it\'s good!', response.fulfillmentText);
  });
});


// Potentially useful code below

// describe('Promisestest', () => {
//   let maybe;
//   beforeEach(() => {
//     maybe = () => Promise.resolve('yo');
//   });
//   it('should be an Object', () => {
//     const result = maybe();
//     _.isObject(result).should.be.true;
//   });
//   it('should work', () => maybe());
//   it('should work and return data', () => maybe()
//     .then((data) => {
//       data.should.equal('yo');
//     }));
// });

// const req = { query: { text: 'input' } };
// const res = {};
