const readline = require('readline');
const Promise = require('bluebird');

//retrieve input, validate and produce output
const getInput = () => {
  const rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});
	
  return new Promise(function (resolve) {
    rl.question('Input >  ', (answer) => {
	  rl.close();
	  if(!(validateDate(answer.substring(0, 10)) && validateDate(answer.substring(12, 22))))
		resolve('Date format error. Format should be in DD MM YYYY. Minimum year is 1900. Maximum year is 2010');
	  else
		resolve('Output > ' + analyse(answer));
	});
  });
}

//process input into object and pass the proper parameters into calculateDays
const analyse = (data) =>{
	
	let firstDate = {};
	firstDate.day = parseInt(data.substring(0, 2));
	firstDate.month = parseInt(data.substring(3, 5));
	firstDate.year = parseInt(data.substring(6, 10));
	
	let secondDate = {};
	secondDate.day = parseInt(data.substring(12, 14));
	secondDate.month = parseInt(data.substring(15, 17));
	secondDate.year = parseInt(data.substring(18, 22));
	
	//find the bigger date
	let inOrderFlag = checkDateInOrder(firstDate,secondDate);
	
	//swap date if firstDate is not smaller
	if(!inOrderFlag){
		const tempDate = Object.assign({}, firstDate);
		firstDate = Object.assign({}, secondDate);
		secondDate = tempDate;
	}
	
	return calculateDays(firstDate, secondDate, 0);
}

//return true if firstdate is earlier than second date. vice versa
const checkDateInOrder = (firstDate,secondDate) =>{
	
	let inOrderFlag = true;
	//compare year
	if(firstDate.year > secondDate.year)
		inOrderFlag = false;
	//compare month
	else if(firstDate.year == secondDate.year){
		if(firstDate.month > secondDate.month)
		  inOrderFlag = false;
		//compare day
		else if(firstDate.month == secondDate.month){
			if(firstDate.day > secondDate.day)
				inOrderFlag = false;
		}
	}
	return inOrderFlag;
}

//loop every month until the enddate and count days of every month
const calculateDays = (startDate, endDate, result) =>{
	let loopNextMonth = false;
	
	if(endDate.year > startDate.year) 
		loopNextMonth = true;
	else if(endDate.month > startDate.month)
		loopNextMonth = true;

	//get this month result
	if(startDate.year == endDate.year && startDate.month == endDate.month){
		//add days of the last month of enddate, not including the last day
		result += (endDate.day - 1);
	}
	else{
		result += getDaysInMonth(startDate.month, startDate.year) - startDate.day + 1;
	}
	
	if(loopNextMonth){
		//move startdate to next month
		startDate = getNextMonth(startDate);
		return calculateDays(startDate, endDate, result);
	}
	return result;
}

//get the date object for next month based on date passed in parameter
const getNextMonth = (obj) =>{
	obj.day = 1;
	if(obj.month == 12){
		obj.month = 1;
		obj.year++;
	}
	else{
		obj.month++;
	}
	return obj;
}

//define days count in every month
const getDaysInMonth = (valMonth, valYear) =>{
	const monthList = {
		1: 31,
		2: getFebDays(valYear),
		3: 31,
		4: 30,
		5: 31,
		6: 30,
		7: 31,
		8: 31,
		9: 30,
		10: 31,
		11: 30,
		12: 31
	}
	return monthList[valMonth];
}

//check for leap year, extra day for february every leap year
const getFebDays = (val) =>{
	if(val %4 == 0)
		return 29;
	else
		return 28;
}

//validate input
const validateDate = (val) =>{
	//regex in format DD MM YYYY, 29 2 allowed for leap year, min year 1900, max year 2010
	var re = new RegExp('(^(((0[1-9]|1[0-9]|2[0-8])[  ](0[1-9]|1[012]))|((29|30|31)[  ](0[13578]|1[02]))|((29|30)[  ](0[4,6,9]|11)))[  ](19\\d\\d|20(0[0-9]|10))$)|(^29[  ]02[  ](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)');
	return re.test(val);
}

module.exports.getFebDays = getFebDays;
module.exports.getDaysInMonth = getDaysInMonth;
module.exports.getNextMonth = getNextMonth;
module.exports.calculateDays = calculateDays;
module.exports.checkDateInOrder = checkDateInOrder;
module.exports.analyse = analyse;
module.exports.validateDate = validateDate;
module.exports.getInput = getInput;





