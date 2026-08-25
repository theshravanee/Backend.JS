// import fs from 'fs'
// // fs.writeFileSync("inex.html","helllll")
// // let data= fs.readFileSync("inex.html")
// // console.log(data.toString(), "heheheheheyhe");

// //CRUD-->
// //C- Create  -> writeFile/writeFileSync
// //R- Read    -> ''
// //U- Update  -> appendFile/appendFileSync
// //D- Delete  -> unlink/unlinkSync

// //Async file reading
// console.log("1");
// fs.writeFile("home.txt","hehehhe", ()=>{
//     console.log("hogyi!!!!")
// })
// console.log("2");
// //Async fn have a callback function (!!!)

// //Sync file reading
// console.log("1");
// fs.writeFileSync("text.txt","hhhhhhhhhh")
// fs.appendFileSync('text.txt','data to append');
// fs.unlinkSync('text.txt');


// // fs.mkdirSync("folder")
// fs.writeFileSync("folder/new.txt","hiiiiiieeeee")
// let data=fs.readFileSync("folder/new.txt")
// console.log(data.toString());
// fs.unlinkSync('folder/new.txt');
// fs.rmdirSync('folder')

//internal Sysytem 
// let os=require('os')
// console.log(os.totalmem()/1024/1024/1024)
// console.log(os.freemem()/1024/1024/1024)
// console.log(os.cpus());
// console.log(os.arch());
// console.log(os.uptime()/3600);


//server creation using http
// let http= require("http")

// let server= http.createServer((req,res)=>{
//     if(req.url=='/'){
//     res.end("helloo")
// }
// else if(req.url=='/about'){
//     res.end("about")
// }
// })
// server.listen(30001,()=>{
//     console.log("server runnniiinggggggggg.........");
// })

//server creating using express(internally supported by http)
let express= require('express')
let app= express()
app.use((req, res, next) => {
    console.log("mai hun donnnnnnnnnn");
    next();
});
app.use((req, res, next)=>{
    console.log("no non no no no ");
    next()
})
app.get('/',(req,res)=>{
    res.send("helllllllll");
})
app.post('/',(req, res)=>{
    res.send("post se aya hai");
})
app.listen(30001, ()=>{
    console.log("sseeerveddd");
})