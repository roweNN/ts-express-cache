import express from 'express'
import * as userService from '@services/user'
import { responseError } from '@src/utils'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const users = await userService.findAll()
    return res.json(users)
  }
  catch (err) {
    return responseError(res, err);
  }
})

router.post('/', async (req, res) => {
  try {
    const user = await userService.create(req.body)
    return user ? res.json(user) : res.status(400).json({
      error: 'bad request'
    })
  } catch (err) {
    return responseError(res, err);
  }
})

router.get('/:id', (req, res) => {
  const user = userService.findById(req.params.id)
  return user ? res.send(user) : res.status(404).json({
    error: 'not found'
  })
})

export default router