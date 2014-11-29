




var 
	React    =require('react'),
	Week     =require('./Week.jsx')


var GridBody=React.createClass({
	render:function(){
		
		var 
			days      = this.props.days||0,
			daylength = Math.ceil(days.length / 7),
			weeks     = []

		for(var i=0;i<daylength;i++){
			var range=days.slice(i*7, (i+1)*7)
			weeks.push(<Week days={range} />)
		}
			

		return (
			<tbody>
        		{weeks}
        	</tbody>
		)
	}
})





module.exports = GridBody