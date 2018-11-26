// HELPER METHODS
function talley(rootobj, val, summary) {
    rootobj.push(val);
    var localTotal = 0;
    $.each(rootobj, function(i,v) {
        localTotal+=v;
    })
    summary = localTotal;
}

function countOccurences(arr, match) {
    var ct = 0;
    $.each(arr, function(i,v) {
        if(v==match) { ct++; }
    });
    return ct;
}

// DRAW CHARTS METHODS
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

function drawOpenFramesChart() {
    var data = google.visualization.arrayToDataTable(tbl_open);
    var options = {
        title: getPlayer() + ' Open Frames'
    };
    var chart = new google.visualization.PieChart(document.getElementById('chrt_of'));
    chart.draw(data, options);
}
function drawStrikesChart() {
    var data = google.visualization.arrayToDataTable(tbl_strike);
    var options = {
        title: getPlayer() + ' Strikes'
    };
    var chart = new google.visualization.PieChart(document.getElementById('chrt_strikes'));
    chart.draw(data, options);
}