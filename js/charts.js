function drawPinsChart() {
    var data = google.visualization.arrayToDataTable(tbl_pins);
    var options = {
        title: getPlayer() + ' Scores',
        curveType: 'function',
        legend: { position: 'none' },
        vAxis: { 
            viewWindow:{
            max:300,
            min:50
            }
        }
    };
    var chart = new google.visualization.LineChart(document.getElementById('chrt_pins'));
    chart.draw(data, options);
}

function drawFBChart() {
    var data = google.visualization.arrayToDataTable(tbl_fb);
    var options = {
        title: getPlayer() + ' First Ball Average',
        curveType: 'function',
        legend: { position: 'none' },
        vAxis: { 
            viewWindow:{
            max:10,
            min:0
            }
        }
    };
    var chart = new google.visualization.LineChart(document.getElementById('chrt_fb'));
    chart.draw(data, options);
}