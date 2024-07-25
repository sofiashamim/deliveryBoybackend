let Auth= require('../models/Auth');
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const {
    PHONE_NOT_FOUND_ERR,
  
    PHONE_ALREADY_EXISTS_ERR,
    USER_NOT_FOUND_ERR,
    INCORRECT_OTP_ERR,
    ACCESS_DENIED_ERR,
  } = require("../errors");
const { generateOTP, fast2sms } = require("../utils/otp.util");

let createDeliveryBoy= async(req,res,next)=>{
    let {name,email,password,phoneNumber}=req.body;

    try {
        const phoneExist = await Auth.findOne({ phoneNumber });
        if (phoneExist) {
            next({ status: 400, message: PHONE_ALREADY_EXISTS_ERR });
            return;
          }
        let user= await Auth.findOne({email:email});
        if(!user){
            const salt = bcrypt.genSaltSync(10);
            const hashpassword = bcrypt.hashSync(password, salt);
            const otp = generateOTP(4);
            const deliveryBoyId = shortid.generate();
         user= await new Auth({
            name:req.body.name,
            email:req.body.email,
            password:hashpassword,
            phoneNumber:req.body.phoneNumber,
            phoneOtp:otp,
            isVerified: false,
            onlineStatus: false,
            orders: [],
            earnings: [],
            deliveryBoyId: deliveryBoyId
        })
        
        

        await user.save()
          res.status(200).json({success:true,msg:"user created successfully and OTP sended to mobile number",otp,user})

         

         await fast2sms(
            {
              message: `Your OTP is ${otp}`,
              contactNumber: user.phone,
            },
            next
          );
    }
    else{
        return res.status(200).json({success:true,msg:"user already exists"})
    }
    } catch (error) {
        // res.send("error in creating user")
        return res.status(500).json({ success:false,msg:"error in register user",error:error.message})
    }
}

let verifyPhoneOtp = async (req, res, next) => {
    try {
      const { otp, userId } = req.body;
      const user = await Auth.findById(userId);
      console.log(otp,user);
    if (!user) {
      next({ status: 400, message: USER_NOT_FOUND_ERR });
      return;
    }

    if (user.phoneOtp !== otp) {
      next({ status: 400, message: INCORRECT_OTP_ERR });
      return;
    }
    // const token = createJwtToken({ userId: user._id });

    user.phoneOtp = "";
    await user.save();

    res.status(201).json({
      type: "success",
      message: "OTP verified successfully",
      data: {
        
        userId: user._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

let loginDeliveryBoy= async(req,res)=>{
    let {email,password}= req.body
  try {
      let user= await Auth.findOne({email:req.body.email})
      if (user) {
        let comparePassword= bcrypt.compareSync(password,user.password); // true
        if(comparePassword){
           return res.json({success:true,msg:"user logged in successfully",user})
        }
        else{
            return res.json({success:false,msg:"Invalid password"})
        }
        
    } else {
        return res.json({success:false,msg:"invalid credentials or user not found"})
    }
  } catch (error) {
    res.json({success:false,msg:"error in logged in user"})
  }

}

let updateDeliveryBoy= async(req,res)=>{
    // let updatedUserpassword= req.body.password
    let {name,password,phoneNumber}=req.body;
    let id= req.params._id;
    let hashpassword;
    try {
        if (password) {
            const salt= await bcrypt.genSaltSync(10)
            hashpassword= await bcrypt.hashSync(password,salt)
            
        } 
        console.log(id)
        let userExists= await Auth.findByIdAndUpdate(id,{$set:{phoneNumber:phoneNumber,name:name,password:hashpassword}})

        return res.status(200).json({success:true,msg:"user updated successfully"})

    } catch (error) {
        return res.status(500).json({success:false,msg:"error in updating user",error:error.message})
    }

}

let deleteDeliveryBoy= async(req,res)=>{
    try {
       let user= await Auth.findByIdAndDelete(req.params._id)
       res.status(200).json({success:true,msg:"user deleted "})
             
    } catch (error) {
       return res.status(500).json({success:false,msg:"error in deleting user"}) 
    }
}

// to be used in admin panel
let getAllDeliveryBoy= async (req,res)=>{
    let allUser= await Auth.find({})
    if (allUser) {
        return res.status(200).json({success:true,msg:"users found",allUser})
    } else {
        return res.status(404).json({success:false,msg:"users not found"})
    }
}

const logoutUser = async (req, res) => {
  const { userId } = req.params; // Assuming you pass userId as a route parameter

  try {
    // Find the user by userId
    const user = await Auth.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update onlineStatus to false
    user.onlineStatus = false;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'User logged out successfully' });
  } catch (err) {
    console.error('Error logging out user:', err);
    res.status(500).json({ error: 'Server error' });
  }
};




module.exports ={
    createDeliveryBoy,
    updateDeliveryBoy,
    deleteDeliveryBoy,
    loginDeliveryBoy,
    getAllDeliveryBoy,
    verifyPhoneOtp,
    logoutUser

}