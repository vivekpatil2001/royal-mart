import express from "express";


import mongoose, { connect } from "mongoose";

import User from "./model/User.js";
import Product from "./model/Product.js";
import Order from "./model/Order.js";




import dotenv from "dotenv";
dotenv.config()

const app = express();

app.use(express.json());

const PORT = 5000;



const connectMongoDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI)

    if (conn) {
        console.log('mongoDB connect succesfully')
    }
}

//post signup

app.post('/signup', async (req, res) => {

    const { name, email, password, mobile, address, gender } = req.body;
    try {
        const user = new User({
            name: name,
            email: email,
            password: password,
            mobile: mobile,
            address: address,
            gender: gender

        });

        const saveduser = await user.save();

        res.json({
            success: true,
            data: saveduser,
            message: 'user saved'
        })
    } catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }


});

//login

app.post('/login', async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email, password }).select('email name mobile');

    if (user == null) {
        return res.json({
            success: false,
            message: 'login failed plz sign up '
        });
    }
    try {
        res.json({
            success: true,
            data: user,
            message: 'succesfully login user'
        })
    }
    catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }

});

//get/users

app.get('/users', async (req, res) => {


    const users = await User.find()

    res.json({
        success: true,
        data: users,
        message: 'succesfully fetch all users'
    })
})


//Get products

app.get('/products', async (req, res) => {

    const products = await Product.find()

    res.json({
        success: true,
        data: products,
        message: 'product fetch succesfully'
    })
});

//post product
app.post('/product', async (req, res) => {
    const { name,
        description,
        price,
        image,
        category,
        brand
    } = req.body;
    try {

        const product = new Product({
            name: name,
            description: description,
            price: price,
            image: image,
            category: category,
            brand: brand

        })

        const saveproduct = await product.save();

        res.json({
            success: true,
            data: saveproduct,
            message: "product saved succesfully"
        })
    }

    catch {
        (err) => {
            res.json({
                success: false,
                message: err.message
            })
        }

    }
});

//get product/:id
app.get('/product/:_id', async (req, res) => {
    const { _id } = req.params;

    const product = await Product.findOne({ _id: _id })

    res.json({
        success: true,
        data: product,
        message: 'succesfully find product'
    })

});

//delete/product/
app.delete('/product/:_id', async (req, res) => {
    const { _id } = req.params;
    await Product.deleteOne({ _id: _id });

    res.json({
        success: true,
        data: {},
        message: "product deleted succefully"
    })
});

//put//product/update
app.put('/product/:_id', async (req, res) => {
    const { _id } = req.params;
    const { name,
        description,
        price,
        image,
        category,
        brand
    } = req.body;

    const updateproduct = await Product.updateOne(
        { _id: _id },
        {
            $set: {
                name,
                description,
                price,
                image,
                category,
                brand
            }
        }
    )

    const updated_product = await Product.findOne({ _id: _id })

    res.json({
        success: true,
        data: updated_product,
        message: 'product updated succesfully'
    })
});

//get /product/search?query
app.get('/products/search', async (req, res) => {
    const { q } = req.query;

    const products = await Product.find({ name: { $regex: q, $options: "i" } })

    res.json({
        success: true,
        data: products,
        message: 'product searched'
    })
});


//get//orders
app.get('/orders', async (req, res) => {
    const orders = await Order.find()

    res.json({
        success: true,
        data: orders,
        message: 'order fetch succesfully'
    });
});

//post//order
app.post('/order', async (req, res) => {
    const { user,
        product,
        shippingAddress,
        deliveryCharges,
        quantity }
        = req.body

    const placeOrder = new Order({
        user,
        product,
        shippingAddress,
        deliveryCharges,
        quantity
    })

    try {
        const SaveOrder = await placeOrder.save()

        res.json({
            success: true,
            data: SaveOrder,
            message: 'Order Placed'
        })
    } catch (e) {
        res.json({
            success: false,
            message: e.message
        })
    }
});

//get//order/:id

app.get('/order/:id', async(req, res) => {
    const {id} = req.params;

    const order =  await Order.findById(id).populate("user product");

    order.user.password=undefined;

    res.json({
        success:true,
        data:order,
        message:'order fetch successfully'
    })
})



app.listen(PORT, () => {
    console.log(`port running on ${PORT}`)
    connectMongoDB();
})

