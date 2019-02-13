var User = require("./user.js");

/**
 * 插入
 */
function insert(name) {
    var user = new User({
        username : name,                 //用户账号
        userpwd: 'abcd',                            //密码
        userage: 37,                                //年龄
        logindate : new Date()                      //最近登录时间
    });

    user.save(function (err, res) {

        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }

    });
}


insert('jim');
insert('jerry');

function findbyid(){

  User.findById('5a95b3375c6cc241038fdd72',function(error,doc){
    console.log("doc===",doc);
  })
}

findbyid()
