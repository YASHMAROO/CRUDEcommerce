const express=require('express');
const router=express.Router();
const Cart=require('../model/Cart');
const Product = require('../model/Product');
const { route } = require('./product');

//Get the cart
router.get('/cart/:buyer_id', (req, res) => {
    Cart.findOne({buyerId: req.params.buyer_id}).then(cart => {
        if(cart === null) {
            res.status(200).json({message: "Cart is Empty"});
        } else {
            res.status(200).json({cart: cart});
        }
    })
});

//Adding item to a cart
router.post('/cart/:buyer_id/add_item/:id', async (req, res) => {
    let cart = await Cart.findOne({buyerId: req.params.buyer_id});
    if(cart === null) {
        let newCart = new Cart();
        let product = await Product.findById(req.params.id);
        newCart.buyerId = req.params.buyer_id;
        newCart.products[0] = {
            productId: req.params.id,
            quantity: 1,
            price: product.price,
            name: product.name,
            description: product.description,
            imageUrl: product.imageUrl
        }
        newCart.totalQty = 1;
        newCart.totalAmt = product.price;
        console.log(newCart);
        Cart.create(newCart, (err, cart) => {
            if(err) {
                res.status(200).json({message: "Couldn't add the product to the cart hello", error: err});
            } else {
                res.status(200).json({message: 'Item added to cart', cart: cart});
            }
        })
    } else {
        let products = cart.products;
        let foundIndex = products.findIndex(product => product.productId == req.params.id);
        if(foundIndex > -1) {
            cart.products[foundIndex].quantity+=1;
            cart.totalQty+=1;
            cart.totalAmt+=cart.products[foundIndex].price;
            cart.save();
            res.status(200).json({message: 'Item quantity increased', cart: cart});
        } else {
            let product = await Product.findById(req.params.id);
            cart.products.push({
                productId: req.params.id,
                quantity: 1,
                price: product.price,
                name: product.name,
                description: product.description,
                imageUrl: product.imageUrl
            })
            cart.totalQty+=1;
            cart.totalAmt+=product.price;
            cart.save();
            res.status(200).json({message: 'Item added to cart', cart: cart});
        }
    }
});

//Deleting the product from the cart
router.post('/cart/:buyer_id/delete_item/:id', async (req, res) => {
    let cart = await Cart.findOne({buyerId: req.params.buyer_id});
    if(cart === null) {
        res.status(200).json({message: 'Cart not found'});
    } else {
        let foundIndex = cart.products.findIndex(product => product.productId == req.params.id);
        if(foundIndex > -1) {
            let product = cart.products[foundIndex];
            cart.products.splice(foundIndex, 1);
            if(product.quantity <= cart.totalQty) {
                cart.totalQty -= product.quantity;
            } else {
                res.status(200).json({message: 'Invalid request'});    
            }
            if(cart.totalAmt >= product.quantity*product.price) {
                cart.totalAmt -= product.quantity*product.price;    
            } else {
                res.status(200).json({message: 'Invalid request'});    
            }
            cart.save();
            res.status(200).json({message: 'Item removed from the cart', cart: cart});
        } else {
            res.status(200).json({message: 'Item not found'});
        }
    }
});

//Deleting 1 instance of the product
router.post('/cart/:buyer_id/delete_one/:id', async (req, res) => {
    let cart = await Cart.findOne({buyerId: req.params.buyer_id});
    let foundIndex = cart.products.findIndex(product => product.productId == req.params.id);
    if(foundIndex > -1) {
        let product = cart.products[foundIndex];
        if(product.quantity == 1 && product.quantity >=0) {
            cart.products.splice(foundIndex, 1);
            if(product.quantity <= cart.totalQty) {
                cart.totalQty -= product.quantity;
            } else {
                res.status(200).json({message: 'Invalid request'});    
            }
            if(cart.totalAmt >= product.quantity*product.price) {
                cart.totalAmt -= product.quantity*product.price;    
            } else {
                res.status(200).json({message: 'Invalid request'});    
            }
            cart.save();
            res.status(200).json({message: 'Item removed from the cart', cart: cart});
        } else if(product.quantity > 1){
            cart.products[foundIndex].quantity-=1;
            cart.totalQty -= 1;
            cart.totalAmt -= product.price;
            cart.save();
            res.status(200).json({message: 'Request successful', cart: cart});
        } else {
            res.status(200).json({message: 'Invalid request'});
        }
    } else {
        res.status(200).json({message: 'Item not found'});
    }
})

//Emptying the cart
router.post('/cart/:buyer_id/empty_all', async (req, res) => {
    let cart = await Cart.findOne({buyerId: req.params.buyer_id});
    if(cart == null) {
        res.status(200).json({message: 'Cart not found'});
    } else {
        cart.totalAmt = 0;
        cart.totalQty = 0;
        let length = cart.products.length;
        cart.products.splice(0, length);
        cart.save();
        res.status(200).json({message: 'Cart Emptied', cart: cart});
    }
});

//Deleting the cart
router.delete('/cart/:buyer_id/delete_cart/:id', (req, res) => {
    Cart.findByIdAndRemove(req.params.id, (err, resposne) => {
        if(err) {
            if(err) {
                res.status(200).json({error: err});
            } else {
                res.status(200).json({message: 'Cart Deleted'});
            }
        }
    })
})

module.exports=router;