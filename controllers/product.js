const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const createProduct = async (req,res) => {
    req.body.createdBy = req.user.userId;
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ product, createProduct:true })
}
const deleteProduct = async (req,res) => {
    const {
        user: { userId },
        params: { id: productId },
      } = req
    
      const job = await Product.findByIdAndRemove({
        _id: productId,
        createdBy: userId,
      })
      if (!job) {
        throw new NotFoundError(`No job with id ${productId}`)
      }
      res.status(StatusCodes.OK).json({deleteProduct:true})
}
const getProduct = async (req,res) => {
    const {
        user:{ userId },
        params:{ id : productId }
    } = req
    const product = await Product.findOne({
        _id:productId,
        createdBy:userId
    })

    if (!product) {
        throw new NotFoundError(`No job with id ${productId}`)
      }
      res.status(StatusCodes.OK).json({ product, getProduct:true })
}
const getAllProducts = async (req,res) => {
    const products = await Product.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ products, count: products.length, getAllProducts:true })
}
const updateProduct = async (req,res) => {
    const {
        body: { name, category, price },
        user: { userId } ,
        params: { id: productId}
    } = req;

    if (name === '' || category === '' || price === undefined  || price === null || price === '') {
        throw new BadRequestError('Name or Category or Price fields cannot be empty')
    }

    const product = await Product.findByIdAndUpdate(
        { _id: productId, createdBy: userId },
        req.body,
        { new: true, runValidators: true }
      )
      if (!product) {
        throw new NotFoundError(`No job with id ${productId}`)
      }
      res.status(StatusCodes.OK).json({ product, updateProduct:true })
}

module.exports = {
    createProduct,
    deleteProduct,
    getProduct,
    getAllProducts,
    updateProduct
}