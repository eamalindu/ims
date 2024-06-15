//Reusable Component
//this external Charts can be used for multiple instances
//instead of writing multiple code segments we can minimize the codes by writing a common validator that can be used at any place

const generateChart=(elementID,title,categories,yAxis,series)=>{

    Highcharts.chart(elementID, {
        chart: {
            type: 'column',
            backgroundColor: '#ffffff'
        },
        title: {
            text: title
        },
        xAxis: {
            categories: categories,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: yAxis
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:rebeccapurple;padding:0">{point.series.name}: </td>' +
                '<td style="padding:0"><b>&nbsp;{point.y}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: series,

    });

}

const generatePieChart = (elementID, title, series) => {

    Highcharts.chart(elementID, {
        chart: {
            type: 'pie',
            backgroundColor: '#ffffff'
        },
        title: {
            text: title
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:rebeccapurple;padding:0">{point.name}: </td>' +
                '<td style="padding:0"><b>&nbsp;{point.percentage:.1f}%</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            name: 'Share',
            data: series
        }]
    });

}
