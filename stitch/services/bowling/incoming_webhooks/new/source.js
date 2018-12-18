// Try running in the console below.
  
exports = function(payload, response) {
  var conn = context.services.get("mongodb-atlas").db("bowling").collection("games");
  var obj = JSON.parse(payload.query.obj);
  obj.played_on = new Date(obj.played_on);
  conn.insertOne(obj);
  
  var html="";
  
  html = "Created Record.";
  if(html.length > 1) {
    response.setHeader("Content-Type", "text/html");
    response.setBody(html);
  }
};