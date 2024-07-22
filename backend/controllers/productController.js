import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = process.env.PAGINATION_LIMIT;

    const page = Number(req.query.pageNumber) || 1;
 
    const keyword = req.query.keyword 
                       ? { 
                            name: { 
                                  $regex: req.query.keyword, $options: 'i' 
                                    } 
                            } : {}   //search bar

    const  count = await Product.countDocuments({...keyword});

     

    const products = await Product.find({...keyword})
                    .limit(pageSize)
                    .skip(pageSize * (page - 1))
    
    res.json({products, page, pages: Math.ceil(count / pageSize)});
});

// @desc    Fetch a product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.deleteOne({_id: product._id});
        res.status(200).json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;
    
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.image = image || product.image;
        product.brand = brand || product.brand;
        product.category = category || product.category;
        product.countInStock = countInStock || product.countInStock;

        const updatedProduct = await product.save();
        res.json(updateProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});
// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    // const {
    //     name,
    //     price,
    //     description,
    //     image,
    //     brand,
    //     category,
    //     countInStock,
    // } = req.body;

    const product = new Product({
        name:'sample name',
        price: 0,
        user: req.user._id,
        image: '/imagess/6.jpg',
        brand: 'sample brand',
        category:"sample category",
        countInStock:0,
        numReviews: 0,
        description: 'sample description',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    Create newww review
// @route   POST /api/products/:id/REVIEW
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const {rating, comment} = req.body;

    const product = await Product.findById(req.params.id);
    if (product) {
        const alreadyReviwed = product.reviews.find(
               (review)=> review.user.toString() === req.user._id.toString())
   
      if(alreadyReviwed){
        res.status(400);
        throw new Error('Product already reviewed');
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = 
            product.reviews.reduce((acc,review)=> acc + review.rating, 0) / 
            product.reviews.length;

            await product.save();
            res.status(201).json({message: "Review added"})
    }
    else {
        res.status(404);
        throw new Error('Resource not found');
    }
});


// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating:1 }).limit(3);
   res.status(200).json(products);
});




export { getProducts, getProductById, deleteProduct, updateProduct, createProduct, createProductReview, getTopProducts};
