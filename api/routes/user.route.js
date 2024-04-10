import express from 'express';
import bcryptjs from "bcryptjs";
import { errorHandle } from "../utils/error.js";
import User from "../models/user.model.js";


const router = express.Router();





router.put('/update/:userId', async (req, res, next) => {


    if (req.body.password) {
        if (req.body.password.length < 6) {
          return next(errorHandle(400, "Password must be t least 6 characters"));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
    
      if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
          return next(
            errorHandle(400, "Username must be between 7 or 20 characters")
          );
        }
    
        if (req.body.username.includes(" ")) {
          return next(errorHandle(400, "username cannot contain spaces"));
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
          return next(errorHandle(400, "Usernme must be lowercase"));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
          return next(
            errorHandle(400, "username can only contain letters and numbers")
          );
        }
    }
        try {
          const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
              $set: {
                username: req.body.username,
                email: req.body.email,
                profilePicture: req.body.profilePicture,
                password: req.body.password,
                Name: req.body.Name,
                PhoneNumber:req.body.PhoneNumber,
                Address: req.body.Address,
                Height: req.body.Height,
                weight: req.body.weight,
    
    
              },
            },
            { new: true }
          );
    
          const { password, ...rest } = updatedUser._doc;
          res.status(200).json(rest);
        } catch (error) {
          next(error);
        }
   
  });

  router.post('/signout', async (req, res, next) => {
    
    try {
        res
          .clearCookie('access_token')
          .status(200)
          .json('User has been signed out');
      } catch (error) {
        next(error);
      }

  });


export default router;