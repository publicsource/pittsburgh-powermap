import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const GenderPieChart = ({ data }) => {
    let formattedData = []
    Object.keys(data).forEach(key => {
        formattedData.push({
            name: key,
            y: data[key]
        })
    })

    const options = {
        chart: {
            type: 'pie',
            style: {
                font: 'inherit'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: false,
                dataLabels: {
                    enabled: true,
                    format: '{point.name} {point.percentage:.1f}%',
                    color: '#000',
                    style: { 
                        textOutline: 'none'
                    }
                }
            }
        },
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
            data: formattedData,
            colorByPoint: true,
            colors: ['#d941ff', '#418cff', '#ffec41']
        }],
        tooltip: {
            pointFormat: '{point.y} board members ({point.percentage:.1f}%)'
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

export default GenderPieChart;
