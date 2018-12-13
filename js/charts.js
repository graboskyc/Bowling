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

function drawTeamChart() {
    var data = google.visualization.arrayToDataTable(tbl_totpins);
    var options = {
        title: 'Team Score Breakdown',
        legend: { position: 'bottom' },
        series:{
            0:{targetAxisIndex:0},
            1:{targetAxisIndex:1}
        }
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('chrt_pins'));
    chart.draw(data, options);
}

function drawGamesChart() {
    var tbl = [["Game","Avg Pins"]];
    $.each(gametracker, function(k,v) {
        tbl.push([k,Math.floor(v.total/v.ct)]);
    });
    var data = google.visualization.arrayToDataTable(tbl);
    var options = {
        title: 'Avg Score By Game',
        legend: { position: 'none' },
        vAxis: { 
            viewWindow:{
            max:300,
            min:50
            }
        }
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('chrt_games'));
    chart.draw(data, options);
}

function drawLocChart() {
    var tbl = [["Location","Avg Pins"]];
    $.each(loctracker, function(k,v) {
        tbl.push([k,Math.floor(v.pins/v.games)]);
    });
    var data = google.visualization.arrayToDataTable(tbl);
    var options = {
        title: 'Avg Score By Location',
        legend: { position: 'none' },
        vAxis: { 
            viewWindow:{
            max:300,
            min:50
            }
        }
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('chrt_loc'));
    chart.draw(data, options);
}

function drawGuage() {
    var tbl = [["Label","Value"]];
    var total = 0;
    var ct=0;
    $.each(tbl_pins, function(i,v) {
        if(i>0) {
            total = ((total*1) + (v[1]));
            ct++;
        }
    });
    tbl.push(["Avg", (total/ct)]);
    var data = google.visualization.arrayToDataTable(tbl);
    var options = {
        greenFrom:220, greenTo:300,
        yellowFrom:150, yellowTo:220,
        redFrom:50, redTo:150,
        minorTicks:20,
        min:50, max:300
    };
    var chart = new google.visualization.Gauge(document.getElementById('chrt_guage'));
    chart.draw(data, options);
}