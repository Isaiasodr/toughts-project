const {DataTypes} = require('sequelize')
const User = require('./User')
const db = require('../db/conn')

//User
const Tought = db.define('tought',{
    title:{
        type:DataTypes.STRING,
        allowNull:false,
        require: true,
    },
})
//um para um
Tought.belongsTo(User)
// um para muitos
User.hasMany(Tought)


module.exports = Tought