const CartModel = require('../model/cart');

const getCart = async(req, res)=>{
   //const id = req.params.id;
   const cartId = req.seesion.cart;
   try {
    const cart = await CartModel.findById(cartId).exec();
    res.status(200).json({data: cart});
   } catch (error) {
    res.status(400).json(error);
   }
}

const addCart = async(req,res)=>{
   const cart = new CartModel(req.body);
   try {
      const newCart =   await cart.save();
      res.status(200).json({message: 'create a new cart successfully'});
      req.session.cart = newCart._id;
   } catch (error) {
    
   }
}

const updateCart = async (req, res)=>{
    const idCart = req.params.id;
    try {
       const cart = await CartModel.findByIdAndUpdate(idCart, {$set: req.body}).exec();
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json(error);
    }
}

const deleteItemFromCart = async (req,res)=>{
     const id = req.params.id;
     const ProductId = req.query.productId;
     try {
        await CartModel.updateOne({_id: id},
            { $pull: {products: {product: new mongoose.Types.ObjectId(ProductId)}}})
            .exec();
        res.status(200).json('delete the item from cart successfully');
     } catch (error) {
        res.status(400).json(error);
     }   

}


module.exports = {addCart, updateCart, getCart, deleteItemFromCart}