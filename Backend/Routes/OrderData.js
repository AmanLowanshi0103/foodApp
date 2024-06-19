const express = require('express');
const Order = require('../Schemas/OrderSchemas');
const router =express.Router()

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    console.log("1231242343242354",req.body.Email)

    //if Email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'Email': req.body.Email })    
    console.log(eId)
    if (eId===null) {
        try {
            console.log(data)
            console.log("1231242343242354",req.body.Email)
            await Order.create({
                Email: req.body.Email,
                order_data:[data]
            })
            res.json({ success: true })
        } catch (error) {
            console.log(error.message)
            res.status(500).send({error:error.message})
        }
    }

    else {
        try {
            await Order.findOneAndUpdate({Email:req.body.Email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.status(500).send({error:"Internal server Error2"})
        }
    }
})

router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.Email)
        let eId = await Order.findOne({ 'Email': req.body.Email })
        console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.status(500).send({error:"Internal server Error 3"})
    }
    

});
module.exports=router