exports = async function(changeEvent) {
  var doc = changeEvent.fullDocument;
  var pconn = context.services.get("mongodb-atlas").db("bowling").collection("players");
  var gconn = context.services.get("mongodb-atlas").db("bowling").collection("games");
  
  var aqr = await gconn.aggregate([{$match:{name:doc.name}},{$group:{_id:"$name",avgpins: { $avg: "$total"}, totpins: { $sum: "$total"}, minpins: {$min: "$total"}, maxpins: {$max: "$total"}}}]).toArray();
  var lm = new Date();
  lm.setDate(lm.getDate() - 30);
  var aqrth = await gconn.aggregate([{$match:{name:doc.name,played_on: {"$gt": lm }}},{$group:{_id:"$name",avgpins: { $avg: "$total"}, totpins: { $sum: "$total"}, minpins: {$min: "$total"}, maxpins: {$max: "$total"}}}]).toArray();
  var gp = await gconn.count({name:doc.name})*1;
  var league = await gconn.aggregate([{$group:{_id:"$name",avgpins: { $avg: "$total"}, totpins: { $sum: "$total"}}}]).toArray();

  pconn.updateMany({},{$set:{leagueavg:Math.floor(league[0].avgpins)}});
  
  var user = await pconn.findOne({name:doc.name});
  
  // strike, spare, split, splits picked up, first ball average, open frames
  var st = await gconn.aggregate([{$match: { name: doc.name}},{$unwind: '$frames'},{$match: {$or: [{'frames.b1':10},{'frames.b2':10},{'frames.b3':10}]}},{$count:"val"}]).toArray();
  var sp = await gconn.aggregate([{$match: { name: doc.name}},{$unwind: '$frames'},{$match: {$or: [{'frames.spare':true},{'frames.b3spare':true}]}},{$count:"val"}]).toArray();
  var sl = await gconn.aggregate([{$match: { name: doc.name}},{$unwind: '$frames'},{$match: {'frames.split':true}},{$count:"val"}]).toArray();
  var spu = await gconn.aggregate([{$match: { name: doc.name}},{$unwind: '$frames'},{$match: {$and:[ {'frames.split':true},{'frames.spare':true}]}},{$count:"val"}]).toArray();
  var fba = await gconn.aggregate([{$match: { name: doc.name}},{$unwind: '$frames'},{$group:{_id:"$name",val:{$avg: "$frames.b1"}}}]).toArray();
  var ofa = await gconn.aggregate([{$match: { name: doc.name}},{$unwind: '$frames'},{$match: {$and: [{'frames.spare':false},{'frames.b1':{$lt: 10}}]}},{$count:"val"}]).toArray();
  var spuct,stct,spct,slct,fbact,ofct = 0;
  var fplayed = 10*gp;
  try {
    spuct = spu[0].val;
  } catch(err) {
    spuct = 0;
  }
  try {
    stct = st[0].val;
  } catch(err) {
    stct = 0;
  }
  try {
    spct = sp[0].val;
  } catch(err) {
    spct = 0;
  }
  try {
    slct = sl[0].val;
  } catch(err) {
    slct = 0;
  }
  try {
    fbact = fba[0].val;
  } catch(err) {
    fbact = 0;
  }
  try {
    ofct = ofa[0].val;
  } catch(err) {
    ofct = 0;
  }
  var d = new Date(Date.now());
  var hc = Math.floor((200 - Math.floor(aqr[0].avgpins))*.85);
  pconn.updateOne({name:doc.name},{$set:
    {name:doc.name,
    gamesplayed:gp,
    totalpins:aqr[0].totpins,
    average:Math.floor(aqr[0].avgpins),
    strikes:stct,
    spares:spct,
    splits:slct,
    splitspu:spuct,
    firstballavg:Math.floor(fbact*100)/100,
    openframes:ofct,
    framesplayed:fplayed,
    leagueavg:Math.floor(league[0].avgpins),
    minpins:aqr[0].minpins,
    maxpins:aqr[0].maxpins,
    handicap:hc,
    modified:d}},{upsert:true});
    
  if (user.hasOwnProperty("phone")) {
    const twilio = context.services.get("twil");
    const ourNumber = context.values.get("twilphone");
    twilio.send({
      from: ourNumber,
      to: user.phone,
      body: 'You bowled a ' + doc.total + '. All time avg is ' + Math.floor(aqr[0].avgpins) + ' and 30 day avg is ' + Math.floor(aqrth[0].avgpins) + '. See https://grabosky.azurewebsites.net/Bowling/#!' + doc.name
    });
  }
};