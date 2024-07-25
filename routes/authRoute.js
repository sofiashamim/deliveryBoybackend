const express= require ('express');
const{ createDeliveryBoy, updateDeliveryBoy, deleteDeliveryBoy, loginDeliveryBoy, getAllDeliveryBoy,
    verifyPhoneOtp,
    logoutUser,
}=require('../controllers/authController')
const router = express.Router()

router.post('/register',createDeliveryBoy)
router.post('/login',loginDeliveryBoy)
router.post("/verify", verifyPhoneOtp)
router.put('/:_id',updateDeliveryBoy)
router.delete('/delete/:_id',deleteDeliveryBoy)
router.get('/getall',getAllDeliveryBoy)
router.put('/logout/:userId', logoutUser);

module.exports= router;