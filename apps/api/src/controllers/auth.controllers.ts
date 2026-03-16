import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PlatformUser } from "@enterprise-commerce/core/platform/types"
import { createUser } from "../models/User"

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
  const { email, password } = req.body;

  if (typeof email !== "string" || typeof password !== "string") {
    res.status(400).json({ message: "email and password must be strings" });
    return;
  }

  const newUser: PlatformUser = {
    id: null,
    email,
    password,
  }
  const user = await createUser(newUser);
  res.status(201).json({
  id: user.id,
  email: user.email
});;
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
  
};