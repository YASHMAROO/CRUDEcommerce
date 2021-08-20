## CRUD Operations for eCommerce applications

### CRUD for products with details
**GET PRODUCTS LIST**
>Route : '/'
**Response returned**
```JSON
{
    "products": [
        {
            "_id": "611e3870beb79c5023e542ec",
            "sellerId": "1",
            "name": "USB Converter",
            "imageUrl": "https://picsum.photos/200",
            "description": "B to C type converter",
            "price": 999,
            "__v": 0
        },
        {
            "_id": "611e4089d147d258518367ac",
            "sellerId": "1",
            "name": "Test Product 2",
            "imageUrl": "https://picsum.photos/200",
            "description": "Awesome Product",
            "price": 100,
            "__v": 0
        },
    ]
}
```

**GET INDIVIDUAL PRODUCTS**

>Route : '/products/:id'

_:id is the parameter for the id  of the product to be found_

**Response returned**
```JSON
{
    "products": [
        {
            "_id": "611e3870beb79c5023e542ec",
            "sellerId": "1",
            "name": "USB Converter",
            "imageUrl": "https://picsum.photos/200",
            "description": "B to C type converter",
            "price": 999,
            "__v": 0
        },
    ]
}
```

**Add a new product**

>Route : '/new_product'

_req.body =_
```JSON
{
    "sellerId": "4",
    "name": "Gibberish",
    "imageUrl": "https://picsum.photos/200",
    "description": "Lorem Ipsum",
    "price": 4000
}
```

**Response returned**
```JSON
{
    "message": "Product added successfully",
    "product": {
        "_id": "611f598bccdb5db2ec7be997",
        "sellerId": "4",
        "name": "Phone Cover",
        "imageUrl": "https://picsum.photos/200",
        "description": "Neon Cover",
        "price": 400,
        "__v": 0
    }
}
```

**Edit a Product**
>Get the product to be edited previous details

>Route: /:id/edit_product
**Response returned**
```JSON
{
    "product": {
        "_id": "611f598bccdb5db2ec7be997",
        "sellerId": "4",
        "name": "Phone Cover",
        "imageUrl": "https://picsum.photos/200",
        "description": "Neon Cover",
        "price": 400,
        "__v": 0
    }
}
```

>Put request to edit the details

>Route: /:id

_req.body =_
```JSON
{
    "product" : {
        "sellerId": "1",
        "name": "USB Converter",
        "imageUrl": "https://picsum.photos/200",
        "description": "B to C type converter",
        "price": 899
    }
}
```
**Response returned**
```JSON
{
    "message": "Product successfully updated"
}
```
## Similarly the other routes for cart and products are made
>buyer_id: Any integer for which the cart or wishlist is needed

>id: Product mongoDb id

### Wishlist Routes
|Request Type|Route|Use of the Route|
|----|-----|-----------------|
|GET|/:buyer_id/wishlist|Returns the content of the wishlist for a particular buyer id|
|POST|/wishlist/:buyer_id/add_item/:id|Adding items to the wishlist|
|POST|/wishlist/:buyer_id/delete_item/:id|Deleting the product from the wishlist|
|POST|/wishlist/:buyer_id/empty_all|Empty the wishlist at a go|

### Cart Routes
|Request Type|Route|Use of the Route|
|----|-----|-----------------|
|GET|/cart/:buyer_id|Returns the content of the cart for a particular buyer id|
|POST|/cart/:buyer_id/add_item/:id|Adding items to the cart or increasing the quantity for a item in a cart|
|POST|/cart/:buyer_id/delete_item/:id|Deleting the product from the cart|
|POST|/cart/:buyer_id/delete_one/:id|Deleting the instances of a product from the cart|
|POST|/cart/:buyer_id/empty_all|Empty the cart at a go|


