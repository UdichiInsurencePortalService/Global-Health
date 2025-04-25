const mongoose = require('mongoose');
const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
.then(()=>{
    console.log("mongo db connect")
}).catch((err)=>{
    console.log("mongo db not connect",err)
})

