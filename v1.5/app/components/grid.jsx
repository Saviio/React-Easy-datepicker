import React from 'react'
import utils from '../utils'
import Week from './week.jsx'


export default class Grid extends React.Component{
    render(){

        let days  = this.props.days
        let len   = Math.ceil(days.length/7)
        return (
            <div >
                <table className="datepicker-main">
                    <thead>
                        <tr>
                            {utils.time.miniWeek.map((e,i)=><th key={i}>{e}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {utils.range(len).map((e,i)=>{
                            let range = days.slice(i*7, (i+1)*7)
                            return <Week key={i} days={range} head={i===0} tail={i===len-1} datetime={this.props.datetime} />
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
