import { Router } from 'express';
import * as requestService from '@services/request';
import { z } from 'zod';
import { responseError } from '@src/utils';
import { Request } from '@src/types';

const router = Router();

router.get('/', async (req, res) => {
  const requests = await requestService.findAll();
  return res.send(requests);
})

router.post('/', async (req, res) => {
  const schema = z.object({
    products: z.array(z.object({
      //_id: z.string(),
      quantity: z.number(),
      name: z.string(),
      price: z.number(),
    })),
    type: z.string()
  });

  try {
    const request: Request = await schema.parseAsync(req.body);
    const newRequest = await requestService.create(request);
    return res.send(newRequest);
  } catch (err) {
    return responseError(res, err);
  }
})


export default router;