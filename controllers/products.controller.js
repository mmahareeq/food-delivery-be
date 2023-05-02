const ProductModel = require('../model/product.model');
const fs = require('fs');

const getAllProducts = async (req, res) => {

    const { start, count, search, category } = req.query;
    let filter = {};
    if (search) {
        filter = {
            $or: [{
                title: new RegExp(search)
            }]
        }
    }
    if (category) {
        if (Object.keys(filter).length !== 0) {
            const newOption = filter.$or;
            newOption.push({ 'category[0].name': category });
            filter = { $or: newOption }

        } else {
            filter = {
                $or: [{
                    'category.0.name': category
                }]
            }
        }
    }
    try {
        const Products = await ProductModel.aggregate([
            {
                $lookup: {
                    from: 'categorymodels',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            { $match: filter },
            {
                $facet: {
                    products: [{ $skip: +start - 1 || 0 }, { $limit: +count || 10 }],
                    count: [{ $count: 'total' }],
                },
            },])
        res.status(200).json(Products);
    }
    catch (err) {
        res.status(400).json(err);
    }
}

const getProductById = async (req, res) => {
    const { id } = req.params;
   
    try {
        const product = await ProductModel.findById(id)
            .populate('category');
        product = { ...product, averageRating: product.averageRating }
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json(error)
    }
}
const addNewProduct = async (req, res) => {
    let data = JSON.parse(req.body.data);
    if (req.file) {
        const filePath = process.env.API || 'http://localhost:3500';
        data = { ...data, img: `${filePath}/images/${req.file.filename}` }
    }
    const product = new ProductModel(data)
    try {
        await product.save();
        //product.averageRating;
        res.status(200).json({ massege: 'add a new product successfully', product: product });
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateProduct = async (req, res) => {
    const id = req.params.id;
    let data = JSON.parse(req.body.data);
    if (req.file) {
        const filePath = process.env.API || 'http://localhost:3500';
        data = { ...data, img: `${filePath}/images/${req.file.filename}` }
    }
    try {
        await ProductModel.findByIdAndUpdate(id, {
            $set: data
        }, { new: true }
        ).exec();
        res.status(200).json({ massege: 'update a prduct sucessfully' })

    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteProduct = async (req, res) => {

    const id = req.params.id;

    try {
        const product = await ProductModel.findByIdAndDelete(id).exec();
        
        fs.unlink(`.${product?.img?.substr(21)}`, (err) => {
            if (err) {
                res.status(500).send({
                    message: "Could not delete the file. " + err,
                });
            }
        });
        res.status(200).json({ massege: 'product has been deleted ... ' })
    } catch (error) {
        res.status(500).json(err)
    }
}

const uploadImage = async (req, res) => {
    if (req.file) {
        const filePath = process.env.API || 'http://localhost:3500';
        const id = req.params.id;
        await ProductModel.updateOne({ _id: id }, { img: `${filePath}/images/${req.file.filename}` }).exec();
        res.status(200).json('successed');
    } else {
        res.status(500).json('err')
    }

}
module.exports = {
    deleteProduct,
    getAllProducts,
    getProductById,
    addNewProduct,
    updateProduct,
    uploadImage
};