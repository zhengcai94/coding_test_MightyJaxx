import Product from "../models/Product.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

const createProduct = async (req, res) => {
  const { title, SKU, image } = req.body;

  if (!title || !SKU || !image) {
    throw new BadRequestError("Please provide all values");
  }
  req.body.createdBy = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const { search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  }

  if(search) {
    queryObject.title = { $regex: search, $options: 'i'}
  }

  // No await
  let result = Product.find(queryObject);

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit; //10
  result = result.skip(skip).limit(limit);
  // 75
  // 10 10 10 10 10 10 10 5

  const products = await result;

  const totalProducts = await Product.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalProducts / limit);


  res
    .status(StatusCodes.OK)
    .json({ products, totalProducts, numOfPages });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;

  const { title, SKU, image } = req.body;

  if (!title || !SKU || !image) {
    throw new BadRequestError("Please provide all values");
  }

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new NotFoundError(`No job with id ${productId}`);
  }

  //check permissions
  console.log(typeof req.user.userId);
  console.log(typeof product.createdBy);
  checkPermissions(req.user, product.createdBy);

  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId },
    req.body,
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ updatedProduct });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new NotFoundError(`No job with id ${productId}`);
  }

  checkPermissions(req.user, product.createdBy);

  await product.remove();

  res.status(StatusCodes.OK).json({msg: 'Success! Job removed'});
};

const showStats = async (req, res) => {
  res.send("show stats");
};

export {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  showStats,
};
