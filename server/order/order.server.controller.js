/*
 * @author: Manuel Araujo <alejandromanuel5187@gmail.com>
 * Created on 2017-09-24 23:57:09 
 */

 const Order = require('./order.server.model');

 exports.register = (req, res) => {
     if (req.body.cname)        return res.status(400).json({ success: false, message: 'You must provide a client name'})        
     if (req.body.payMethod)    return res.status(400).json({ success: false, message: 'You must provide a payment method'})
     if (req.body.totalAmount)  return res.status(400).json({ success: false, message: 'You must provide a total amount'})
     if (req.body.orderDetail)  return res.status(400).json({ success: false, message: 'You must provide a order detail'})
     
     let order = new Order({
        cname: req.body.cname,
        payMethod: req.body.payMethod,
        totalAmount: req.body.payMethod,
        orderDetail: req.body.orderDetail
     })

     order.save( (err) => {
        if (err) return res.status(500).json({ success: false, message: 'Oh no, something went wrong'});

        return res.status(201).json({ success: true, message: 'Order Registered'})
     });
 }
