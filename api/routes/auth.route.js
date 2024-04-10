import express from "express";
import User from "../models/user.model.js";
import coform from "../models/Form.js";
import bcryptjs from "bcryptjs";
import { errorHandle } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import feed from "../models/Feedback.js";
import Notification from "../models/Notification.js";


const router = express.Router();

router.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password, Name, PhoneNumber, Address, Height, weight } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
      throw new Error('All fields are required');
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      Name,
      PhoneNumber,
      Address,
      Height,
      weight
    });

    await newUser.save();
    res.json('Signup success');
  } catch (error) {
    next(error);
  }
});

router.post("/signin", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
      throw new Error('All fields are required');
    }

    const validUser = await User.findOne({ email });
    if (!validUser) {
      throw new Error('User not found');
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      throw new Error('Invalid password');
    }

    

    const token = jwt.sign({id: validUser._id, ismanger: validUser.ismanger}, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res.status(200).cookie('access_token', token, {
        httponly: false
    }).json(rest);
  } catch (error) {
    next(error);
  }
});

router.post("/Fcreate", async (req, res, next) => {
  try {
    const { CurrentuseId, name, Email, type, descrp } = req.body;
    const newFeed = new feed({ CurrentuseId, name, Email, type, descrp });
    const savedfeed = await newFeed.save();
    res.status(201).json(savedfeed);
  } catch (error) {
    next(error);
  }
});

router.post("/Formcreate", async (req, res, next) => {
  try {
    const { category, name, phone, desc } = req.body;
    const newForm = new coform({ category, name, phone, desc });
    const savedform = await newForm.save();
    res.status(201).json(savedform);
  } catch (error) {
    next(error);
  }
});

router.post("/Notficreate", async (req, res, next) => {
  try {
    const { tilte, desc } = req.body;
    const newNotfi = new Notification({ tilte, desc });
    const savedNotfi = await newNotfi.save();
    res.status(201).json(savedNotfi);
  } catch (error) {
    next(error);
  }
});

router.get('/getNotifi', async (req, res, next) => {
  try {
    const Notfi = await Notification.find();
    res.json({ message: "User details retrieved successfully", Notfi });
  } catch (error) {
    next(error);
  }
});

router.delete('/deleteNotif/:NotifiId', async (req, res, next) => {
  try {
    const deletedNotifi = await Notification.findByIdAndDelete(req.params.NotifiId);
    if (!deletedNotifi) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    res.status(200).json({ message: 'The notification has been deleted' });
  } catch (error) {
    next(error);
  }
});

router.get('/getUser', async (req, res, next) => {
  try {
    const user = await User.find();
    res.json({ message: "User details retrieved successfully", user });
  } catch (error) {
    next(error);
  }
});

router.delete('/deleteuser/:deleteuserId', async (req, res, next) => {
  try {
    const deleteduser = await User.findByIdAndDelete(req.params.deleteuserId);
    if (!deleteduser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'The user has been deleted' });
  } catch (error) {
    next(error);
  }
});

router.get('/gefeed/:CurrentuseId', async (req, res, next) => {
  try {
    const { CurrentuseId } = req.params;
    const Feed = await feed.find({ CurrentuseId });
    if (Feed.length > 0) {
      res.json({ message: "Employee details retrieved successfully", Feed });
    } else {
      return res.status(404).json({ error: "House not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.get('/gefeedall', async (req, res, next) => {
  try {
    const Feed = await feed.find();
    if (Feed.length > 0) {
      res.json({ message: "User details retrieved successfully", Feed });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.put('/updatefeed/:FeedId', async (req, res, next) => {
  try {
    const updatehouse = await feed.findByIdAndUpdate(req.params.FeedId, {
      $set: {
        name: req.body.name,
        Email: req.body.Email,
        type: req.body.type,
        descrp: req.body.descrp
      },
    }, { new: true });
    res.status(200).json(updatehouse);
  } catch (error) {
    next(error);
  }
});

router.delete('/deletefeed/:FeeddId', async (req, res, next) => {
  try {
    const deletedEmployee = await feed.findByIdAndDelete(req.params.FeeddId);
    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json({ message: 'The Employee has been deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;

