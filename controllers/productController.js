const ProductModel = require('../model/product');

const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find().exec();
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

const addNewProduct = async (res, req) => {
    const product = new ProductModel(req.body)
    try {
        const savedProduct = await product.save();
        res.status(200).json({ massege: 'add a new product successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        const updated =await ProductModel.findByIdAndUpdate(id, {
            $set: data
        }, { new: true }
        ).exec();
        res.status(200).json({massege:'update a prduct sucessfully'})

    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteProduct = async(req, res)=>{
    const id = req.params.id;
    try {
        await ProductModel.findByIdAndDelete(id).exec();
        res.status(200).json({massege:'product has been deleted ... '})
    } catch (error) {
        res.status(500).json(err)
    }
}