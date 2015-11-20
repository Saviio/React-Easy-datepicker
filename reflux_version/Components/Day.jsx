
var 
	React    = require('react/addons'),
	Actions  = require("../Actions/Actions.js")


var Day = React.createClass({
	enter:function(e){
		Actions.enter(e.target);
	},
	leave:function(e){
		Actions.leave(e.target)
	},
	choose:function(e){
		if(this.props.enable){
			Actions.choose(this.props.datetime)
		}
	},
	render: function(){
		var cx = React.addons.classSet;
		var classes = cx({
		    'today': this.props.today,
		    'in-month': this.props.enable,
		    'not-in-month': !this.props.enable
		});

		return (
		  <td className={classes} onMouseEnter={this.enter} onMouseLeave={this.leave} onClick={this.choose} >{this.props.day}</td>
		)
	}

})

module.exports = Day
