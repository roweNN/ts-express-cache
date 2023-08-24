import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserDB } from '@src/types';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema<UserDB>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  permissions: [String],
});

UserSchema.pre('save', async function (next) {
  const user = this as UserDB;
  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
})

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
}

UserSchema.methods.generateToken = async function (): Promise<string> {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: 3600,
  });
}

export default model<UserDB>('User', UserSchema);