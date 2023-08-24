import { Router } from 'express'
import * as cacheService from '@services/cache'
import client from '@config/redis'

const router = Router()

const API_URL = 'https://api.ticketapp.cl/w/'

router.get('/', async (req, res) => {
  try {
    const data = await client.get('foo')
    console.log('data', data)
    return res.json({
      data: 'foo'
    })
  } catch (error) {
    return res.status(400).json({
      error: 'fail_load'
    })
  }
})

router.post('/', async (req, res) => {
  const { data } = req.body

  try {
    const result = await client.set('foo', data)
    return res.json({
      data: result
    })
  } catch (error) {
    return res.status(400).json({
      error: 'fail_load'
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const data = await cacheService.auto({
      url: `${API_URL}${id}`,
      key: `${id}:info`,
      expireTime: 30000
    })
    res.json(
      data
    )
  } catch (error) {
    res.status(404).json({
      error: 'fail_load'
    })
  }
})

router.get('/:id/category', async (req, res) => {
  const id = req.params.id
  const data = await cacheService.auto({
    url: `${API_URL}${id}/category`,
    key: `${id}:category`
  })
  res.json(
    data
  )
})



router.get('/:id/product', async (req, res) => {
  try {
    const id = req.params.id
    let time = 0
    let key = `${id}:products`
    let params

    if(req.query != null && Object.keys(req.query).length > 0) {
      //console.log(req.query)
      const queryToKey = Object.keys(req.query).map(key => `${key}:${req.query[key]}`).join(':')
      //console.log(queryToKey)
      key = `${key}:${queryToKey}`
      time = 20000
      params = Object.keys(req.query).map(key => `${key}=${req.query[key]}`).join('&')
    }
    
    const data = await cacheService.auto({
      url: `${API_URL}${id}/product?${params}`,
      key,
      expireTime: time
    })
    res.json(data)
  } catch (error) {
    res.status(404).json({
      error: 'fail_load'
    })
  }
})

router.get('/:id/product/mostselled', async (req, res) => {
  try {
    const { id } = req.params
    const data = await cacheService.auto({
      url: `${API_URL}${id}/product/mostselled`,
      key: `${id}:products:mostselled`,
      expireTime: 60000 * 60 * 24
    })
    res.json(data)
  } catch (error) {
    res.status(404).json({
      error: 'fail_load_most'
    })
  }
})

router.get('/:id/product/recommended', async (req, res) => {
  try {
    const { id } = req.params
    const data = await cacheService.auto({
      url: `${API_URL}${id}/product/mostselled`,
      key: `${id}:products:mostselled`,
      expireTime: 60000 * 60 * 24
    })
    res.json(data)
  } catch (error) {
    res.status(404).json({
      error: 'fail_load_most'
    })
  }
})

router.get('/:id/product/:pid', async (req, res) => {
  try {
    const { id, pid } = req.params
    const data = await cacheService.auto({
      url: `${API_URL}${id}/product/${pid}`,
      key: `${id}:products:${pid}`,
      expireTime: 60000
    })
    res.json(data)
  } catch (error) {
    res.status(404).json({
      error: 'fail_load'
    })
  }
})

router.get('/:id/page/:pid', async (req, res) => {
  try {
    const { id, pid } = req.params
    const data = await cacheService.auto({
      url: `${API_URL}${id}/page/${pid}`,
      key: `${id}:page:${pid}`
    })
    res.json(data)
  } catch (error) {
    res.status(404).json({
      error: 'fail_load'
    })
  }
})




export default router