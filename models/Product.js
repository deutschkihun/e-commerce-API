const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide company name'],
      maxlength: 50,
    },
    category: {
      type: String,
      enum: ['Convenience', 'Preference', 'Quality','Performance','Functionality'],
      required: [true, 'Please provide cateogory'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide price'],
      maxlength: 100,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', ProductSchema)