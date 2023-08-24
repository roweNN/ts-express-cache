import {Router, Request, Response} from 'express';
import {z} from 'zod';
import * as userService from '@services/user';
import { responseError } from '@src/utils';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(4),
  });

  try {
    const isValid = schema.safeParse(req.body);
    if (!isValid.success) {
      throw new Error('invalid data');
    }
    const user = await userService.findByEmail(req.body.email);
    if (!user) {
      throw new Error('User not found');
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }
    const token = await user.generateToken();
    return res.status(200).send({
      token,
    });
  } catch (err) {
    console.log(err)
    return responseError(res, err);
  }
});

// router.post('/register', (req: Request, res: Response) => {
//   // ...
// });

export default router;