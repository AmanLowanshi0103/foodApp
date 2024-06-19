const express = require('express')
const router =express.Router()

router.post("/foodapp/DisplayData", async(req,res)=>{
    try{
        res.send([global.FoodData,global.FoodCategory])
    }
    catch(err)
    {

    }
})
module.exports=router
