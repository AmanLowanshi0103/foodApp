const mongoose = require("mongoose");

const connectTOMongo = async () => {
    try {
        await mongoose.connect(('mongodb://localhost:27017/foodApp'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB sucessfully")
        // const fetch_data = mongoose.connection.db.collection("FoodData")
        // fetch_data.find({}).toArray(function (err, data) {
        //     if (err) console.log(err)
        //     else {
        //         global.FoodData = data
        //         console.log(global.FooData)
        //     }
        // })

    }
    catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectTOMongo();
