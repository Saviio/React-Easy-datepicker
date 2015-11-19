import React      from 'react'
import Grid       from './grid.jsx'
import menu       from '../res/menu.svg'
import utils      from '../utils'
import style      from '../css/style.css'
import Console    from './console.jsx'
import classNames from 'classnames/bind'

let cx=classNames.bind(style)

export default class Datepicker extends React.Component{
    show(){

    }

    render(){
        let
			filter  = this.props.filter || 'mm dd, yyyy'
			display = utils.convert(this.state.display,filter),
			classes = cx({
			    'clndr': true,
			    'fadeOut': !this.state.visable && !this.state.isInit,
			    'hide':!this.state.visable && this.state.isInit
			})

		return (
			<div>
				<div className="picker" onClick={this.show}>
					<img className="menu" src={menu} alt="Menu pictogram" />
					<span className="label">{display}</span>
				</div>
				<div className={classes}>
					<div className="header" >
						<Console Month={utils.time.month[this.state.month-1]} Year={this.state.year}/>
					</div>
					<Grid days={this.state.days} datetime={this.state.year+"-"+this.state.month} />
				</div>
			</div>
		)
    }
}
