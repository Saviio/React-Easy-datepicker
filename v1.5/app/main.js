import React from 'react'
import ReactDOM from 'react-dom'
import style from './css/style.css'
import font from './css/font.css'

import Day from './components/day.jsx'
import Week from './components/week.jsx'
import utils from './utils'



window.u=utils
var node=document.getElementById('datepicker')

ReactDOM.render(<Day />, node)
