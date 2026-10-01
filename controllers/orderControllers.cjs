const Order = require("../Models/orderModel.cjs");

const getOrders = async (req, res) => {
  try {
   
    const userId = req.user?.id || req.user?._id;

    const orders = await Order.findAll({
      where: { userId: userId }, 
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Get Orders Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    console.log("REQ BODY RECEIVED:", req.body);
    console.log("SHIPPING ADDRESS:", req.body.shippingAddress);
    const { items, paymentMethod, shippingAddress, totalAmount, status } = req.body;
    
    const userId = req.user?.id || req.user?._id;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const uniqueOrderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

    
    for (let item of items) {
      await Order.create({
        orderId: uniqueOrderId,
        productTitle: item.title || item.productTitle,
        price: item.price,
        quantity: item.quantity || 1,
        userId: userId,
        paymentMethod: paymentMethod || 'cod',
        totalAmount: totalAmount || (item.price * (item.quantity || 1)),
        productImage: item.image || item.productImage || '',
        fullName: shippingAddress?.fullName || "N/A",
        phone: shippingAddress?.phone || "N/A",
        address: shippingAddress?.address || "N/A",
        city: shippingAddress?.city || "N/A",
        status: status || 'Success'
      });
    }

    res.status(201).json({ 
      success: true, 
      message: 'Order placed successfully!', 
      orderId: uniqueOrderId 
    });

  } catch (error) {
    console.error("Sequelize Error:", error); 
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
   
    const deleted = await Order.destroy({ where: { id: orderId } });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getOrderById = async (req, res) => {
    try {
        const paramId = req.params.id; 
        const userId = req.user.id;   

        
        const order = await Order.findOne({
            where: {
                id: paramId, 
                userId: userId
            }
        });

        
        let finalOrder = order;
        if (!finalOrder) {
            finalOrder = await Order.findOne({
                where: {
                    orderId: paramId,
                    userId: userId
                }
            });
        }

        if (!finalOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, order: finalOrder });
    } catch (error) {
        console.error("Error in getOrderById:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
  getOrders,
  createOrder,
  deleteOrder,
  getOrderById
};