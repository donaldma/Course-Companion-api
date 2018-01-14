import * as createError from 'http-errors'
import { Router } from 'express'
import { getIcalFileForUser } from '../repositories/IcalRepository'
import IcalService from '../services/ical/IcalService'

const router = Router({ mergeParams: true })

export default router

router.get('/match/:id',
  async function (req, res, next) {
    let icalFileForUser = await getIcalFileForUser(req.params.id)

    let icalFileForUserJson = IcalService.icalToJson(icalFileForUser)

    res.send(icalFileForUserJson)
  }
)