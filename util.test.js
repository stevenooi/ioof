const util = require('./util.js');
const assert = require('chai').assert;

describe('getFebDays', function() {
  it('should return 28 with non leap year', function() {
	  assert.equal(28, util.getFebDays(2015));
  });

  it('should return 29 with leap year', function() {
	  assert.equal(29, util.getFebDays(2016));
  });

});

describe('getDaysInMonth', function() {
  it('should return 31 with January', function() {
	  assert.equal(31, util.getDaysInMonth(1,2015));
  });
  it('should return 28 with Febraury in non leap year', function() {
	  assert.equal(28, util.getDaysInMonth(2,2015));
  });

  it('should return 29 with Febraury in non leap year', function() {
	  assert.equal(29, util.getDaysInMonth(2,2016));
  });

  it('should return 31 with March', function() {
	  assert.equal(31, util.getDaysInMonth(3,2015));
  });

  it('should return 30 with April', function() {
	  assert.equal(30, util.getDaysInMonth(4,2015));
  });

  it('should return 31 with May', function() {
	  assert.equal(31, util.getDaysInMonth(5,2015));
  });

  it('should return 30 with Jun2', function() {
	  assert.equal(30, util.getDaysInMonth(6,2015));
  });

  it('should return 31 with July', function() {
	  assert.equal(31, util.getDaysInMonth(7,2015));
  });

  it('should return 31 with August', function() {
	  assert.equal(31, util.getDaysInMonth(8,2015));
  });

  it('should return 30 with September', function() {
	  assert.equal(30, util.getDaysInMonth(9,2015));
  });

  it('should return 31 with October', function() {
	  assert.equal(31, util.getDaysInMonth(10,2015));
  });

  it('should return 30 with November', function() {
	  assert.equal(30, util.getDaysInMonth(11,2015));
  });

  it('should return 31 with December', function() {
	  assert.equal(31, util.getDaysInMonth(12,2015));
  });


});


describe('getNextMonth', function() {
  it('should return 1 Feb 2015 with 1 Jan 2015', function() {
	  const obj = { day: 1, month: 1, year:2015};
	  assert.deepEqual({ day: 1, month: 2, year: 2015 }, util.getNextMonth(obj));
  });
  
  it('should return 1 Jan 2016 with 1 Dec 2015', function() {
	  const obj = { day: 1, month: 12, year:2015};
	  assert.deepEqual({ day: 1, month: 1, year: 2016 }, util.getNextMonth(obj));
  });


});

describe('calculateDays', function() {
  it('should return 4003 with start date 8 Jan 1995 and end date 24 Dec 2005', function() {
	  const startDate = { day: 8, month: 1, year:1995};
	  const endDate = { day: 24, month: 12, year:2005};
	  assert.equal(4003, util.calculateDays(startDate,endDate,0));
  });

});

describe('checkDateInOrder', function() {
  it('should return true with start date 8 Jan 1995 and end date 24 Dec 2005', function() {
	  const startDate = { day: 8, month: 1, year:1995};
	  const endDate = { day: 24, month: 12, year:2005};
	  assert.equal(true, util.checkDateInOrder(startDate,endDate));
  });
  
  it('should return false with start date 15 April 1969 and end date 12 Sep 1945', function() {
	  const startDate = { day: 15, month: 4, year:1969};
	  const endDate = { day: 12, month: 9, year:1945};
	  assert.equal(false, util.checkDateInOrder(startDate,endDate));
  });

});

describe('analyse', function() {
  it('should return 4003 with input 08 01 1995, 24 12 2005', function() {
	  assert.equal(4003, util.analyse('08 01 1995, 24 12 2005'));
  });
  
  it('should return 8616 with input 15 04 1969, 12 09 1945', function() {
	  assert.equal(8616, util.analyse('15 04 1969, 12 09 1945'));
  });

});

describe('validateDate', function() {
  it('should return false with date 31 12 1899 - below minimum date', function() {
	  assert.equal(false, util.validateDate('31 12 1899'));
  });

  it('should return true with date 01 01 1900', function() {
	  assert.equal(true, util.validateDate('01 01 1900'));
  });

  it('should return true with date 31 12 2010', function() {
	  assert.equal(true, util.validateDate('31 12 2010'));
  });
  
  it('should return false with date 01 01 2011 - above maximum date', function() {
	  assert.equal(false, util.validateDate('01 01 2011'));
  });
  
  it('should return true with date 29 02 2008 - leap year', function() {
	  assert.equal(true, util.validateDate('29 02 2008'));
  });

  it('should return false with date 29 02 2007 - non leap year', function() {
	  assert.equal(false, util.validateDate('29 02 2007'));
  });

  it('should return false with date 1 01 2000 - format error', function() {
	  assert.equal(false, util.validateDate('1 01 2000'));
  });

  it('should return false with date 01 1 2000 - format error', function() {
	  assert.equal(false, util.validateDate('01 1 2000'));
  });
  it('should return false with date 01 01 200 - format error', function() {
	  assert.equal(false, util.validateDate('01 01 200'));
  });
  
});

describe('run application', function() {
  var stdin;
  beforeEach(function () {
    stdin = require('mock-stdin').stdin();
  });
  it('should return Output > 4003 with input 08 01 1995, 24 12 2005', function() {
	  process.nextTick(function mockResponse() {
		  stdin.send('08 01 1995, 24 12 2005\n');
	  });
	  return util.getInput()
      .then(function (response) {
		assert.equal('Output > 4003', response);
      });
  });
  it('should return Output > 8616 with input 15 04 1969, 12 09 1945', function() {
	  process.nextTick(function mockResponse() {
		  stdin.send('15 04 1969, 12 09 1945\n');
	  });
	  return util.getInput()
      .then(function (response) {
		assert.equal('Output > 8616', response);
      });
  });

});
