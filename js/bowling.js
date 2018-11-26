function getNextBall(framenum, bn) {
    var nextframenum = framenum*1+1;

    // this was probably caused by a strike in frame 9 and frame 10 ball 1
    // so we are trying to get two balls ahead which is frame 11 ball 1
    // so redirect to frame 10 ball 2 and return value back to frame 9's call
    if((nextframenum == 11) && (bn == 1)) {
      return $('input[data-frame="frame10"][data-ball="ball2').val()*1;
    }
    // ignore any calculations beyond 10th frame
    else if (nextframenum > 10) {
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
        if(getNextBall(9,3)==10) {
          framescore = framescore - getNextBall(9,2);
        }
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
      else { val = 10; }
    }
    else { val = val*1;}
    return val;
  }

  function getPlayer() {
    var url = window.self.location.href;
    var kvp = url.split("#!");
    if(kvp.length!=2) { window.location = "index.html";}
    $('#a_stats').attr('href','stats.html#!'+kvp[1]);
    $('#a_home').attr('href','index.html#!'+kvp[1]);
    $('#a_charts').attr('href','charts.html#!'+kvp[1]);
    $('#a_history').attr('href','history.html#!'+kvp[1]);
    $('#a_team').attr('href','teams.html#!'+kvp[1]);
    return kvp[1];
  }

  Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
          ].join('-');
  };