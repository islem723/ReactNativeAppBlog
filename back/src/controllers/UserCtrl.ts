import { Request, Response } from 'express';
import User from '../models/User';
import IUser from '../types';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRATION, JWT_SECRET } from '../config/env';
import bcrypt from 'bcrypt';

//Register
export async function register(req: Request, res: Response) {
  try {
    const { name, email, password }: IUser = req.body;

    // verifier si user existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "L'utilisateur existe deja." });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      await bcrypt.genSalt(10),
    );
    //creer un nouvel utilisateur avec mot de passe haché
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    if (!newUser) {
      return res.status(400).send({ error: 'Could not create user' });
    }
    res.status(201).send({ message: 'Sign up successful, proceed to login!' });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

//Login

export async function login(req: Request, res: Response) {
  const { email, password }: IUser = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ error: 'invalid email or password!' });
  }
  const checkPawssowrd = await bcrypt.compare(password, user.password);
  if (!checkPawssowrd) {
    return res.status(404).send({ error: 'invalid email or password' });
  }

  const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
  res.status(200).send({ token: token });
}
