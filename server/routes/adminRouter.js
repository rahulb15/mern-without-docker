import express from 'express';
const adminRouter = express.Router();
import AdminController from '../controllers/adminController.js';




adminRouter.post('/create', AdminController.createAdmin);
adminRouter.get('/getAdmin', AdminController.getAdminByToken);
adminRouter.get('/getAllAdmins', AdminController.getAllAdmins);
adminRouter.put('/update', AdminController.updateAdminByToken);
adminRouter.post('/login', AdminController.loginAdminByToken);
adminRouter.post('/logout', AdminController.logoutAdminByToken);
adminRouter.post('/changePassword', AdminController.changeAdminPasswordByToken);
adminRouter.post('/forgotPassword', AdminController.forgetAdminPasswordByToken);
adminRouter.post('/resetPassword', AdminController.resetAdminPasswordByToken);
adminRouter.delete('/delete/:id', AdminController.deleteAdminById);
adminRouter.delete('/deleteselected', AdminController.deleteMultipleAdminsById);


export default adminRouter;