const mongoose = require("mongoose")


const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
   userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    }

},{timestamps:true})

const CategoryModel = mongoose.model("CategoryModel", CategorySchema)

module.exports = CategoryModel