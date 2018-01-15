import knex from '../../config/knex'
import { IcalFile } from '../../models/IcalFile'
const ical2json = require('ical2json')
import * as _ from 'lodash'

export default {

  icalToJson: function (icalFile: IcalFile[]) {
    return ical2json.convert(icalFile[0])
  },

  addCoursesToDb: async function(uniqueCourses: string[], userId: number) {
    let allCoursesForUser = await knex('course')
      .select()
      .where({ userId: userId })
    
    let coursesArr: any[] = []
    for(let course of allCoursesForUser) {
      for(let uniqueCourse of uniqueCourses) {
        console.log('1',course.name)
        console.log('2',uniqueCourse)
        if(course.name === uniqueCourse) {
          console.log('nothing to add')
          continue 
        } else {
          await knex('course')
          .insert({
            userId: userId,
            name: uniqueCourse
          })
        }
      }
    }
  },

}
