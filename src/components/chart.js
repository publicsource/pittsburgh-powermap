import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import _ from 'lodash'
import { getDecade } from 'date-fns'

const BarChart = ({ data }) => {
    let byRace = _.countBy(data.edges, 'node.data.Race');
    let bySex = _.countBy(data.edges, 'node.data.Gender');

    let dataWithDecades = data.edges.map(e => {
        let d = e.node.data;
        return ({ ...d, 'Decade': getDecade(new Date(d.Birthdate))})
    });
    let byDecade = _.countBy(dataWithDecades, 'Decade');

    console.log(
        byRace,
        bySex,
        byDecade
    )

    const options = {
        title: {
            text: 'My chart'
        },
        series: [{
            data: [1, 2, 3]
        }]
    }

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options} />
    )
}

export default BarChart;
