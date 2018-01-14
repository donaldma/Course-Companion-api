import s3Client from '../services/aws/awsS3Client'
import { IcalFile } from '../models/IcalFile'
import * as createError from 'http-errors'

export async function getIcalFileForUser(userId: number): Promise<any[]> {
  let icalFiles = await s3Client.getFolderContents('ical/', false, '.ics')
  let files: any[] = []
  for(let file of icalFiles) {
    if(file.fileName.slice(0, -4) === userId.toString()) {
      files.push(file.content)
    }
  }
  return files
}