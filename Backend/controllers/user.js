const { where } = require('sequelize')
const User = require('../models/users')

module.exports.getUser = (req,res)=>{
    User.findAll().then((user)=>{
        //console.log(user)
        res.json(user)
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports.getUserByEmail = (req,res)=>{
    User.findAll({where: {email:req.params.email}}).then((user)=>{
        //console.log(user)
        res.json(user[0])
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports.createUser = (req,res)=>{
    const user = JSON.parse(req.body.data)
    User.create({name:user.name,email:user.email,phone:user.phone}).then((user)=>{
        //console.log(user.dataValues)
        res.json(user.dataValues)
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports.deleteUser = (req,res)=>{
    User.destroy({where:{email:req.params.email}}).then((user)=>{
        //console.log(user)
        res.json(user)
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