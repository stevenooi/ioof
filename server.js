const util = require('./util');

/*
	This is the main class which calls the util class libraries. 
	This class is the entry point of the program
*/
util.getInput()
  .then(function (answer) {
    console.log(answer);
  })
  .finally(process.exit);






