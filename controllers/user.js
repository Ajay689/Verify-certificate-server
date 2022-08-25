const User = require("../models/user.js");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");


const create_user = (req, res, next) => {
   User.find({
        email: req.body.email
    }).exec()
        .then(user => {
            console.log("This is the user");
            console.log(user);

            if (user.length >= 1) {
                return res.status(409).json({
                    message: "email already exist"
                });
            } else {
                bcryptjs.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    }
                    else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,
                        })
                        user.save()
                            .then(result => {
                                console.log("This is the result from saving");
                                console.log(result);
                                res.status(201).json({
                                    message: "User created",
                                    user: result
                                })
                            })

                    }
                })


            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
};
const get_all_users = (req, res, next) => {
    User.find()
        .exec()
        .then((users) => {
            const responseObject = {

                count: users.length,
                message: "Got all users successfully",
                users: users.map(user => {
                    return {
                        user,
                        request: {
                            type: "GET",
                            url: `http://localhost:4000/users/${user._id}`,
                        }
                    }
                })

            }

            res.status(200).json(responseObject)
        })
        .catch(
            err => console.log(err)
        )

}
const user_login = (req, res, next) => {
    User.find({
        email: req.body.email.toLowerCase()
    })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                })
            }
            bcryptjs.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    res.status(401).json({
                        message: "Auth failed"
                    })
                }
                if (result) {

                    const token = jsonwebtoken.sign(
                        {
                            email: user[0].email,
                            accessLevel: user[0].accessLevel
                        },
                        "sud",
                        {
                            expiresIn: "1h"
                        }
                    )
                    return res.status(200).json({
                        message: "Login Successfull",
                        token
                    })
                }

            })
        })
        .catch(err => {
            res.status(500).json({
                merror: "There has been an error",
                error: err
            })
        })
}
module.exports = { create_user, get_all_users, user_login };
