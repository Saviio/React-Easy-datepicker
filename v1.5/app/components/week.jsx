import React from 'react'
import Day from './day.jsx'
import utils from '../utils'


export default class Week extends React.Component{
    render(){

        let
             dayRange  = this.props.days
            ,head      = this.props.head
            ,tail      = this.props.tail

        let
             idx       = dayRange.indexOf(1)
            ,today     = utils.time.today()

        return (
            <tr className="week">
                {dayRange.map((e,i)=>{
                    let isEnable=!( idx!==-1 && ((head && i<idx) || (tail && i>idx-1)))
                    let isToday=isEnable && (this.props.datetime+"-"+dayRange[i]===today)
                    return <Day day={e} key={e} datetime={this.props.datetime+"-"+e} enable={isEnable} today={isToday} />
                })}
            </tr>
        )
    }
}
