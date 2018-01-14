import s3Client from '../services/aws/awsS3Client'
import { IcalFile } from '../models/IcalFile'
import * as createError from 'http-errors'

export async function getIcalFileForUser(userId: number): Promise<IcalFile[]> {
  let icalFiles = await s3Client.getFolderContents('ical/', false, '.ics')
  return icalFiles.map(file => {
    if(userId.toString() === file.fileName.slice(0, -4)) {
      return file.content
    } else {
      throw createError(404, 'No icals found for this user.')
    }
  })
}