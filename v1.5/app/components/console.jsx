import React from 'react'
import utils from '../utils'
import left  from '../res/chevron-left.svg'
import right from '../res/chevron-right.svg'

export default class Console extends React.Component{
    prevMonth(){
        console.log('PREV_MONTH')
    }

    nextMont(){
        console.log('NEXT_MONTH')
    }

    reset(){
        console.log('RESET')
    }

    render(){
        return (
            <div className="console">
                <a className="arrow-left" onClick={::this.prevMonth}>
                    <img src={left} alt="LEFT-ARROW"/>
                </a>
                <span onClick={::this.reset}>{this.props.Month}  {this.props.Year}</span>
                <a className="arrow-right" onClick={::this.nextMonth}>
                    <img src={right} alt="RIGHT-ARROW"/>
                </a>
            </div>
        )
    }
}
