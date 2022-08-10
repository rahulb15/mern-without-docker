import userModel from '../models/userModel.js';
// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


class userController {

    




    static register(req, res) {
        const { firstName, lastName, contact, password, confirmPassword, commission, priceAmount, userType } = req.body;
        userModel.findOne({ firstName: firstName }, (err, user) => {
            if (err) {
                res.status(500).json({
                    message: 'Error in creating user'
                });
            } else if (user) {
                res.status(400).json({
                    message: 'User already exists'
                });
            } else {
                // const salt = bcrypt.genSaltSync(10);
                // const hash = bcrypt.hashSync(password, salt);
                const newUser = new userModel({
                    key: "USR"+Math.floor(Math.random() * 10000),
                    firstName: firstName,
                    lastName: lastName,
                    contact: contact,
                    password: password,
                    confirmPassword: confirmPassword,
                    commission: commission,
                    priceAmount: priceAmount,
                    userType: userType,
                    createdAt: new Date().toISOString()

                });
                newUser.save((err, user) => {
                    if (err) {
                        res.status(500).json({
                            message: 'Error in creating user'
                        });
                    } else {
                        res.status(200).json({
                            message: 'User created successfully',
                            user: user

                        });
                    }
                }
                );
            }
        });
    }

    //login user by token and return user details and token if user is valid else return error
    static async login(req, res) {
        const { firstName, password } = req.body;
        try {
            const user = await userModel.findOne({ name: firstName });
            if (user) {
                // const isValid = bcrypt.compareSync(password, user.password);
                const isValid = password === user.password;
                if (isValid) {
                    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    user.token = token;
                    user.status = 'online';
                    await user.save();
                    res.status(200).json({
                        message: 'User logged in successfully',
                        user: user                    });
                } else {
                    res.status(401).json({
                        message: 'Invalid credentials'
                    });
                }
            } else {
                res.status(401).json({
                    message: 'Invalid credentials'
                });
            }
        }
        catch (err) {
            res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    }


    //get all users
    static getAll(req, res) {
        userModel.find({}, (err, users) => {
            if (err) {
                res.status(500).json({
                    message: 'Internal Server Error'
                });
            } else {
                res.status(200).json({
                    message: 'Users fetched successfully',
                    users: users
                });
            }
        });
    }

    //user logout by deleting token from database
    static logout(req, res) {
        const {token} = req.headers.authorization;
        userModel.findOne({token: token}, (err, user) => {
            if (err) {
                res.status(500).json({
                    message: 'Internal Server Error'
                });
            } else if (user) {
                user.token = '';
                user.status = 'offline';
                user.save((err, user) => {
                    if (err) {
                        res.status(500).json({
                            message: 'Internal Server Error'
                        });
                    } else {
                        res.status(200).json({
                            message: 'User logged out successfully',
                            user: user
                        });
                    }
                });
            } else {
                res.status(401).json({
                    message: 'Invalid credentials'
                });
            }
        }
        );
    }


    //delete user by id
    static delete(req, res) {
        const { id } = req.params;
        userModel.findByIdAndDelete(id, (err, user) => {
            if (err) {
                res.status(500).json({
                    message: 'Internal Server Error'
                });
            } else if (user) {
                res.status(200).json({
                    message: 'User deleted successfully',
                    user: user
                });
            } else {
                res.status(404).json({
                    message: 'User not found'
                });
            }
        });
    }

    //update user by id
    static update(req, res) {
        const { id } = req.params;
        const { firstName, lastName, contact, password, confirmPassword, commission, priceAmount, userType } = req.body;
        userModel.findByIdAndUpdate(id, {
            firstName: firstName,
            lastName: lastName,
            contact: contact,
            password: password,
            confirmPassword: confirmPassword,
            commission: commission,
            priceAmount: priceAmount,
            userType: userType
        }, { new: true }, (err, user) => {
            if (err) {
                res.status(500).json({
                    message: 'Internal Server Error'
                });
            } else if (user) {
                res.status(200).json({
                    message: 'User updated successfully',
                    user: user
                });
            } else {
                res.status(404).json({
                    message: 'User not found'
                });
            }
        });
    }

    // //delete selectived users
    // static deleteSelected(req, res) {
    //     const { ids } = req.body;
    //     userModel.deleteMany({ _id: { $in: ids } }, (err, users) => {
    //         if (err) {
    //             res.status(500).json({
    //                 message: 'Internal Server Error'
    //             });
    //         } else {
    //             res.status(200).json({
    //                 message: 'Users deleted successfully',
    //                 users: users
    //             });
    //         }
    //     });
    // }




}


export default userController;