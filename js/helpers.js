Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
            ].join('-');
};

// i hate javascript with its async bullshit
function trackTotal(newTotal) {
    totals.push(newTotal);
    var localTotal = 0;
    $.each(totals, function(i,v) {
        localTotal+=v;
    })
    runningTotal = localTotal;
    games = totals.length;
}

function loadDays(btn) {
    $('#mainctr').empty();
    $('.btndateselector').removeClass("btn-primary");
    $('.btndateselector').addClass("btn-secondary");
    $(btn).addClass("btn-primary");
    $(btn).removeClass("btn-secondary");
    var p = getPlayer();
    loadData(p,$(btn).data("days"))
}

function setPlayer() {
    window.history.pushState({},$('#txt_player').val()+" Stat Entry","index.html#!"+$('#txt_player').val());
    window.location = "index.html#!"+$('#txt_player').val();
    getPlayer();
}

function getPlayer() {
    var url = window.self.location.href;
    var kvp = url.split("#!");
    if(kvp.length!=2) { window.location = "index.html#!";}
    $('#a_stats').attr('href','stats.html#!'+kvp[1]);
    $('#a_home').attr('href','index.html#!'+kvp[1]);
    $('#a_charts').attr('href','charts.html#!'+kvp[1]);
    $('#a_history').attr('href','history.html#!'+kvp[1]);
    $('#a_team').attr('href','teams.html#!'+kvp[1]);
    return kvp[1];
  }

function drawNav() {
    var nav = [{id:"a_home", href:"index.html",fa:"home",title:"Home"},
    {id:"a_history", href:"history.html",fa:"history",title:"History"},
    {id:"a_charts", href:"charts.html",fa:"line-chart",title:"Charts"},
    {id:"a_stats", href:"stats.html",fa:"table",title:"Summary"},
    {id:"a_team", href:"teams.html",fa:"users",title:"Teams"}
    ];
    $.each(nav, function(i,v) {
        $("#div_nav").append('<a href="'+v.href+'" id="'+v.id+'" class="navbar-brand d-flex align-items-center"><i class="fa fa-'+v.fa+'" aria-hidden="true"></i> &nbsp; '+v.title+'</a>');
    });
    getPlayer();
}

$(document).ready(function () {
    drawNav();
    $('#txt_player').blur(function() {setPlayer()});
});