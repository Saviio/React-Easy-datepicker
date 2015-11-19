import React from 'react'
import ReactDOM from 'react-dom'
import style from './css/style.css'
import font from './css/font.css'
import Datepicker from './components/datepicker.jsx'




window.u=utils
var node=document.getElementById('datepicker')

function refreshDays(year,month){
	var days=utils.time.getMonthData(year,month)
	return days.prev.concat(days.current).concat(days.next)
}

var sampleData=refreshDays(2015,11)

ReactDOM.render(<Datepicker days={sampleData}/>, node)
