/*
 * @author: Manuel Araujo <alejandromanuel5187@gmail.com>
 * Created on 2017-09-25 01:26:54 
 */
const mogoose = require('mongoose');
const Schema = mongoose.Schema; // Import Schema from Mongoose

const orderSchema = new Schema({
    status: {
        type: String,
        require: true,
        enum: ['comanda', 'en proceso', 'terminado'],
        default: 'comanda'
    },
    cname: {
        type: String,
        require: true
    },
    creationTime: {
      type: String,
      default: Date.now()
    },
    payMethod: {
        type: String,
        enum: ['Efectivo', 'Tarjeta']
    },
    totalAmount: {
      type: Number,
      require: true
    },
    orderDetail: [{
        plate: String,
        price: Number
    }]
  
  });

  const Order = module.exports = mongoose.model('Order', orderSchema);