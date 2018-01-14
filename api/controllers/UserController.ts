import * as createError from 'http-errors'
import { Router } from 'express'
import { PassportService } from '../services/permission/PassportService'
import { User } from '../models/User'

const router = Router({ mergeParams: true })

export default router

router.post('/login/facebook',
  function (req, res, next) {
    PassportService.authenticate('facebook-token', function (error: any, user: User, info: any) {
      facebookLoginRequestHandler(res, error, user, info)
    })(req, res, next)
  }
)

const facebookLoginRequestHandler = async function (res: any, error: any, user: User, info: any) {
  if (error) {
    res.status(400).send(error)
  } else if (!user) {
    res.status(400).send({ message: 'We could not connect with your facebook account' })
  } else {
    try {
      res.send({
        user: user
      })
    } catch (caughtError) {
      res.send(caughtError)
    }
  }
}