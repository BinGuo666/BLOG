let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let User = require('../models/users');

//连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/MyBlog');

mongoose.connection.on("connected",function(){
  console.log("MongoDB connected success!");
});

mongoose.connection.on("error",function(){
  console.log("MongoDB connected fail!");
});

mongoose.connection.on("disconnected",function(){
  console.log("MongoDB connected disconnected");
})


//博客登陆接口
router.post('/', function(req, res, next) {
  let userId ,userPwd;
  userId = req.body.userId;
  userPwd = req.body.userPwd;
  console.log('sdf');

  User.findOne({userId:userId},(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:""
      })
    }else{
      if(!doc){
        res.json({
          status:'2',
          msg:"该用户不存在",
          result:""
        })
      }else if(userPwd == doc.userPwd){
        req.session.userId = userId;
        res.json({
          status:'0',
          msg:"登陆成功",
          result:doc.userName
        })
      }else{
        res.json({
          status:'3',
          msg:"用户账号或者密码错误",
          result:""
        })
      }
    }
  })
});

//博客注册接口
router.post('/register',(req,res,next)=>{
  let userId,userName,userPwd,userAge,userQQ,userMail,userImg;
  userId = req.body.userId;
  userPwd = req.body.userPwd;
  userName = req.body.userName;
  let newuser = new User({
    "userId":userId,
    "userPwd":userPwd,
    "userName":userName
  })

  User.findOne({userId:userId},(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:""
      })
    }else if(doc){
      res.json({
        status:'2',
          msg:"该ID已经被注册",
          result:""
      })
    }else{
      newuser.save((err1,doc)=>{
        if(err1){
          res.json({
            status:'1',
            msg:err.message,
            result:""
          })
        }else{
          res.json({
            status:'0',
            msg:"注册成功",
            result:doc
          })
        }
      })
    }
  })

})


module.exports = router;
