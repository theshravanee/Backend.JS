let express= require("express")
let router= express.Router()

router.get('/signUp',(req,res)=>{
    try{
            let{name, email, password, role}=req.body
        let findData= await User.findOne({email})
        console.log(findData,"")
    
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
        }
        catch(e){
            res.send("error in signing up");
        }
    res.send("signed up");
})

module.exports=router
