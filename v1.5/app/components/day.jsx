import React      from 'react'
import style      from '../css/style.css'
import classNames from 'classnames/bind'

let cx=classNames.bind(style)


export default class Day extends React.Component{

    enter(){
        console.log('ENTER!')
    }

    leave(){
        console.log('LEAVA!')
    }

    choose(){
        console.log('CHOOSE!')
    }

    render(){
        let classes = cx({
		    'today': this.props.today,
		    'in-month': this.props.enable,
		    'not-in-month': !this.props.enable
		})

        return  <td className={classes} onMouseEnter={::this.enter} onMouseLeave={::this.leave} onClick={::this.choose} >{this.props.day}</td>
    }
}
