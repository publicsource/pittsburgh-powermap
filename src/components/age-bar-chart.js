import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const AgeBarChart = ({ data }) => {
    const options = {
        chart: {
            type: 'bar',
            style: {
                font: 'inherit'
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                    inside: true,
                    align: 'right',
                    color: '#000',
                    style: { 
                        textOutline: 'none'
                    }
                }
            },
            series: {
                pointWidth: 40,
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
            data: Object.values(data),
            color: '#418cff'
        }],
        xAxis: {
            categories: Object.keys(data),
            labels: {
                enabled: true,
                formatter: function() {
                    return this.value + 's'
                },
                style: {
                    fontWeight: 'bold',
                    fontSize: '1em',
                    color: '#000'
                }
            }
        },
        yAxis: {
            title: {
                enabled: false
            },
            labels: {
                enabled: true
            }
        },
        tooltip: {
            formatter: function() {
                return this.y + ' board members born in the ' + this.x + 's';
            }
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

export default AgeBarChart;
