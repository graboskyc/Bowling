exports = async function(changeEvent) {
  var doc = changeEvent.fullDocument;
  var pconn = context.services.get("mongodb-atlas").db("bowling").collection("players");
  var gconn = context.services.get("mongodb-atlas").db("bowling").collection("games");
  
  var aqr = await gconn.aggregate([{$match:{name:doc.name}},{$group:{_id:"$name",avgpins: { $avg: "$total"}, totpins: { $sum: "$total"}}}]).toArray();
  var gp = await gconn.count({name:doc.name})*1;
  
  var st = await gconn.aggregate([{$match: { name: doc.name}},{$unwind: '$frames'},{$match: {'frames.b1':'X'}},{$count:"val"}]).toArray();
  var sp = await gconn.aggregate([{$match: { name: doc.name}},{$unwind: '$frames'},{$match: {'frames.b2':'/'}},{$count:"val"}]).toArray();
  var sl = await gconn.aggregate([{$match: { name: doc.name}},{$unwind: '$frames'},{$match: {'frames.split':true}},{$count:"val"}]).toArray();
  var spu = await gconn.aggregate([{$match: { name: 'Chris'}},{$unwind: '$frames'},{$match: {$and:[ {'frame.split':true},{'frames.b2':'/'}]}},{$count:"val"}]).toArray();
  
  var spuct = 0;
  var stct = 0;
  var spct = 0;
  var slct = 0;
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
  var d = new Date(Date.now());
  pconn.updateOne({name:doc.name},{$set:
    {name:doc.name,
    gamesplayed:gp,
    totalpins:aqr[0].totpins,
    average:Math.floor(aqr[0].avgpins),
    strikes:stct,
    spares:spct,
    splits:slct,
    splitspu:spuct,
    modified:d}},{upsert:true});
};
