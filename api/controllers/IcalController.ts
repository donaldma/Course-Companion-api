import * as createError from 'http-errors'
import { Router } from 'express'
import { getIcalFileForUser } from '../repositories/IcalRepository'
import IcalService from '../services/ical/IcalService'
import awsS3Client from '../services/aws/awsS3Client'
import knex from '../config/knex'
import UserRepository from '../repositories/UserRepository'
import * as _ from 'lodash'


const router = Router({ mergeParams: true })

export default router

router.get('/match/:id',
  async function (req, res, next) {
    let icalFileForUser = await getIcalFileForUser(req.params.id)
    if(icalFileForUser) {
      let icalFileForUserJson = await IcalService.icalToJson(icalFileForUser)
      let courses = icalFileForUserJson.VCALENDAR[0].VEVENT
      
      let toSend: any[] = []
      for(let course of courses) {
        await knex('course')
        .insert({
          userId: req.params.id,
          name: course.SUMMARY,
          created_at: new Date(),
          updated_at: new Date()
        })

        let temp = await knex('course')
          .select()
          toSend.push(temp)
        
        console.log(_.groupBy(temp, 'name'))
        
      }
    }
 
    res.send('good')
  }
)

router.get('/upload',
  async function (req, res, next) {
    let signedUrl = await awsS3Client.getSignedUrl(req.query.fileName, req.query.fileType)
    res.send(signedUrl)
  }
)