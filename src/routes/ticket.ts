import { Router, Request, Response } from 'express'
import axios from 'axios'

const router = Router()
const API_URL = 'https://api.ticketapp.cl'

router.get('/:id', (req: Request, res: Response) => {
  axios.get(`${API_URL}/w/ticket/${req.params.id}`)
    .then(({ data }) => res.json(data))
    .catch((err) => res.status(500).json(err))
})

router.post('/', (req: Request, res: Response) => {
  const { body } = req

  axios.post(`${API_URL}/w/ticket`, body)
    .then(({ data }) => res.json(data))
    .catch((err) => res.status(500).json(err))
})

export default router