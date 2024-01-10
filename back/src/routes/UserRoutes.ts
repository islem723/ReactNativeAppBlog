import express from 'express';
import { register, login } from '../controllers/UserCtrl';

const userRoutes = express.Router();

userRoutes.route('/create').post(register);
userRoutes.route('/login').post(login);
export default userRoutes;
