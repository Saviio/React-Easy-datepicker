
var Reflux=require('Reflux');



var Actions=Reflux.createActions([
	"nextMonth",
	"prevMonth",
	"reset",
	"enter",
	"leave",
	"choose",
	"show"
])

module.exports = Actions;