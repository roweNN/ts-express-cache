import { NextFunction, Request, Response } from 'express';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

export default (req: Request, res: Response, next: NextFunction) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  const strategy = new JwtStrategy(opts, (payload, done) => {
    req.user = payload;
    done(null, {});
  });

  strategy.success = () => {
    next();
  };

  strategy.fail = (error) => {
    if(error instanceof Error) {
      return res.status(401).json({
        error: error.message
      });
    }
    return res.status(403).json({
      error: ':('
    });
  }

  strategy.error = (err) => {
    res.status(500).json({
      error: err,
    });
  };

  strategy.authenticate(req, res);
}