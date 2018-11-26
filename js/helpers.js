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