function getNextBall(framenum, bn) {
    var nextframenum = framenum*1+1;

    if (nextframenum > 11) {
      return 0;
    } else {
      var nextBall = $('input[data-frame="frame'+nextframenum+'"][data-ball="ball'+bn+'"').val();
      
      if(nextBall == "") { 
        nextBall = 0;
      }
      else if(isNaN(nextBall)) {
        // Strike
        nextBall = 10;
      }
      //console.log("NEXT BALL: "+nextBall);
      return nextBall*1;
    }
  }

  function getFrameScore(framenum) {
    var framename = "frame"+framenum;
    var framescore = 0;
    var b1 = $('input[data-frame="'+framename+'"][data-ball="ball1"').val();
    var b2 = $('input[data-frame="'+framename+'"][data-ball="ball2"').val();

    if(isNaN(b1)) {
      // Strike X
      //.log("STRIKE!");
      if(framenum==10) {
        framescore = 10 + getNextBall(9,2) + getNextBall(9,3);

      } else {
        var nb = getNextBall(framenum,1);
        if(nb == 10) { framescore = 10 + nb + getNextBall(framenum+1,1)}
        else if(getNextBall(framenum,2) == 10) {
          framescore = 20;
        }
        else { framescore = 10 + getNextBall(framenum,1) + getNextBall(framenum,2); }
      }
    }
    else if(isNaN(b2)) {
      // Spare /
      //console.log("Spare");
      if(framenum==10) {
        framescore = 10 + getNextBall(9,3);
      } else {
        framescore = 10+ getNextBall(framenum,1);
      }
    }
    else {
      framescore = b1*1;
      //console.log("B1:"+b1+" B2:"+b2);
      if(b2!="") {framescore = framescore + b2*1; }
    }
    return framescore;
  }

  function updateTotal() {
    var i = 1;
    runningTotal = 0;
    //console.log("STARTING LOOP");
    while (i < 11) {
      var framescore = getFrameScore(i);
      runningTotal += framescore;
      //console.log("fs: "+framescore);
      //console.log('total: '+runningTotal);
      $(".framescore.frame"+i).text(runningTotal);
      $('.bowlingtotalscore').text(runningTotal);
      i = i + 1;
    }
  }
  
  function correctFrameNum(val) {
    if(val==""){ val = 0;}
    else if(isNaN(val)) { 
      if(val=="/") { val = "/"}
      else { val = "X"; }
    }
    else { val = val*1;}
    return val;
  }

  Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
          ].join('-');
  };