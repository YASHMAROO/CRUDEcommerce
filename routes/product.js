const express=require('express');
const router=express.Router();
const Product=require('../model/Product');
const createDomPurify=require('dompurify');
const { JSDOM }=require('jsdom');

const window=new JSDOM('').window;
const DOMPurify=createDomPurify(window);

router.get('/', (req, res) => {
    Product.find({}).then(products => {
        if(products.length!=0) {
            res.status(200).json({products: products});
        } else {
            res.status(200).json({message: 'No products found'});
        }
    });
});

//Get all Products route
router.get('/products', (req, res) => {
    Product.find({}).then(products => {
        if(products.length!=0) {
            res.status(200).json({products: products});
        } else {
            res.status(200).json({message: 'No products found'});
        }
    });
});

//Creating a new product
router.post('/new_product', (req, res) => {
    let newProduct = new Product();
    let sellerId = req.body.sellerId;
    let name = req.body.name;
    let imageUrl = req.body.imageUrl;
    let description = req.body.description;
    let price = req.body.price;
    if(sellerId=='' || name=='' || imageUrl=='' || description=='' || price==0) {
        res.status(200).json({message: 'Please add all the fields'});
    } else {
        let sanitizedProduct = DOMPurify.sanitize(description);
        newProduct = {
            sellerId: sellerId,
            name: name,
            imageUrl: imageUrl,
            description: sanitizedProduct,
            price: price
        }
        Product.create(newProduct, (err, product) => {
            if(err) {
                res.status(200).json({message: "Couldn't add the product"});
            } else {
                res.status(200).json({message: 'Product added successfully', product: product});
            }
        });
    }
});

//Getting single products
router.get('products/:id', (req, res) => {
    Product.findById(req.params.id, (err, detailProduct) => {
        if(err) {
            res.status(200).json({error: err});
        } else {
            res.status(200).json({product: detailProduct});
        }
    })
})

//EDIT ROUTE
//Get the product to be updated
router.get('/:id/edit_product', (req,res) => {
    Product.findById(req.params.id, (err, productFound) => {
        if(err) {
            res.status(200).json({error: err});
        } else {
            res.status(200).json({product: productFound});
        }
    });
});

//Editing the product
router.put('/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body.product).then(editProduct => {
        res.status(200).json({product: editProduct, message: 'Product successfully updated'});
    })
})

//Deleting a product
router.delete('/:id/delete_product', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, response) => {
        if(err) {
            res.status(200).json({error: err});
        } else {
            res.status(200).json({message: 'Product successfully deleted'});
        }
    })
})

module.exports = router;