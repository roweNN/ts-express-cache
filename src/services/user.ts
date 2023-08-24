import { UserDB, Auth } from '@src/types'
import userModel from '@models/user'

export const findAll = async (): Promise<unknown> => {
  const users = await userModel.find()
  return users
}

export const findById = (id: string): Promise<any> => {
  const user = userModel.findById(id)
  return user
}

export const findByEmail = (email: string): Promise<any> => {
  const user = userModel.findOne({ email })
  return user
}

export const create = async (user: Auth): Promise<UserDB> => {
  const existingUser = await userModel.findOne<UserDB>({ email: user.email })
  if (existingUser) {
    throw new Error('User already exists')
  }
  const newUser = new userModel(user)
  return await newUser.save()
}
