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

router.get('/courses/:id',
  async function (req, res, next) {
    let icalFileForUser = await getIcalFileForUser(req.params.id)
    let icalFileForUserJson = await IcalService.icalToJson(icalFileForUser)
    let courses = icalFileForUserJson.VCALENDAR[0].VEVENT
    
    let coursesArr: any[] = []
    for(let course of courses) {
      coursesArr.push(course.SUMMARY)
    }

    for(let course of _.uniq(coursesArr)) {
      await IcalService.addCourseToDb(course, req.params.id)
    }

    let allCoursesForUser = await knex('course')
      .select()

    let fullSend: any[] = []
    let groupedByCourseName = _.groupBy(allCoursesForUser, 'name')
    for(let course in groupedByCourseName) {
      let objToSend = {
        courseName: course,
        studentData: groupedByCourseName[course]
      }
      fullSend.push(objToSend)
    }
 
    res.send(fullSend)
  }
)

router.get('/upload',
  async function (req, res, next) {
    let signedUrl = await awsS3Client.getSignedUrl(req.query.fileName, req.query.fileType)
    res.send(signedUrl)
  }
)