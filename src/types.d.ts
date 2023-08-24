import { Document, Types } from 'mongoose';

export interface Auth {
  name: string,
  email?: string,
  password?: string
}

export interface User {
  name: string,
  email: string,
  role: Role
  status: Status,
  permissions: string[]
}

export interface UserDB extends User, Document {
  _id: Types.ObjectId,
  password: string,
  createdAt: Date,
  comparePassword: (password: string) => Promise<boolean>,
  generateToken: () => Promise<string>
}

export interface Product {
  name: string;
  description?: string;
  price: number;
  inStock?: number;
  quantity: number;
}

export interface ProductDB extends Product, Document {
  _id: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface Request {
  type: string;
  products: Product[]
}

export interface RequestDB extends Request, Document {
  _id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: Auth;
}