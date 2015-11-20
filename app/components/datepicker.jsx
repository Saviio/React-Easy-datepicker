import React      from 'react'
import Grid       from './grid.jsx'
import menu       from '../res/menu.svg'
import utils      from '../utils'
import style      from '../css/style.scss'
import Console    from './console.jsx'
import classNames from 'classnames/bind'

let cx=classNames.bind(style)


export default class Datepicker extends React.Component{
    state = this.init(true)


    toggle(){
        this.setState({
            ...this.state,
            visable:!this.state.visable
        })
    }

    hide(){
        this.setState({
            ...this.state,
            visable:false
        })
    }

    nextMonth(){
        let newState = {
            ...this.state
        }

        if(this.state.month === 12)
            newState.year++, newState.month = 1
        else
            newState.month++

        this.setState(this.refresh(newState))
    }

    prevMonth(){
        let newState = {
            ...this.state
        }

        if(this.state.month === 1)
            newState.year--, newState.month = 12
        else
            newState.month--

        this.setState(this.refresh(newState))
    }

    pickDate(datetime){
        return () => {
            let {year,month,date} = datetime
            let newDate = new Date(0)
            newDate.setYear(year)
            newDate.setMonth(month-1)
            newDate.setDate(date)

            this.setState({
                ...this.init(false,newDate),
                visable : false
            })
        }
    }

    init(init = false,timeNode = null){
        timeNode = timeNode || utils.time.current()

        return {
            year    : timeNode.getFullYear(),
            month   : timeNode.getMonth()+1,
            date    : timeNode.getDate(),
            days    : utils.time.refreshDays(timeNode.getFullYear(),timeNode.getMonth()+1),
            display : utils.time.displayNow(timeNode),
            visable : false,
            isInit  : init
        }
    }

    reset(){
        this.setState({...this.init(),visable:true})
    }

    refresh(state){
        return {
            ...state,
            days : utils.time.refreshDays(state.year,state.month)
        }
    }

    render(){

        let
			filter  = this.props.filter || 'mm dd, yyyy',
			display = utils.time.convert(this.state.display,filter),
			classes = cx({
			    'datepicker-popover': true,
			    'fadeOut': !this.state.visable && !this.state.isInit,
			    'hide':!this.state.visable && this.state.isInit
			})


		return (
			<div>
				<div className="picker" onClick={::this.toggle}>
					<img className="menu" src={menu} alt="Menu pictogram" />
					<span className="label">{display}</span>
				</div>
				<div className={classes}>
					<div className="header" >
						<Console
                            month={utils.time.month[this.state.month-1]}
                            year={this.state.year}
                            onNext={::this.nextMonth}
                            onReset={::this.reset}
                            onPrev={::this.prevMonth}
                        />
					</div>
					<Grid
                        days={this.state.days}
                        month={this.state.month}
                        year={this.state.year}
                        onHide={::this.hide}
                        onPickDate={::this.pickDate}
                    />
				</div>
			</div>
		)
    }
}
