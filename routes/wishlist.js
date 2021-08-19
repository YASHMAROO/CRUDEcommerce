const express=require('express');
const Product = require('../model/Product');
const router=express.Router();
const Wishlist=require('../model/Wishlist');

//Get the wishlist
router.get('/:buyer_id/wishlist', (req, res) => {
    Wishlist.findOne({buyerId: req.params.buyer_id}).then(wishlist => {
        if(wishlist === null) {
            res.status(200).json({message: "No items added in wishlist"});
        } else {
            res.status(200).json({wishlist: wishlist});
        }
    })
});

//Add item to wishlist
router.post('/:buyer_id/add_to_wishlist/:id', async (req, res) => {
    let wishlist = await Wishlist.findOne({buyerId: req.params.buyer_id});
    if(wishlist === null) {
        let wl = new Wishlist();
        let product = await Product.findById(req.params.id);
        wl.buyerId = req.params.buyer_id;
        wl.products[0] = product;
        Wishlist.create(wl, (err, wishlist) => {
            if(err) {
                res.status(200).json({message: "Couldn't add the product to the wishlist"});
            } else {
                res.status(200).json({message: 'Item added to wishlist', wishlist: wishlist});
            }
        }) 
    } else {
        let products=wishlist.products;
        let id=req.params.id;
        let itemIndex=products.findIndex(product => product._id == id);
        if(itemIndex > -1) {
            res.status(200).json({message: 'Item already present in the wishlist', wishlist: wishlist});
        } else {
            let product = await Product.findById(req.params.id);
            wishlist.products.push(product);
            wishlist.save();
            res.status(200).json({message: 'Item added to wishlist', wishlist: wishlist});
        }
    }
})

//Deleting item from the wishlist
router.post('/:buyer_id/delete_item/:id', async (req, res) => {
    let wishlist = await Wishlist.findOne({buyerId: req.params.buyer_id});
    if(wishlist === null) {
        res.status(200).json({message: "Wishlist Not Present"});
    } else {
        let itemIndex=wishlist.products.findIndex(product => product._id == req.params.id);
        wishlist.products.splice(itemIndex, 1);
        wishlist.save();
        res.status(200).json({message: "Item removed from the wishlist", wishlist: wishlist});
    }
});

//Emptying the entire wishlist
router.delete('/:buyer_id/empty_wishlist/:id', (req, res) => {
    Wishlist.findByIdAndRemove(req.params.id, (err, resposne) => {
        if(err) {
            if(err) {
                res.status(200).json({error: err});
            } else {
                res.status(200).json({message: 'Wishlist Emptied'});
            }
        }
    })
})

module.exports=router;