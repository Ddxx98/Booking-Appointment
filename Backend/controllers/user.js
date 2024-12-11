const { where } = require('sequelize')
const User = require('../models/users')

module.exports.getUser = (req,res)=>{
    User.findAll().then((user)=>{
        console.log(user)
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports.getUserByEmail = (req,res)=>{
    User.findAll({where: {"email":req.params.email}}).then((user)=>{
        console.log(user)
        res.json(user[0])
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports.createUser = (req,res)=>{
    const user = JSON.parse(req.body.data)
    console.log("create",user.email)
    User.create({name:user.username,email:user.email,phone:user.phone}).then((user)=>{
        console.log(user)
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports.deleteUser = (req,res)=>{
    User.destroy({email:req.params.email}).then((user)=>{
        console.log(user)
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports.editUser = (req,res)=>{
    User.create({email:req.params.email}).then((user)=>{
        console.log(user)
    }).catch((err)=>{
        console.log(err)
    })
}