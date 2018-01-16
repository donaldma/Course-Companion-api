import knex from '../../config/knex'
import { IcalFile } from '../../models/IcalFile'
const ical2json = require('ical2json')
import * as _ from 'lodash'
import * as createError from 'http-errors'

export default {

  icalToJson: function (icalFile: IcalFile[]) {
    return ical2json.convert(icalFile[0])
  },

  addCourseToDb: async function(courseToAdd: string[], userId: number) {
    try {
      await knex('course')
      .insert({
        userId: userId,
        name: courseToAdd
      })
    } catch(err) {
      console.log(err.detail)
    }
  },

}
