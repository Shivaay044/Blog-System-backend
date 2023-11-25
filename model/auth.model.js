const mongoose = require("mongoose")




const authSchema = mongoose.Schema({
    name: {type:String, required:true },
    email: { type:String, required:true},
    password: { type:String, required:true},
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      }
})


const authModel = new mongoose.model('user', authSchema)



module.exports = {
    authModel
}