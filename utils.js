
var 
	config = require('./config.js'),
	utils  = {}

utils.Current=function(){
	return new Date();
}

utils.GetMonthSize=function(year,month){
	var current = this.Current();
	return new Date( (year||current.getFullYear()),(month||current.getMonth()+1),0 ).getDate()
}

utils.GetWeekDisplayRange=function(year,month){
	var 
		current = this.Current(),
		mm      = month||current.getMonth(),
		yy      = year||current.getFullYear()

	return [new Date(yy,mm-1,1).getDay(),new Date(yy,mm,0).getDay()]
}

utils.DisplayNow=function(){
	var current=this.Current();
	//return this.MiniMonth[current.getMonth()]+" "+current.getDate()+", "+current.getFullYear();
	return [current.getFullYear(),current.getMonth()+1,current.getDate()]
}

utils.Today=function(){
	var current=this.Current();
	return current.getFullYear()+"-"+(current.getMonth()+1)+"-"+current.getDate()
}

utils.GetMonthData=function(year,month){

	var 
		range         = this.GetWeekDisplayRange(year,month),
		monthSize     = this.GetMonthSize(year,month),
		startDay      = range[0],
		endDay        = range[1],
		dayBefore     = startDay,
		dayAfter      = 6-endDay,
		prevMonthDays = [],
		nextMonthDays = [],
		curMonthDays  = [],
		prevMonth,nextMonth

	if(month-1==0){
		prevMonth=12
		year--
	} else {
		prevMonth=month-1
	}

	prevRange=this.GetMonthSize(year,prevMonth)

	for(var i=0;i<dayBefore;i++)
		prevMonthDays.push(prevRange-i)
	for(var j=1;j<=dayAfter;j++)
		nextMonthDays.push(j)
	for(var k=0;k<monthSize;k++)
		curMonthDays.push(k+1)

	return {
		prev:prevMonthDays.reverse(),
		current:curMonthDays,
		next:nextMonthDays
	}
}

utils.addClass=function (node,className){
	if(node.className.indexOf(className)>-1)
		return

	var classSet=node.className.split(' ')
	for(var i=0;i<classSet.length;i++){
		if(classSet[i]===className)
			return;
		}
	classSet.push(className)
	node.className=classSet.join(' ');
}


utils.removeClass=function(node,className){
  if(node.className.indexOf(className)==-1)
    return;

  var classSet=node.className.split(' ')
  for(var i=0;i<classSet.length;i++){
    if(classSet[i]===className){
      classSet=classSet.slice(0,i).concat(classSet.slice(i+1))
      break;
    }
  }
  node.className=classSet.join(' ')
}

utils.convert=(function(field,format){
	var mem=null
	var emptyFunction=function(str){ return str }
	return function(field,format){

		var 
			yy=field[0],
			mm=field[1],
			dd=field[2]

		if(mem===null){
			mem={}

			var pattern=[format.match(/y{2,}/),format.match(/mm/i),format.match(/dd/)]

			var 
				yearPlhdr  = (pattern[0] && pattern[0][0]) || null,
				monthPlhdr = (pattern[1] && pattern[1][0]) || null,
				datePlhdr  = (pattern[2] && pattern[2][0]) || null

			if(yearPlhdr!==null){
				mem.year=function(format,year){
					var charList=year.toString().split('').reverse();
					var tmp=[]
					for(var i=0;i<yearPlhdr.length;i++){
						tmp.push(charList[i])
					}
					return format.replace(yearPlhdr,tmp.reverse().join(''))
				}
			} else {
				mem.year=emptyFunction
			}

			if(monthPlhdr!==null){
				if(monthPlhdr=='mm'){
					mem.month=function(format,month){
						return format.replace(monthPlhdr,utils.MiniMonth[month-1])
					}
				} else if(monthPlhdr=='MM'){
					mem.month=function(format,month){
						return format.replace(monthPlhdr,utils.Month[month-1])
					}
				}
			} else {
				mem.month=emptyFunction
			}

			if(datePlhdr!==null){
				mem.date=function(format,date){
					return format.replace('dd',date)
				}
			} else {
				mem.date=emptyFunction
			}
		}

		return mem.year(mem.month(mem.date(format,dd),mm),yy)
		//return format.replace('yy',yy).replace('mm',mm).replace('dd',dd)
	}
})()

utils.Header    = config.Week
utils.Month     = config.Month
utils.MiniWeek  = config.MiniWeek
utils.MiniMonth = config.MiniMonth


module.exports  = utils