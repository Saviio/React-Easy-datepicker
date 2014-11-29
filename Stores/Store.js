
var 
	 Actions = require('../Actions/Actions.js')
	,utils   = require('../utils.js')
	,Reflux  = require('Reflux')



function refreshDays(year,month){
	var days=utils.GetMonthData(year,month)
	return days.prev.concat(days.current).concat(days.next)
}

var 
	 timestamp = new Date()
	,data      = null

var Store=Reflux.createStore({
	listenables:Actions,
	onNextMonth:function(){
		if(data.month==12){
			data.year++
			data.month=1
		} else {
			data.month++
		}
		this.trigger()
	},
	onPrevMonth:function(){
		if(data.month==1){
			data.year--
			data.month=12
		} else {
			data.month--
		}

		this.trigger()
	},
	onReset:function(){
		data=this.init()
		data.isInit=false
		data.visable=true
		this.trigger()
	},
	onEnter:function(node){
		utils.addClass(node,'hover')
	},
	onLeave:function(node){
		utils.removeClass(node,'hover')
	},
	onChoose:function(actionData){
		console.log(actionData)
		var 
			 time=actionData.split('-')
			,yy=time[0]
			,mm=time[1]
			,dd=time[2]

		//data.displayDate=utils.MiniMonth[mm-1]+" "+dd+", "+yy;
		data.displayDate=[yy,mm,dd]
		data.visable=false;
		this.trigger()
	},
	onShow:function(){
		data.visable=!data.visable
		this.trigger()
	},
	load:function(){
    	//console.log(this.data)
    	return [ data.year, data.month, data.date, data.displayDate, data.visable ]
	},
	init:function(){
		return {
			year:timestamp.getFullYear(),
			month:timestamp.getMonth()+1,
			date:timestamp.getDate(),
			displayDate:utils.DisplayNow(),
			visable:false
		}		
	},
	//getInitialState:function(){
	//	this.data=this.init();
	//},
	refresh:function(){

		var time    = this.load()
		var isInit  = data.isInit===undefined
		data.isInit = false

		return {
			year: time[0],
			month: time[1],
			days: refreshDays(time[0],time[1]),
			date:time[2],
			display:time[3],
			visable:time[4],
			isInit:isInit
		}
	}
})

data=Store.init()



module.exports = Store;




