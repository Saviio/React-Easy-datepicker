import React from 'react'
import Day from './day.jsx'
import utils from '../utils'


export default class Week extends React.Component {
    render(){
        
        let
             dayRange  = this.props.day
            ,head      = this.props.head
            ,tail      = this.props.tail

        let
             days      = []
            ,idx       = dayRange.indexOf(1)
            ,today     = utils.time.today()


        for (var i = 0; i < dayRange.length; i++){
            var isEnable = !( idx!==-1 && ((head && i<idx) || (tail && i>idx-1)))
            var isToday  = isEnable && (this.props.datetime+"-"+dayRange[i]===today)
            days.push( <Day day={dayRange[i]} key={dayRange[i]} datetime={this.props.datetime+"-"+dayRange[i]} enable={isEnable} today={isToday} /> )
        }

        return <tr className="week">{days}</tr>
    }
}
