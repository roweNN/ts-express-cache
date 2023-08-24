import { Request, RequestDB } from "@src/types"
import requestModel from "@models/request"

export const findAll = async (): Promise<RequestDB[]> => {
  return await requestModel.find()
}

export const create = async (request: Request): Promise<RequestDB> => {
  return await requestModel.create(request)
}