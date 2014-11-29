

var 
	React      =require('react'),
	utils      =require("../utils.js"),
	Week       =require('./Week.jsx')


var GridHeader=React.createClass({
	render:function(){

		var ths=[];
		for(var i=0;i<utils.MiniWeek.length;i++)
			ths.push(<th>{ utils.MiniWeek[i] }</th>)

		return (
	        <thead>
	          <tr>
	          	{ths}
	          </tr>
	        </thead>
		)
	}
})

var GridBody=React.createClass({
	render:function(){

		var 
			days      = this.props.days || 0,
			daylength = Math.ceil(days.length / 7),
			weeks     = []

		for(var i=0;i<daylength;i++){
			var range=days.slice(i*7, (i+1)*7)
			weeks.push(<Week days={range} head={i===0} tail={i===daylength-1} datetime={this.props.datetime} />)
		}

		return (
			<tbody>
        		{weeks}
        	</tbody>
		)
	}
})


var Grid=React.createClass({
	render:function(){
		return (
			<div >
        		<table className="calendar-main">
          			<GridHeader/>
          			<GridBody days={this.props.days} datetime={this.props.datetime}  />
        		</table>
      		</div>
		)
	}
})

module.exports = Grid