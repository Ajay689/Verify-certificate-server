const Cert = require("../models/cert.js");
const mongoose = require("mongoose");

const create_cert = (req, res, next) => {
    Cert.find({
        email: req.body.email
    }).exec()
        .then(cert => {
            console.log("This is the user");
            console.log(cert);

            if (cert.length >= 1) {
                return res.status(208).json({
                    message: "email already exist"
                });
            } else {
                const cert = new Cert({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    course: req.body.course,
                    email: req.body.email,
                    rollNo: req.body.rollNo,
                    date: Date.now(),
                })
                cert.save()
                    .then(result => {
                        console.log("This is the result from saving");
                        console.log(result);
                        res.status(201).json({
                            message: "Certificate Added",
                            cert: result
                        })
                    })
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
};
const get_all_cert = (req, res, next) => {
    Cert.find()
        .exec()
        .then((users) => {
            const responseObject = {

                count: users.length,
                message: "Got all users successfully",
                users: users.map(cert => {
                    return {
                        cert,
                    }
                })

            }

            res.status(200).json(responseObject)
        })
        .catch(
            err => console.log(err)
        )

}

const get_cert = (req, res, next) => {
    let certId = req.params.certId;
    Cert.find({
        _id: certId
    }).exec()
        .then(
            cert => {
                if (cert.length >= 1) {
                    res.status(200).json({
                        message: "Certificate verified successfully",
                        certId,
                        cert,
                    })
                }
            }
        )
        .catch(err => {
            res.status(204).json({
                merror: "There has been an error",
                error: err
            })
        })
}

const delete_cert = (req, res, next) => {
    let rollNo = req.params.rollNo
    Cert.remove({
        rollNo: rollNo
    })
        .exec()
        .then(
            result => (
                res.status(200).json({
                    message: "User successfully removed"
                })
            )
        )
        .catch(err => {
            res.status(500).json({
                merror: "There has been an error",
                error: err
            })
        })
}

const update_cert = (req, res, next) => {
    const rollNo = req.params.rollNo
    const updateOps = {}

    for (const [key, value] of Object.entries(req.body)) {
        updateOps[key] = value
    }
    Cert.update({ rollNo: rollNo }, { $set: updateOps })
        .exec()
        .then(successResult => {
            res.status(200).json({
                message: "User Updated successfully"
            })
        })
        .catch(err => {
            res.status(500).json({
                merror: "There has been an error",
                error: err
            })
        })
}
module.exports = { create_cert, get_all_cert, get_cert, delete_cert, update_cert };
