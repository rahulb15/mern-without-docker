import express from 'express';
const userRouter = express.Router();
import userController from '../controllers/userController.js';


userRouter.post('/create', userController.register);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);
// userRouter.post('/changePassword', userController.changePassword);
// userRouter.post('/forgotPassword', userController.forgotPassword);
// userRouter.post('/resetPassword', userController.resetPassword);
userRouter.delete('/delete/:id', userController.delete);
// userRouter.delete('/deleteselected', userController.deleteSelected);
userRouter.get('/getAllUsers', userController.getAll);


export default userRouter;