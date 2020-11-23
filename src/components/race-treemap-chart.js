import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import addTreemapModule from 'highcharts/modules/treemap'

if (typeof Highcharts === 'object') {
    addTreemapModule(Highcharts)
}

const RaceTreemapChart = ({ data }) => {
    let colors = {
        'White': '#418cff',
        'Black': '#0d1c33',
        'Asian': '#d941ff',
        'Latino': '#ff8d41',
        'Native American': '#ffec41'
    }

    let formattedData = []
    Object.keys(data).forEach((key) => {
        if (key !== 'null') {
            formattedData.push({
                name: key,
                value: data[key],
                color: colors[key]
            })
        }
    })

    const options = {
        title: {
            text: 'By race',
            align: 'left',
            style: {
                fontWeight: 'bold',
                fontSize: '1.3em'
            }
        },
        series: [{
            type: 'treemap',
            layoutAlgorithm: 'squarified',
            data: formattedData,
        }],
        tooltip: {
            pointFormat: '{point.value} {point.name} board members'
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        chart: {
            style: {
                font: 'inherit'
            }
        }
    }

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options} />
    )
}

export default RaceTreemapChart;
