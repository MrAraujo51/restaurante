/*
 * @author: Manuel Araujo <alejandromanuel5187@gmail.com>
 * Created on 2017-09-24 23:57:09 
 */

const Order = require('./order.server.model');

exports.register = (req, res) => {
    if (!req.body.cname) return res.status(400).json({
        success: false,
        message: 'You must provide a client name'
    })
    if (!req.body.payMethod) return res.status(400).json({
        success: false,
        message: 'You must provide a payment method'
    })
    if (!req.body.totalAmount)  return res.status(400).json({ 
        success: false, 
        message: 'You must provide a total amount'
    })
    if (!req.body.orderDetail) return res.status(400).json({
        success: false,
        message: 'You must provide a order detail'
    })

    let order = new Order({
        cname: req.body.cname,
        payMethod: req.body.payMethod,
        totalAmount: req.body.totalAmount,
        orderDetail: req.body.orderDetail
    })

    order.save((err) => {
        if (err) return res.status(500).json({
            success: false,
            message: 'Oh no, something went wrong'
        });

        return res.status(201).json({
            success: true,
            message: 'Order Registered'
        })
    });
}

exports.getAllOrders = (req, res) => {
    Order.find({}, (err, orders) => {
        if (err) return res.status(500).json({
            success: false,
            message: `Error al realizar la peticion: ${err}`
        })
        if (!orders) return res.status(404).json({
            success: false,
            message: `No existen ordenes`
        })

        res.status(200).json({
            success: true,
            orders: orders
        })
    })
}

exports.getAllPendingOrders = (req, res) => {
    Order.find({status: "comanda"}).sort('-creationTime').exec((err, orders) => {
        if (err) return res.status(500).json({
            success: false,
            message: `Error al realizar la peticion: ${err}`
        })
        if (!orders) return res.status(404).json({
            success: false,
            message: `No existen ordenes`
        })

        res.status(200).json({
            success: true,
            orders: orders
        })
    })
}

exports.getAllInProcessOrders = (req, res) => {
    Order.find({ status: "en proceso" }).sort('-creationTime').exec((err, orders) => {
        if (err) return res.status(500).json({
            success: false,
            message: `Error al realizar la peticion: ${err}`
        })
        if (!orders) return res.status(404).json({
            success: false,
            message: `No existen ordenes`
        })

        res.status(200).json({
            success: true,
            orders: orders
        })
    })
}

exports.getAllDoneOrders = (req, res) => {
    Order.find({ status: "terminado" }).sort('-creationTime').exec((err, orders) => {
        if (err) return res.status(500).json({
            success: false,
            message: `Error al realizar la peticion: ${err}`
        })
        if (!orders) return res.status(404).json({
            success: false,
            message: `No existen ordenes`
        })

        res.status(200).json({
            success: true,
            orders: orders
        })
    })
}
exports.isInProcess = (req, res) => {

    if (req.user.rol === 'cajero') return res.status(400).json({
        success: false,
        message: 'No tienes permisos para hacer eso'
    })

    if (!req.body.order_id) return res.status(400).json({
        success: false,
        message: 'You must provide a Order ID'
    });
    console.log(req.body.order_id);
    Order.findById(req.body.order_id, (err, order) => {
        if (err) return res.status(500).json({
            success: false,
            message: `Error al realizar la peticion: ${err}`
        })
        if (!order) return res.status(404).json({
            success: false,
            message: `No existe la orden`
        })
        console.log("lo encontro");
        order.status = 'en proceso'
        order.save( (err) => {
            if (err) return res.status(500).json({
                success: false,
                message: `Oh no, something went wrong ${err}`
            });
            console.log("llego");
            return res.status(201).json({
                success: true,
                message: 'Order Status updated'
            })
        })
    })
}

exports.isDone = (req, res) => {
    // if (req.user.rol === 'cajero') return res.status(400).json({
    //     success: false,
    //     message: 'No tienes permisos para hacer eso'
    // })

    if (!req.body.order_id) return res.status(400).json({
        success: false,
        message: 'You must provide a Order ID'
    });

    Order.findById(req.body.order_id, (err, order) => {
        if (err) return res.status(500).json({
            success: false,
            message: `Error al realizar la peticion: ${err}`
        })
        if (!order) return res.status(404).json({
            success: false,
            message: `No existe la orden`
        })

        order.status = 'terminado'
        order.save( (err) => {
            if (err) return res.status(500).json({
                success: false,
                message: 'Oh no, something went wrong'
            });

            return res.status(201).json({
                success: true,
                message: 'Order Status updated'
            })
        })
    })
}