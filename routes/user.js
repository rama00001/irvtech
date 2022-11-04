import express from "express";
const router = express.Router();
import { User_info } from '../schemas/user_schema.js';
import { User_profile } from '../schemas/user_profile.schema.js';
import Bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import auth from "./auth.js";


const register = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = new User_info({
            email, password, firsrt_name, last_name, img
        });

        const result = await user.save()
        console.log(result);
        res.json(result);

    } catch (error) {
        console.log(error)
        res.json(error)
    }
}


const login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    if (!email || !password) {
        return res.status(401).json({ message: 'Email or Password missing' });
    }
    User_info.findOne({ email: email }, (err, user) => {
        if (err) {
            return res.json({ err });
        }
        if (user !== null) {
            if (password == user.password) {
                const { email } = user;
                const token = jwt.sign({ email }, "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu", {
                    expiresIn: '120d',
                })
                res.json({ token });
            } else {
                res.status(401).json({ message: 'Incorrect Password' })
            }
        }
        else {
            res.status(404).json({ result: 'user not found' })
        }
    })

}

const user_list = async (req, res) => {
    try {
        User_profile.find()
            .then(response => {
                res.json({
                    response
                })
            })

    }
    catch (error) {
        res.json({
            error
        })
    }
}

const user_add = async (req, res) => {
    try {
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const user_id = `${uuidv4()}-${req.body.first_name}-${req.body.last_name}`
        const img = req.body.img;
        const user = new User_profile({
            first_name, last_name, img, user_id
        });

        const result = await user.save()
        console.log(result);
        res.json(result);

    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

const get_single_user = (req, res, next) => {
    let user_id = req.body.user_id
    User_profile.findById(user_id)
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured'
            })

        })
}

const update_user = (req, res, next) => {
    console.log(req.query.user_id)
    let user_id = req.query.user_id

    let updateData = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        img : req.body.img
    }
    console.log(updateData)
    console.log(user_id)
    User_profile.findByIdAndUpdate(user_id, { $set: updateData })
        .then(() => {
            res.json({
                message: 'User profile updated successfully'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured!'
            })
        })
}

router.post('/user/signup', (req, res) => register(req, res))
router.post('/user/login', (req, res) => login(req, res))
router.get('/users/list', (req, res) => user_list(req, res))
router.post('/users/add', (req, res) => user_add(req, res))
router.get('/get_single_user', (req, res) => get_single_user(req, res))
router.put('/update_user/:user_id', auth , (req, res) => update_user(req, res))


export default router;