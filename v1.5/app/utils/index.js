import {week,month,miniWeek,miniMonth} from './config'


function current(){
    return new Date();
}

function getMonthSize(year,month){
    var current = this.current();
    return new Date( (year||current.getFullYear()),(month||current.getMonth()+1),0 ).getDate()
}

function getWeekDisplayRange(year,month){
    let
         current = this.current()
        ,mm      = month||current.getMonth()
        ,yy      = year||current.getFullYear()

    return [new Date(yy,mm-1,1).getDay(),new Date(yy,mm,0).getDay()]
}

function displayNow(){
    var current=this.current()
    return {
        year:current.getFullYear(),
        month:current.getMonth()+1,
        date:current.getDate()
    }
}

function today(){
    var current=this.current();
    return current.getFullYear()+"-"+(current.getMonth()+1)+"-"+current.getDate()
}

function getMonthData(year,month){

	let
		range         = this.getWeekDisplayRange(year,month),
		monthSize     = this.getMonthSize(year,month),
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

	let prevRange=this.getMonthSize(year,prevMonth)

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

function addClass(node,className){
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

function removeClass(node,className){
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

var convert=(function(field,format){
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

function range(to){
    var arr=[]
    for(let i=0;i<to;i++)
        arr[i]=i
    return arr
}

let utils={
    time:{
        current,
        getMonthSize,
        getWeekDisplayRange,
        displayNow,
        today,
        getMonthData,
        convert,
        week,
        month,
        miniWeek,
        miniMonth
    },
    addClass,
    removeClass,
    range
}

export default utils
