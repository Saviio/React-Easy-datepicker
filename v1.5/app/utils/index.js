import {week,month,miniWeek,miniMonth} from './config'


function current(){
    return new Date()
}

function getMonthSize(year,month){
    let current = this.current()
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
    let current = this.current()
    return {
        year:current.getFullYear(),
        month:current.getMonth()+1,
        date:current.getDate()
    }
}

function today(){
    let current = this.current()
    return current.getFullYear() + "-" + (current.getMonth() + 1) + "-" + current.getDate()
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
		prevMonth     = null,
        nextMonth     = null

	if(month-1 === 0){
		prevMonth = 12
		year--
	} else {
		prevMonth = month-1
	}

	let prevRange = this.getMonthSize(year,prevMonth)

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

		let
			yy = field[0],
			mm = field[1],
			dd = field[2]

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
					return format.replace(yearPlhdr,yearPlhdr.map((e,i) => charList[i]).reverse().join(''))
				}
			} else {
				mem.year = emptyFunction
			}

			if(monthPlhdr !== null){
				if(monthPlhdr === 'mm'){
					mem.month = (format,month) => format.replace(monthPlhdr,utils.MiniMonth[month-1])
				} else if(monthPlhdr === 'MM'){
					mem.month = (format,month) => format.replace(monthPlhdr,utils.Month[month-1])
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

		return mem.year(mem.month(mem.date(format,dd),mm),yy)
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
