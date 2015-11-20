import font       from './css/font.css'
import React      from 'react'
import ReactDOM   from 'react-dom'
import Datepicker from './components/datepicker.jsx'

let node=document.getElementById('datepicker')
ReactDOM.render(<Datepicker filter="mm dd, yyyy" />, node)
 
