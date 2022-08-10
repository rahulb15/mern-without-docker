import adminModel from '../models/adminModel.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";




class AdminControllerByToken{

  
    //Create admin by token
    static createAdmin(req, res){
        const {name, password, contact, share, myShare, commission, priceAmount, userType} = req.body;
        adminModel.findOne({name: name}, (err, admins) => {
            if(err){
                res.status(500).json({
                    message: "Error in creating admin",
                    error: err
                });
            }else if(admins){
                res.status(409).json({
                    message: "Admin already exists"
                });
            }else{
                const salt = bcrypt.genSaltSync(10);
                const hashPassword = bcrypt.hashSync(password, salt);
                const newAdmin = new adminModel({
                    key: "ADM"+Math.floor(Math.random() * 10000),
                    name: name,
                    password: password,
                    contact: contact,
                    share: share,
                    myShare: 100,
                    commission: commission,
                    priceAmount: priceAmount,
                    status: "Created",
                    userType: userType,
                    createdAt: new Date().toISOString()
                });
                newAdmin.save((err, admins) => {
                    if(err){
                        res.status(500).json({
                            message: "Error in creating admin",
                            error: err
                        });
                    }else{
                        res.status(201).json({
                            message: "Admin created successfully",
                            admins: admins
                        });
                    }
                });
            }
        });
    }

    //Get admin by token
    static getAdminByToken(req, res){
        const token = req.headers.authorization.split(" ")[1];
        adminModel.findOne({token: token}, (err, admins) => {
            if(err){
                res.status(500).json({
                    message: "Error in getting admin",
                    error: err
                });
            }else if(!admins){
                res.status(404).json({
                    message: "Admin not found"
                });
            }else{
                res.status(200).json({
                    message: "Admin found",
                    admins: admins
                });
            }
        });
    }

    //Update admin by token
    static updateAdminByToken(req, res){
        const token = req.headers.authorization.split(" ")[1];
        // const {name, contact, share, myShare, commission, priceAmount, status, userType} = req.body;
        const {status} = req.body;
        adminModel.findOne({token: token}, (err, admins) => {
            if(err){
                res.status(500).json({
                    message: "Error in updating admin",
                    error: err
                });
            }else if(!admins){
                res.status(404).json({
                    message: "Admin not found"
                });
            }else{
                // admins.name = name;
                // admins.contact = contact;
                // admins.share = share;
                // admins.myShare = myShare;
                // admins.commission = commission;
                // admins.priceAmount = priceAmount;
                admins.status = status;
                // admins.userType = userType;
                admins.save((err, admins) => {
                    if(err){
                        res.status(500).json({
                            message: "Error in updating admin",
                            error: err
                        });
                    }else{
                        res.status(200).json({
                            message: "Admin updated successfully",
                            admins: admins
                        });
                    }
                });
            }
        });
    }

    

    //Delete multiple admins by id
    static deleteMultipleAdminsById(req, res){
        const {ids} = req.body;
        adminModel.deleteMany({_id: {$in: ids}}, (err, admins) => {
            if(err){
                res.status(500).json({
                    message: "Error in deleting admins",
                    error: err
                });
            }else{
                res.status(200).json({
                    message: "Admins deleted successfully",
                    admins: admins
                });
            }
        });
    }

    // Delete admin by id
    static deleteAdminById(req, res){
        const {id} = req.params;
        adminModel.findByIdAndDelete(id, (err, admins) => {
            if(err){
                res.status(500).json({
                    message: "Error in deleting admin",
                    error: err
                });
            }else{
                res.status(200).json({
                    message: "Admin deleted successfully",
                    admins: admins
                });
            }
        });
    }




    //Login admin by token async await method 
    static async loginAdminByToken(req, res){
        const {name, password} = req.body;
        try{
            const admin = await adminModel.findOne({name: name});
            if(!admin){
                res.status(404).json({
                    message: "Admin not found"
                });
            }else{
                // const isMatch = await bcrypt.compare(password, admin.password);
                const isMatch = password === admin.password;
                if(!isMatch){
                    res.status(401).json({
                        message: "Password is incorrect"
                    });
                }else{
                    const token = jwt.sign({id: admin._id}, process.env.JWT_SECRET, {expiresIn: "1d"});
                    admin.token = token;
                    admin.status = "Logged In";
                    await admin.save();
                    res.status(200).json({
                        message: "Admin logged in successfully",
                        token: token,
                        userType: admin.userType,
                        name: admin.name,
                    });
                }
            }
        }catch(err){
            res.status(500).json({
                message: "Error in logging in admin",
                error: err
            });
        }
    }


                   
    //Logout admin by token
    static logoutAdminByToken(req, res){
        const token = req.headers.authorization;
        adminModel.findOne({token: token}, (err, admins) => {
            if(err){
                res.status(500).json({
                    message: "Error in logging out admin",
                    error: err
                });
            }else if(!admins){
                res.status(404).json({
                    message: "Admin not found"
                });
            }else{
                adminModel.findOneAndUpdate({token: token}, {token: "", status: "Logged Out"}, (err, admins) => {
                    if(err){
                        res.status(500).json({
                            message: "Error in logging out admin",
                            error: err
                        });
                    }else{
                        res.status(200).json({
                            message: "Admin logged out successfully",
                            admins: admins
                        });
                    }
                });
            }
        });
    }


    //Get all admins
    static getAllAdmins(req, res){
        adminModel.find({}, (err, admins) => {
            if(err){
                res.status(500).json({
                    message: "Error in getting admins",
                    error: err
                });
            }else if(!admins){
                res.status(404).json({
                    message: "Admins not found"
                });
            }else{
                res.status(200).json({
                    message: "Admins found",
                    admins: admins
                });
            }
        });
    }

 

 //Change admin password by token
    static changeAdminPasswordByToken(req, res){
        const token = req.headers.authorization.split(" ")[1];
        const {oldPassword, newPassword} = req.body;
        adminModel.findOne({token: token}, (err, admins) => {
            if(err){
                res.status(500).json({
                    message: "Error in changing admin password",
                    error: err
                });
            }else if(!admins){
                res.status(404).json({
                    message: "Admin not found"
                });
            }else{
                const isPasswordValid = bcrypt.compareSync(oldPassword, admins.password);
                if(!isPasswordValid){
                    res.status(401).json({
                        message: "Invalid password"
                    });
                }else{
                    admins.password = bcrypt.hashSync(newPassword, 10);
                    admins.save((err, admins) => {
                        if(err){
                            res.status(500).json({
                                message: "Error in changing admin password",
                                error: err
                            });
                        }else{
                            res.status(200).json({
                                message: "Admin password changed successfully",
                                admins: admins
                            });
                        }
                    });
                }
            }
        });
    }

    //Forget admin password by token
    static forgetAdminPasswordByToken(req, res){
        const token = req.headers.authorization.split(" ")[1];
        const {newPassword} = req.body;
        adminModel.findOne({token: token}, (err, admins) => {
            if(err){
                res.status(500).json({
                    message: "Error in forgetting admin password",
                    error: err
                });
            }else if(!admins){
                res.status(404).json({
                    message: "Admin not found"
                });
            }else{
                admins.password = bcrypt.hashSync(newPassword, 10);
                admins.save((err, admins) => {
                    if(err){
                        res.status(500).json({
                            message: "Error in forgetting admin password",
                            error: err
                        });
                    }else{
                        res.status(200).json({
                            message: "Admin password changed successfully",
                            admins: admins
                        });hariom
                    }
                });
            }
        });
    }

    //Reset admin password by token

    static resetAdminPasswordByToken(req, res){
        const token = req.headers.authorization;
        const {newPassword} = req.body;
        adminModel.findOne({token: token}, (err, admins) => {
            if(err){
                res.status(500).json({
                    message: "Error in resetting admin password",
                    error: err
                });
            }else if(!admins){
                res.status(404).json({
                    message: "Admin not found"
                });
            }else{
                admins.password = bcrypt.hashSync(newPassword, 10);
                admins.save((err, admins) => {
                    if(err){
                        res.status(500).json({
                            message: "Error in resetting admin password",
                            error: err
                        });
                    }else{
                        res.status(200).json({
                            message: "Admin password changed successfully",
                            admins: admins
                        });
                    }
                });
            }
        });
    }


}


export default AdminControllerByToken;