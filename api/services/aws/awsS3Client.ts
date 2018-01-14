import AWS = require('aws-sdk')
import credentials from '../../config/authentication'

// make this secure eventually
let awsS3 = new AWS.S3(credentials.aws);

const bucketName = 'nwhacks2018'

export class S3Client {

  async getFolderContents(folderPath: string, isJson: boolean, fileExtension: string = ''): Promise<S3File[]> {
    let listPromise = awsS3.listObjects({ Bucket: bucketName, Delimiter: '/', Prefix: folderPath }).promise()
    let folderContents = await listPromise

    if (!folderContents || !folderContents.Contents) {
      return []
    }
    
    let contentPromises = folderContents.Contents.
      filter(x => x.Key!.endsWith(fileExtension))
      .map(async x => {
        return {
          Key: x.Key,
          Content: (await awsS3.getObject({ Bucket: bucketName, Key: x.Key! }).promise())
        }
      })

    let results = await Promise.all(contentPromises)

    let resultBodyContents: S3File[] = []
    for (let result of results) {
      resultBodyContents.push({
        fileName: result.Key!.substring(folderPath.length),
        content: isJson ? JSON.parse((result.Content.Body as Buffer).toString('utf-8')) : (result.Content.Body as Buffer).toString('utf-8')
      })
    }
    return resultBodyContents
  }
}

interface S3File {
  fileName: string
  content: any
}

let s3client = new S3Client()

export default s3client
