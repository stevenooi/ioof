const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Input >  ', (answer) => {
  console.log('Output > ' + answer + ', ' + analyse(answer));
  rl.close();
});

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

function checkDateInOrder(firstDate,secondDate){
	
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
function calculateDays(startDate, endDate, result){
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

function getNextMonth(obj){
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
function getFebDays(val){
	if(val %4 == 0)
		return 29;
	else
		return 28;
}
