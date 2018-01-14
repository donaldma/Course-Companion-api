import { IcalFile } from '../../models/IcalFile'
const ical2json = require('ical2json')

export default {

  icalToJson: function (icalFile: IcalFile[]) {
    return ical2json.convert(icalFile[0])
  }

}
