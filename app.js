

var 
	React    = require('react'),
	Calendar = require('./Components/Calendar.jsx'),
	utils    = require('./utils.js'),
	node     = document.getElementById('calendar')

React.render(<Calendar filter="mm dd, yyyy" />, node)

node.addEventListener('webkitAnimationEnd',function(e){
  if(e.animationName=="fadeOut"){
    var nodeList=document.getElementsByClassName('clndr')
    for(var i=0;i<nodeList.length;i++){
      utils.addClass(nodeList[i],'hide')
    }
  }
})
