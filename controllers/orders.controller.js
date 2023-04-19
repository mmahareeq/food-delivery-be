const OrderModel = require('../model/order.model');

// add a new order
const addNewOrder = async(req, res)=>{
    const Order = new OrderModel(req.body);
    try {
        const newOrder = await Order.save();
        res.status(200).json({data: newOrder, massege: 'added a new Order successfully!'})
    } catch (error) {
        res.status(400).json(error);
    }

};

// get a speific order 
const getOrder = async (req, res)=>{
    const id = req.params.id;

    try {
        const order = await OrderModel.findOneById(id).exec();
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json(error);
    }

}
// get all orders
const getorders = async(req, res) =>{
    const search = req.query.search;
    const start = req.query.start || 1;
    const count = req.query.count || 10;
    const filter= {};
    req.session.isAuth = true;
    if(search)
       filter = {title: search};
    try {
        const orders = await OrderModel.find(filter)
        .populate('products.product')
        .skip(parseInt(start) - 1)
        .limit(parseInt(count))
        .exec();
        const count = await OrderModel.find(filter).count();
        res.status(200).json({data: orders, count: count });
    } catch (error) {
        res.status(400).json(error);
    }
}
// delete a order
const deleteOrder = async (req, res)=>{
    const id = req.params.id;

    try {
        await OrderModel.deleteOne({_id: id})
        res.status(200).json('delete the item successfully')
    } catch (error) {
        res.status(400).json(error);
        
    }
}

// update
const updateOrder = async(req, res)=>{
     const id = req.params.id;
     try {
        await OrderModel.findOneAndUpdate({_id: id}, {$set: req.body}).exec();
        res.status(200).json('update the order successfully');
     } catch (error) {
        res.status(400).json(error);
     }

}

module.exports = {addNewOrder, getOrder, getorders, deleteOrder, updateOrder};