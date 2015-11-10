

var
	React    = require('react'),
	utils    = require("../utils.js"),
	Actions  = require("../Actions/Actions.js")



var Console=React.createClass({
	prevMonth:function(e){
		e.preventDefault()
		Actions.prevMonth()
	},
	nextMonth:function(e){
		e.preventDefault()
		Actions.nextMonth()
	},
	reset:function(e){
		e.preventDefault()
		Actions.reset()
	},
	render:function(){

		return (
			<div className="console">
				<a className="arrow-left" onClick={this.prevMonth}>
					<img  src="chevron-left.svg" alt="Chevron left pictogram"/>
				</a>
				<span onClick={this.reset}>{this.props.Month}  {this.props.Year}</span>
				<a className="arrow-right" onClick={this.nextMonth}>
					<img  src="chevron-right.svg" alt="Chevron left pictogram"/>
				</a>
			</div>
		)
	}
})

module.exports = Console;
