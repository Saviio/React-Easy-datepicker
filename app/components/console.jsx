import React from 'react'
import utils from '../utils'
import left  from '../res/chevron-left.svg'
import right from '../res/chevron-right.svg'

export default class Console extends React.Component{
    prevMonth(){
        this.props.onPrev()
    }

    nextMonth(){
        this.props.onNext()
    }

    reset(){
        this.props.onReset()
    }

    render(){
        return (
            <div className="console">
                <a className="arrow-left" onClick={::this.prevMonth}>
                    <img src={left} alt="LEFT-ARROW"/>
                </a>
                <span onClick={::this.reset}>{this.props.month}  {this.props.year}</span>
                <a className="arrow-right" onClick={::this.nextMonth}>
                    <img src={right} alt="RIGHT-ARROW"/>
                </a>
            </div>
        )
    }
}
