import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import addTreemapModule from 'highcharts/modules/treemap'

const RaceTreemapChart = ({ data }) => {
    addTreemapModule(Highcharts);

    let colors = ['#418cff','#0d1c33','#d941ff','#ff8d41','#ffec41']

    let formattedData = []
    Object.keys(data).forEach((key, i) => {
        formattedData.push({
            name: key,
            value: data[key],
            colorValue: colors[i]
        })
    })

    const options = {
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        subtitle: {
            text: '',
            style: {
                display: 'none'
            }
        },
        series: [{
            type: 'treemap',
            layoutAlgorithm: 'squarified',
            data: formattedData,
        }],
        tooltip: {
            pointFormat: '{point.value} board members ({point.percentage:.1f}%)'
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        }
    }

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options} />
    )
}

export default RaceTreemapChart;
