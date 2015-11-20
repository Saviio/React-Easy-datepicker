import React from 'react'
import Week  from './week.jsx'
import utils from '../utils'

export default class Grid extends React.Component{
    render(){

        let days  = this.props.days
        let len   = Math.ceil(days.length/7)

        return (
            <div >
                <table className="datepicker-main">
                    <thead>
                        <tr>
                            {utils.time.miniWeek.map((e,i) => <th key={i}>{e}</th> )}
                        </tr>
                    </thead>
                    <tbody>
                        {utils.range(len).map((e,i) =>
                            <Week {...this.props} key={i} days={days.slice(i*7, (i+1)*7)} head={i===0} tail={i===len-1} />
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}
