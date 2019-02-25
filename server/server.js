const {mongoose} = require('./../db/mongoose');
const {ProductModel} = require('./../model/products');

const _ = require('lodash');

const {ObjectID} = require('mongodb');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/products', (req, res)=> {
    const newProduct = new ProductModel ({
        product_name: req.body.product_name,
        product_category: req.body.product_category,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity
    });
    newProduct.save().then((product)=> {
        res.send({product});
    }, (err) => {
        res.status(400).send(err);
    })
});

app.get('/products', (req, res)=> {
    ProductModel.find().then((products)=> {
        res.send({products});
    }, (err)=> {
        res.status(400).send(err);
    });

})

app.get('/products/:id', (req, res)=> {
    const id = req.params.id
    //check if id is valid
    if(!ObjectID.isValid(id)){
        return res.status(400).send()
    }
//else
    ProductModel.findById(id).then((product)=> {
        res.send(product);
    }, (err)=> {
        res.status(404).send(err)
    })
    
})

app.put('/products/:id', (req,res)=> {
    //first define the id
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(400).send()
    }
    //use lodash to specify the fields you want to allow update on
    const body = _.pick(req.body, ['product_name', 'product_category', 'price', 'description', 'quantity']);
    
    ProductModel.findByIdAndUpdate(id, {
        $set: body,
        $inc: {
            quantity: -1                    //(body.quantity)
        }
    }, {new: true}).then((product) => {
        res.send({product})
    }, (err) => {
        res.status(400).send()
    })
})


app.listen(5000, ()=> {
    console.log('server listening on port 5000')
})