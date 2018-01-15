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
      
      let coursesArr: any[] = []
      for(let course of courses) {
        coursesArr.push(course.SUMMARY)
      }

      let uniqueCourses = _.uniq(coursesArr)
      for(let course of uniqueCourses) {
        await knex('course')
        .insert({
          userId: req.params.id,
          name: course,
          created_at: new Date(),
          updated_at: new Date()
        })
      }

        let allCoursesForUser = await knex('course')
          .select()

        let groupedByCourseName = _.groupBy(allCoursesForUser, 'name')
        console.log(groupedByCourseName)
        
        for(let course in groupedByCourseName) {
          console.log(groupedByCourseName[course])
        }
    }
 
    res.send('ok')
  }
)

router.get('/upload',
  async function (req, res, next) {
    let signedUrl = await awsS3Client.getSignedUrl(req.query.fileName, req.query.fileType)
    res.send(signedUrl)
  }
)