const router= require("express").Router();
const { response } = require("express");
const User = require("../models/User");
const Pin = require("../models/Pin");
const bcrypt =require("bcrypt");
const jwt = require('jsonwebtoken');


//update user
router.put("/:id",async(req,res)=>{
    if(req.body.userId===req.params.id ){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password=await bcrypr.hash(req.body.password, salt);
            }catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const user=await User.findByIdAndUpdate(req.params.id,{$set:req.body});
            res.status(200).json("Account has been updated");
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You can update only your account");
    }
});

//update account
router.put("/update/:id",async(req,res)=>{
    if(req.body.userId===req.params.id ){
        try{
            const user=await User.findByIdAndUpdate(req.params.id,{$set:req.body});
            res.status(200).json("Account has been updated");
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You can update only your account");
    }
});


//get a user

router.get("/all",async(req,res)=>{
    try{
        const userList = User.find().then(data => {
            res.status(200).json(data);
        });
    }
    catch(err){
        return res.status(403).json("Something went wrong.");
    }
});


router.get("/:id",async(req,res)=>{
    try{
        const user= await User.findById(req.params.id);
        const {password,updatedAt,createdAt, ...other}=user._doc;
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get("/by-username/:username",async(req,res)=>{
    try{
        const user= await User.findOne({ username: req.params.username });
        const {password,updatedAt,createdAt, ...other}=user._doc;
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});

//follow a user

router.put("/:id/follow", async(req,res)=>{
    if(req.body.userId!==req.params.id){
        try{
            const user= await User.findById(req.params.id);
            const currentUser= await User.findById(req.body.userId);

            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}});
                await currentUser.updateOne({$push:{followings:req.params.id}});
                res.status(200).json("user has been followed");
            }
            
            else{
                res.status(403).json("you already follow this user");
            }

        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You can`t follow yourself");
    }
    
});




//unfollow a user

router.put("/:id/unfollow", async(req,res)=>{
    if(req.body.userId!==req.params.id){
        try{
            const user= await User.findById(req.params.id);
            const currentUser= await User.findById(req.body.userId);

            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers:req.body.userId}});
                await currentUser.updateOne({$pull:{followings:req.params.id}});
                res.status(200).json("user has been unfollowed");
            }else{
                res.status(403).json("you don`t follow this user");
            }

        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You can`t unfollow yourself");
    }
    
})

router.get("/friends/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const friends = await Promise.all(
        user.followings.map((friendId) => {
          return User.findById(friendId);
        })
      );
      let friendList = [];
      friends.map((friend) => {
        const { _id, username, profilePicture } = friend;
        friendList.push({ _id, username, profilePicture });
      });
      res.status(200).json(friendList)
    } catch (err) {
      res.status(500).json(err);
    }
  });

//add user to a friendlist

// router.put('/:id/friend', async (req, res) => {
//     try {
//       const user = await User.findById(req.params.id);
//       const currentUser = await User.findById(req.body.userId);
  
//       if (!user || !currentUser) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       // Check if followers and following arrays exist for both users
//       if (!user.followers || !user.following || !currentUser.followers || !currentUser.following) {
//         return res.status(500).json({ message: 'Error: User data is incomplete' });
//       }
  
//       // Check if target user is in current user's following list and current user is in target user's followers list
//       const isFollower = currentUser.following.includes(user._id);
//       const isFollowing = user.followers.includes(currentUser._id);
  
//       if (isFollower && isFollowing) {
//         // If target user is already a friend, exit the function
//         if (currentUser.friendlist.includes(user._id)) {
//           return res.status(200).json({ message: 'User is already a friend' });
//         }
  
//         // Add target user to current user's friendlist
//         currentUser.friendlist.push(user._id);
//         await currentUser.save();
  
//         return res.status(200).json({ message: 'User added to friendlist' });
//       }
  
//       return res.status(403).json({ message: 'Users are not friends' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Failed to add user to friendlist' });
//     }
//   });

router.get("/:id/checkfollow/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.params.userId);
  
      const isFollowing = user.followers.includes(currentUser._id);
      const isFollowed = currentUser.followings.includes(user._id);
  
      res.status(200).json({ isFollowing, isFollowed });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  
  
  

  

module.exports=router;