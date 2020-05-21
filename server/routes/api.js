const express = require("express")
const router = express.Router();
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const User = require("../models/user")
const Claimant = require("../models/claimant")

const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10;

const db = "mongodb://localhost:27017/lcms";

mongoose.connect(db, {useNewUrlParser: true}, function (error) {
  if (error) {
    console.log(error)
  } else {
    console.log("connection sucessful");
  }
});

//verifying the token
function verifyToken(req, res, next) {
  if (!req.headers.authorization){
    return res.status(401).send("Unauthorized request");
  }

  let token = req.headers.authorization.split(" ")[1];

  if (token === "null") {
    return res.status(401).send("Unauthorized request");
  }

  let payload = jwt.sign(token, "lcms");
  if (!payload){
    return res.status(401).send("Unauthorized request");
  }
  req.userId = payload.subject;

  next();
}

//claimant registration API

router.post("/register",function (req,res,next) {
  var userData = new User(req.body);
 // var email = req.body.username;
 // var password = req.body.password;
userData.save(function (err, user) {
  if (err){
    res.send("error saving user")
  } else {
    let payload = {subject: user._id};
    let token = jwt.sign(payload, "lcms");
    res.send({token});
  }
})
})

//Admin login API
router.post("/login",(req, res, next)=>{
  console.log("login in");
  let userData = req.body;
  User.findOne({email: userData.email}, (error, user) => {
    if (error) {
     return res.send(error)
    }
    if (!user) {
     return res.send("account does not exist")
    }
//checking whether password matches with the existing one in the db
    user.comparePassword(req.body.password, function (error, isMatch) {
      if (!isMatch && isMatch != true) {
        res.send("invalid password");
      } else {
        let payload = {subject: user._id};
        let token = jwt.sign(payload, "lcms");
        res.send({token});
      }
    });
  });
});

//currently logged in user admin
router.get("/user",verifyToken, function (req,res) {
  console.log("retrieving the currently logged in user")

  //getting the payload and accessing the user _id
  var loggedInUser = jwt.decode(req.headers.authorization.split(" ")[1],"lcms");

//retrieving the currently loggen in user
  User.findById({_id:loggedInUser.subject}).exec(function (err, user) {
    if (err) {
      return res.send("Error:cant retrieve the user")
    } else {
      res.json(user)
    }
  });
});


//adding a new claimant API
router.post("/claimant", verifyToken,(req,res) => {
  console.log("adding  for all claimants");
  var claimant = new Claimant(req.body);
  claimant.save(function (error, newcase) {
    if (error){
      return res.send("cant retrieve the claimants");
    } else {
      res.json(newcase);
    }
  });
});

//getting all claimants API
router.get("/claimants", verifyToken,(req,res) => {
  console.log("get request for all claimants");
Claimant.find({status: true}).sort({status: -1}).exec(function (error, claimants) {
  if (error){
    return res.send("cant retrieve the claimants");
  } else {
    res.json(claimants);
  }
});
});

//getting all closed cases
router.get("/closed-cases", verifyToken,(req,res) => {
  console.log("get closed cases");
  Claimant.find({status: false}).sort({status: -1}).exec(function (error, cases) {
    if (error){
      return res.send("cant retrieve the cases");
    } else {
      res.json(cases);
    }
  });
});
//total claimants API
router.get("/claimants/all", (req, res) => {
  console.log("getting total claimants")
  Claimant.aggregate([{$match:{status:true}},{$count:"total_claimants"}],function (err, total) {
    if (err){
      res.send("error in the query")
    } else {
      res.send(total)
    }
  });
});

//total closed cases API
router.get("/claimants/total-closed", (req, res) => {
  console.log("getting closed cases")
  Claimant.aggregate([{$match:{status:false}},{$count:"total_closed"}],function (err, total) {
    if (err){
      res.send("error in the query")
    } else {
      res.send(total)
    }
  });
});
//getting currently log in claimant
router.get("/claimant",verifyToken, function (req,res) {
  console.log("retrieving the currently logged in claimant")

  //getting the payload and accessing the user _id
  var loggedInClaimant = jwt.decode(req.headers.authorization.split(" ")[1],"lcms");

//retrieving the currently loggen in user
console.log(loggedInClaimant.subject)
  mysubject=mongoose.Types.ObjectId(loggedInClaimant.subject);
  Claimant.findById({_id:mysubject}, {password: 0}).exec(function (err, claimant) {
    if (err) {
      return res.send("Error:cant retrieve the user")
    } else {
      res.json(claimant)
    }
  });
});
//Claimant login API
router.post("/claimant/login",(req, res, next)=>{
  console.log("login in claimant");
  let claimantData = req.body;
  Claimant.findOne({phone: claimantData.phone}, (error, claimant) => {
    if (error) {
      return res.send(error)
    }
    if (!claimant) {
      return res.send("account does not exist")
    }
//checking whether password matches with the existing one in the db
    claimant.comparePassword(req.body.password, function (error, isMatch) {
      if (!isMatch && isMatch != true) {
        res.send("invalid password");
      } else {
        let payload = {subject: claimant._id};
        let token = jwt.sign(payload, "lcms");
        res.send({token});
      }
    });
  });
});

//get case by id
router.get("/claimant/:id",verifyToken, function (req,res) {
  console.log("retrieving the case to update")

//retrieving the currently loggen in user
  Claimant.findById(req.params.id, {password: 0}).exec(function (err, claimant) {
    if (err) {
      return res.send("Error:cant retrieve the user")
    } else {
      res.json(claimant)
    }
  });
});
router.put("/claimant/defendant/:id",verifyToken, function (req,res) {
  console.log("adding defendant in the case");
  Claimant.findByIdAndUpdate(req.params.id,
    {
      $push: {
        defendant: {first_name: req.body.first_name, middle_name: req.body.middle_name, last_name: req.body.last_name,
          gender: req.body.gender, address: req.body.address, phone: req.body.phone}
        }
      },
    {
      new: true
    },function (error, updatedClaimant) {
    if (error){
      return res.send("error updating case")
    } else {
      return res.send(updatedClaimant);
    }
  });
});
router.put("/claimant/witness/:id",verifyToken, function (req,res) {
  console.log("adding witness in the case");
  Claimant.findByIdAndUpdate(req.params.id,
    {
      $push: {
        witness: {first_name: req.body.first_name, middle_name: req.body.middle_name, last_name: req.body.last_name,
          gender: req.body.gender, phone: req.body.phone}
      }
    },
    {
      new: true
    },function (error, updatedCase) {
      if (error){
        return res.send("error updating case")
      } else {
        return res.send(updatedCase);
      }
    });
});

//API for adding lawyer
router.put("/claimant/lawyer/:id",verifyToken, function (req,res) {
  console.log("adding lawyer in the case");
  Claimant.findByIdAndUpdate(req.params.id,
    {
      $push: {
        lawyer: {first_name: req.body.first_name, last_name: req.body.last_name,
          phone: req.body.phone, address: req.body.address, organization: req.body.organization
        }
      }
    },
    {
      new: true
    },function (error, updatedCase) {
      if (error){
        return res.send("error updating case")
      } else {
        return res.send(updatedCase);
      }
    });
});

//API for adding case progress
router.put("/claimant/case-progress/:id",verifyToken, function (req,res) {
  console.log("adding case progress in the case");
  Claimant.findByIdAndUpdate(req.params.id,
    {
      $push: {
        progress: {stage: req.body.stage, date: req.body.date}
      }
    },
    {
      new: true
    },function (error, updatedCase) {
      if (error){
        return res.send("error updating case")
      } else {
        return res.send(updatedCase);
      }
    });
});

//API for closing case file
router.put("/claimant/close-file/:id",verifyToken, function (req,res) {
  console.log("closing case");
  Claimant.findByIdAndUpdate(req.params.id,
    {
      $set: {
        judgement:req.body.judgement, status: false
      }
    },
    {
      new: true
    },function (error, updatedCase) {
      if (error){
        return res.send("error updating case")
      } else {
        return res.send(updatedCase);
      }
    });
});
//API for resetting admin user password
router.put("/user/reset-password/:id",verifyToken, function (req,res) {
  console.log("resetting admin password");
  user = req.body;
  bcrypt.hash(user.password, SALT_WORK_FACTOR, function (err,hash) {
    if (err) {
      return err;
    }
    //overide the cleartext password with the hashed one
    user.password = hash;
    // claimant.updated_date = Date.now();
   // myid = mongoose.Types.ObjectId(req.params.id);
    User.findByIdAndUpdate(req.params.id,
      {
        $set: {password: user.password}
      },
      {
        new: true
      },function (error, updateduser) {
        if (error){
          return res.send("error resetting password")
        } else {
          return res.send(updateduser);
        }
      });
  });
});
//API for resetting claimant's password
router.put("/claimant/reset-password/:id",verifyToken, function (req,res) {
  console.log("resetting claimant password");
claimant = req.body;
  bcrypt.hash(claimant.password, SALT_WORK_FACTOR, function (err,hash) {
    if (err) {
      return err;
    }
    //overide the cleartext password with the hashed one
    claimant.password = hash;
   // claimant.updated_date = Date.now();

    Claimant.findByIdAndUpdate(req.params.id,
      {
        $set: {password: claimant.password ,updated_date: Date.now()}
      },
      {
        new: true
      },function (error, updatedCase) {
        if (error){
          return res.send("error updating case")
        } else {
          return res.send(updatedCase);
        }
      });
  });
});

//API for Total No of witnessess
router.get("/claimant/total-witness/:id",function (req,res) {
  console.log("total no of witnesses");
  myid = mongoose.Types.ObjectId(req.params.id);
  Claimant.aggregate([{$match:{_id: myid}},{$project:{_id:0,witness: 1}},{$unwind: "$witness"},{$count: "total_witness"}], function (error,data) {
    if (error) {
      res.send("error getting data");
    } else {
      res.send(data);
    }
  })
});


//API for Total No of defendants
router.get("/claimant/total-defendant/:id",function (req,res) {
  console.log("total no of defendant");
  myid = mongoose.Types.ObjectId(req.params.id);
  Claimant.aggregate([{$match:{_id:myid}},{$project:{_id:0,defendant: 1}},{$unwind: "$defendant"},{$count: "total_defendant"}], function (error,data) {
    if (error) {
      res.send("error getting data");
    } else {
      res.send(data);
    }
  })
});
//get case by claimant phone
router.post('/case/case-id',verifyToken,(req,res)=>{
  console.log("getting a particular case");
  Claimant.aggregate([{$match:{phone:req.body.phone}},{$project:{password:0}}], (error,data)=>{
    if (error) {
      res.send("error getting the case");
    } else {
      res.send(data);
    }
  })
});
module.exports = router;
