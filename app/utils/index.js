import {week,month,miniWeek,miniMonth} from './config'


function current(){
    return new Date()
}

function getMonthSize(year,month){
    let now = current()
    return new Date((year || now.getFullYear()), (month || now.getMonth() + 1),0).getDate()
}

function getWeekDisplayRange(year,month){

    let
         now     = current()
        ,mm      = month || now.getMonth()
        ,yy      = year  || now.getFullYear()

    return [new Date(yy,mm-1,1).getDay(),new Date(yy,mm,0).getDay()]
}

function displayNow(node){

    let now = node || current()
    return {
        year:now.getFullYear(),
        month:now.getMonth()+1,
        date:now.getDate()
    }
}

function today(){
    let now = current()
    return now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate()
}

function getMonthData(year,month){
	let
		range         = getWeekDisplayRange(year,month),
		monthSize     = getMonthSize(year,month),
		startDay      = range[0],
		endDay        = range[1],
		dayBefore     = startDay,
		dayAfter      = 6-endDay,
		prevMonthDays = [],
		nextMonthDays = [],
		curMonthDays  = [],
		prevMonth     = null,
        nextMonth     = null

	if(month-1 === 0){
		prevMonth = 12
		year--
	} else {
		prevMonth = month-1
	}

	let prevRange = getMonthSize(year,prevMonth)

	for(let i = 0;i < dayBefore; i++)
		prevMonthDays.push(prevRange-i)
	for(let j = 1; j <= dayAfter; j++)
		nextMonthDays.push(j)
	for(let k = 0; k < monthSize; k++)
		curMonthDays.push(k+1)

	return {
		prev:prevMonthDays.reverse(),
		current:curMonthDays,
		next:nextMonthDays
	}
}

function refreshDays(year,month){
	let {prev,current,next}=getMonthData(year,month)
	return prev.concat(current).concat(next)
}

function addClass(el,cls){
    if (el.classList) {
        el.classList.add(cls)
    } else {
        let cur = ' ' + (el.getAttribute('class') || '') + ' '
        if (cur.indexOf(' ' + cls + ' ') < 0) {
            el.setAttribute('class', (cur + cls).trim())
        }
    }
}

function removeClass(el,cls){
    if (el.classList) {
        el.classList.remove(cls)
    } else {
        let cur = ' ' + (el.getAttribute('class') || '') + ' '
        let tar = ' ' + cls + ' '
        while (cur.indexOf(tar) >= 0) {
            cur = cur.replace(tar, ' ')
        }
        el.setAttribute('class', cur.trim())
    }

    if (!el.className) {
        el.removeAttribute('class')
    }
}

var convert = (function(field,format){
	let mem = null
	let emptyFunction = str => str
	return function(field,format){


        let {year,month,date} = field

		if(mem === null){
			mem = {}

			var pattern = [format.match(/y{2,}/), format.match(/mm/i), format.match(/dd/)]

			var
				yearPlhdr  = (pattern[0] && pattern[0][0]) || null,
				monthPlhdr = (pattern[1] && pattern[1][0]) || null,
				datePlhdr  = (pattern[2] && pattern[2][0]) || null

			if(yearPlhdr !== null){
				mem.year = (format,year) => {
					let charList = year.toString().split('').reverse()
					return format.replace(yearPlhdr,Array.prototype.slice.call(yearPlhdr).map((e,i) => charList[i]).reverse().join(''))
				}
			} else {
				mem.year = emptyFunction
			}

			if(monthPlhdr !== null){
				if(monthPlhdr === 'mm'){
					mem.month = (format,month) => format.replace(monthPlhdr,utils.time.miniMonth[month-1])
				} else if(monthPlhdr === 'MM'){
					mem.month = (format,month) => format.replace(monthPlhdr,utils.time.month[month-1])
				}
			} else {
				mem.month = emptyFunction
			}

			if(datePlhdr !== null){
				mem.date = (format,date) => format.replace('dd',date)
			} else {
				mem.date = emptyFunction
			}
		}

		return mem.year(mem.month(mem.date(format,date),month),year)
	}
})()

function range(from,to){
    if(to == undefined)
        to = from,from=0
    let arr = []
    for(let i = from; i < to; i++) arr[i] = i
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
        refreshDays,
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
