
var 
	React    = require('react/addons'),
	utils    = require("../utils.js"),
	Console  = require('./Console.jsx'),
	Grid     = require('./Grid.jsx'),
	store    = require('../Stores/Store.js'),
	Actions  = require("../Actions/Actions.js"),
	Reflux   = require('Reflux')



var Calendar = React.createClass({
	mixins: [Reflux.ListenerMixin],
	getInitialState:function(){
		return store.refresh()
	},
	componentDidMount: function() {
    	this.listenTo(store, this.handleChange);
  	},
  	handleChange:function(){
  		this.setState(store.refresh())
  	},
  	show:function(e){
  		Actions.show()
  	},
	render:function(){
		
		var 
			filter  = this.props.filter || 'mm dd, yyyy'
			display = utils.convert(this.state.display,filter),
			style   = {marginLeft:'25px',marginRight:'25px'},
			cx 	    = React.addons.classSet,
			classes = cx({
			    'clndr': true,
			    'fadeOut': !this.state.visable && !this.state.isInit,
			    'hide':!this.state.visable && this.state.isInit
			})

		return (
			<div>
				<div className="picker" onClick={this.show}> 
					<span className="icon"> &#9776; </span>
					<span style={style}>{display}</span>
				</div>
				<div className={classes}>
					<div className="header" >
						<Console Month={utils.Month[this.state.month-1]} Year={this.state.year}/>
					</div>
					<Grid days={this.state.days} datetime={this.state.year+"-"+this.state.month} />
				</div>
			</div>
		)
	}
})

module.exports = Calendar