const CartModel = require('../model/cart.model');

const getCart = async(req, res)=>{
    if(await req?.session?.cart ){
      const cart = req.session.cart;
     
      const Cart = await CartModel.findById(cart)
                  .populate('products.product');
      const count = await CartModel.find({_id: cart}).count();
      res.status(200).json({cart: Cart, count: count});
    }
    else if(await req.session?.user && await !req.session?.cart){
       let Cart = await CartModel.find({user: req.session?.user})
               .populate('products.product'); 
        if(!Cart.length){
         data = {user: req.session?.user}
        Cart =  await new CartModel(data).save();
        }
        req.session.cart = Cart._id;
        res.status(200).json(Cart);
        
    }
     else if(await !req?.session?.user && await !req?.session?.cart){
      const data = {};
      const Cart = await new CartModel(data).save(); 
      
      if(Cart) {
         req.session.cart= Cart._id;
         res.status(200).json(Cart);
      }
    }else 
      res.status(400).json('error'); 
}

const addCart = async(req,res)=>{
   const cart = new CartModel(req.body);
   try {
      const newCart =   await cart.save();
      req.session.cart = newCart._id;
      res.status(200).json({message: 'create a new cart successfully'});
   } catch (error) {
    
   }
}

const updateCart = async (req, res)=>{
    const idCart = req.session.cart;
    const {product, quantity} = req.body;
    try {
       const cart =  await CartModel.findOneAndUpdate({_id: idCart},
         { $push: {products: {product: product,  quantity:  quantity}}},
         { new: true })
         .exec();
        res.status(200).json({cart: cart, count: cart?.products.length});
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