let express= require("express");
let app= express();
let signUp= require("./Routers/signUp")

app.use(express.json())

app.listen(4000,()=>{
    console.log("server running");
})