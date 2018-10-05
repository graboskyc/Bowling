function getNextBall(framenum, bn) {
    var nextframenum = framenum*1+1;

    // ignore any calculations beyond 10th frame
    if (nextframenum > 11) {
      return 0;
    } else {
      // find next ball
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
    // get user entered data
    var b1 = $('input[data-frame="'+framename+'"][data-ball="ball1"').val();
    var b2 = $('input[data-frame="'+framename+'"][data-ball="ball2"').val();

    if(isNaN(b1)) {
      // Strike X
      if(framenum==10) {
        // 10th frame you two more throws if first was a strike
        framescore = 10 + getNextBall(9,2) + getNextBall(9,3);
      } else {
        // not 10th frame
        // get next throw
        var nb = getNextBall(framenum,1);
        // if next frame's throw is also a strike, you get the throw of frame ahead of next frame
        // otherwise you just get next frame's both throws and add them together, accounting for that it could be a spare
        if(nb == 10) { framescore = 10 + nb + getNextBall(framenum+1,1)}
        else if(getNextBall(framenum,2) == 10) {
          framescore = 20;
        }
        else { framescore = 10 + getNextBall(framenum,1) + getNextBall(framenum,2); }
      }
    } // end strike
    else if(isNaN(b2)) {
      // Spare /
      // if 10th frame, get third throw
      // otherwise get first throw of next frame
      if(framenum==10) {
        framescore = 10 + getNextBall(9,3);
      } else {
        framescore = 10+ getNextBall(framenum,1);
      }
    } // end spare
    // simplest of all... no spare, no strikes...
    // just add up this frame's two throws
    // account that if b2 could be empty
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
    // loop through all 10 frames
    while (i < 11) {
      var framescore = getFrameScore(i);
      runningTotal += framescore;
      $(".framescore.frame"+i).text(runningTotal);
      $('.bowlingtotalscore').text(runningTotal);
      i = i + 1;
    }
  }
  
  function correctFrameNum(val) {
    if(val==""){ val = 0;}
    else if(isNaN(val)) { 
      if(val=="/") { val = "/";}
      else if (val=="-") { val = 0;}
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