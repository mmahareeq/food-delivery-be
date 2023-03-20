const ProductModel = require('../model/product');


const getAllProducts = async (req, res) => {
    console.log(req.query);
    const {start, count, search} = req.query;
    let filter = {};
    if(search){
        filter = {
            $or: [{
                title:  new RegExp(search)
            }]
        }
    }
    try {
        const products = await ProductModel.find(filter)
        .skip(start - 1 || 0)
        .limit(count || 10).exec();
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

const getProductById = async(req, res)=>{
       const {id} = req.params;
       console.log(id)
       try {
         const product = await ProductModel.findById(id);
         res.status(200).json(product);
       } catch (error) {
        console.log(error)
        res.status(404).json(error)
       }
}
const addNewProduct = async (req, res) => {
    //console.log(req,16)
    let data = JSON.parse(req.body.data);
    if(req.file){
       data = {...data, img: `http://localhost:3500/images/${req.file.filename}`} 
    }
    const product = new ProductModel(data)
    try {
        await product.save();
        res.status(200).json({massege:'add a new product successfully', product: product});
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateProduct = async (req, res) => {
    const id = req.params.id;
    let data = JSON.parse(req.body.data);
     if(req.file){
        data = {...data, img: `http://localhost:3500/images/${req.file.filename}`} 
     }
    try {
        await ProductModel.findByIdAndUpdate(id, {
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

const uploadImage = async(req, res)=>{
    //console.log(req.body)
    if(req.file){
        console.log('file')
        const id = req.params.id;
        await ProductModel.updateOne({_id: id},{img: `http://localhost:3500/images/${req.file.filename}`}).exec();
        res.status(200).json('successed');
    }else{
        res.status(500).json('err')
    }

}
module.exports = { deleteProduct,
     getAllProducts,
     getProductById,
     addNewProduct, 
     updateProduct, 
     uploadImage};