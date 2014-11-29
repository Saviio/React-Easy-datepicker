


var 
	React    =require('react'),
	utils =require("../utils.js")

var GridHeader=React.createClass({
	render:function(){

		var ths=[];

		for(var i=0;i<utils.MiniMonth.length;i++)
			ths.push(<th>{ utils.MiniMonth[i] }</th>)

		return (
	        <thead>
	          <tr>
	          	{ths}
	          </tr>
	        </thead>
		)
	}
})

module.exports = GridHeader