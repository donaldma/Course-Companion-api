import * as createError from 'http-errors'
import { Router } from 'express'

const router = Router({ mergeParams: true })

export default router

router.get('/',
  async function (req, res, next) {
    res.send('it works')
  }
)