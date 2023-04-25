const router= require("express").Router();
const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt = require('jsonwebtoken');
//Register
router.post("/register",async (req,res)=>{
   

   try{
        //Хеширование пароля
        const salt=await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //Добавление пользователя
        const newUser=new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        //Сохранения пользователя и получение ответа

        const user=await newUser.save();
        //Token creation 
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.status(200).json({ user, token });
        
   } catch(err){
        res.status(500).json(err)
   }


});

//Login
router.post("/login", async(req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email});
        !user && res.status(404).json("User not found")

        const validPassword =await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("Wrong password")

        //Token creation 
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.status(200).json({ user, token });
    } catch(err){
        res.status(500).json(err)
    }

    
});
router.get("/test",async(req,res)=>{
    try{
        var token = req.headers.authorization.split(' ')[1];
        var decodedToken = jwt.decode(token, process.env.JWT_SECRET, { complete: true });
        var user = await User.findById(decodedToken.id);
        res.status(200).send('Hello ' + user.email + '!');
    }
    catch(err) {
        res.status(401).json('Unauthorized');
    }
});


module.exports=router;