
var
    React = require('react'),
    Day   = require('./Day.jsx'),
    utils = require('../utils.js')


var Week  = React.createClass({

  render: function(){

    var 
        dayRange = this.props.days,
        head     = this.props.head,
        tail     = this.props.tail,
        len      = dayRange.length,
        days     = [],
        idx,timestamp

    idx=dayRange.indexOf(1)
    timestamp=utils.Today()


    for (var i = 0; i < len; i++){
        var isEnable = !( idx!==-1 && ( (head && i<idx) || (tail && i>idx-1)) )
        var isToday  = isEnable && (this.props.datetime+"-"+dayRange[i]===timestamp)
        days.push( <Day day={dayRange[i]} key={dayRange[i]} datetime={this.props.datetime+"-"+dayRange[i]} enable={isEnable} today={isToday} /> )
    }

    return (
      <tr className="week">{days}</tr>
    )
  }
})


module.exports = Week
