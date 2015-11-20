import Day   from './day.jsx'
import React from 'react'
import utils from '../utils'


export default class Week extends React.Component{
    render(){

        let
             head  = this.props.head
            ,tail  = this.props.tail

        let
             idx   = this.props.days.indexOf(1)
            ,today = utils.time.today()
            
        return (
            <tr className="week">
                {this.props.days.map((e,i) => {
                    let isEnable = !((head && i < idx) || (tail && i > idx-1))
                    let isToday  = isEnable && (`${this.props.year}-${this.props.month}-${e}` === today)
                    return <Day {...this.props} day={e} key={e} enable={isEnable} today={isToday}  />
                })}
            </tr>
        )
    }
}
