import React      from 'react'
import style      from '../css/style.scss'
import utils      from '../utils'
import classNames from 'classnames/bind'

let cx=classNames.bind(style)


export default class Day extends React.Component{

    enter(){
        utils.addClass(this.refs.day,'hover')
    }

    leave(){
        utils.removeClass(this.refs.day,'hover')
    }

    render(){
        let classes = cx({
		    'today': this.props.today,
		    'in-month': this.props.enable,
		    'not-in-month': !this.props.enable
		})

        let datetime = {
            year  : this.props.year  ,
            month : this.props.month ,
            date  : this.props.day
        }

        return (
                <td className={classes} onMouseEnter={::this.enter} onMouseLeave={::this.leave} onClick={this.props.onPickDate(datetime)} ref="day">
                    {this.props.day}
                </td>
        )
    }
}
