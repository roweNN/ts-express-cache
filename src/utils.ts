import { Response } from 'express'
export const isDate = (date: string): boolean => Boolean(Date.parse(date))

export const isString = (text: unknown): text is string => {
  // 'text' != new String('text')
  return typeof text === 'string' || text instanceof String
}

export const responseError = (res: Response, error: unknown) => {
  if (error instanceof Error) {
    return res.status(400).json({
      error: error.message
    })
  }
  return res.status(400).json({
    error: 'bad request'
  })
}