var mongodb = require('mongodb');
mongodb.MongoClient.connect("mongodb://localhost/db1",function(err,db){
    if(!err){
      for (var i = 0; i < 100; i++) {
        db.collection("second").insert({a:i},function(err,result){
            if(!err){
                console.log(result);
            }
        })
      }
    }
})
