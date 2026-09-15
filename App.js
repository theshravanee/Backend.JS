let express  =require('express')
let mongoose=  require('mongoose')
let bcrypytjs= require('bcryptjs')
let app= express()
let User= require('./db/db.js')
let jwt=require('jsonwebtoken')
let cors = require("cors")
let {sendEmail}= require('./SendEmail.js')

app.use(cors())
app.use(express.json())

app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/db").then(()=>{
    console.log("db........")
})

app.listen(3000,()=>{
    console.log("serverrrrrrrrrr")
})

app.post('/', async(req, res)=>{
    let{name,email,password}=req.body

    let UserData= new User({
        name, email, password
    })

    await UserData.save()
    res.send("donnnnenneneenne")
})


app.post("/signUp", async(req, res)=>{
    let{name, email, password, role}=req.body
    let findData= await User.findOne({email})
    console.log(findData,"becybhniqwbuye")

    if(findData){
        return res.send("zinda hun haaaaannnnnnn")
    }else{
        let updatedp = await bcrypytjs.hash(password, 10)
        console.log(updatedp, "millllgiiiiiii")

        let UserInfo= new User({
            name, email,
            password:updatedp,
            role : role||'user'
        })

        await UserInfo.save()
        res.send("signup successful")
    }
})

app.post('/login', async(req,res)=>{
    let{email, password}= req.body;

    let findData= await User.findOne({email})
    console.log(findData,"email mil gayaaaaaa")

    if(findData==null){
        return res.send("email nhi milallala")
    }

    let validP= await bcrypytjs.compare(password, findData.password)//login password compared with singUp wala password
    if(!validP){
        return res.send("bhuuulllllaaaaaaa")
    }

    let token= jwt.sign({userId: findData._id,name:findData.name, email:findData.email, role:findData.role},"hehehe")
    console.log(token, "heheh")
    res.send(token)
})
let auth =(req, res, next)=>{ //custom middleware created 
    let token= req.headers.authorization;
    console.log(token,"hehehsssss")
    if(!token){
        return res.send("kaun hain aapppppp")
    }
    let decode= jwt.verify(token,"hehehe")
    console.log(decode,"isse");
    req.user=decode
    next()
}
let roleCheck=(role)=>{
    return (req, res, next)=>{
        if(req.user.role!=role){
            return res.send("baap se masti")
        }
        next()
    }
}

app.get('/me',auth,async(req,res)=>{
    let user= await User.findById(req.user.userId)
    console.log(user)
    res.send({
        name: user.name,
        email: user.email,
        role: user.role
    })
})
app.put('/me', auth, async(req,res)=>{
    let user= await User.findById(req.user.userId)
    user.name=req.body.name
    await user.save()

    res.send("done")
})
const crypto = require('crypto')
app.post('/forgot-password', async(req, res)=>{
    const {email}= req.body;
    try{
    const user = await User.findOne({ email });
    if (!user) {
       return res.status(404).send('User not found');
     }
    
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken= resetToken;
    user.resetTokenExpiry= Date.now()+3600000;

    const resetUrl = `${req.protocol}://${req.get('host')}/api/reset-password/${resetToken}`;
    await sendEmail(
      user.email,
      'Password Reset Request',
      `Click the link below to reset your password:\n\n${resetUrl}`
    );

    res.status(200).send('Password reset email sent');
   } catch (error) {
     res.status(500).send('Error sending password reset email: ' + error.message);
   }

});

app.get("/api",auth,roleCheck("admin"),(req,res)=>{
    res.send('hehe')
})