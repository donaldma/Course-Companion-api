import * as bcrypt from 'bcrypt'
import * as createError from 'http-errors'
import * as Knex from 'knex'
import UserRepository from '../../repositories/UserRepository'

export default {

  registerOrLoginFacebook: async function (facebookId: string, profile: any) {
    const emailArray: Array<{ value: string }> = profile.emails
    if (emailArray.length === 0) {
      throw createError(400, 'You have no emails associated with your Facebook account.')
    }
    const email = profile.emails[0].value
    if (!email || email === '') {
      throw createError(400, 'Sorry, we can’t process your Facebook signup for now. Please signup using an email address.')
    }

    // Reference: https://developers.facebook.com/docs/messenger-platform/user-profile
    // Reference: https://developers.facebook.com/docs/graph-api/reference/user
    const name = profile.displayName
    let image: string | undefined = undefined
    const facebookPhotos: Array<{ value: string }> = profile.photos
    if (facebookPhotos.length > 0) {
      image = `${facebookPhotos[0].value}&height=500`
    }

    const _json = profile._json

    const city: string | undefined = _json.location ? _json.location.name : undefined
    const facebookGender: 'male' | 'female' | string = _json.gender
    let gender: string | undefined
    if (facebookGender === 'male') {
      gender = 'm'
    } else if (facebookGender === 'female') {
      gender = 'f'
    }

    const rawFacebookProfileString: string = profile['_raw']

    const existingUser = await UserRepository.findByEmail(email)

    if (existingUser) {
      const updateObject: any = {
        emailVerified: true,
        facebookId: facebookId
      }
      if (!existingUser.city && city) {
        updateObject.city = city
      }
      if (!existingUser.gender && gender) {
        updateObject.gender = gender
      }
      updateObject.facebookMetadata = rawFacebookProfileString
      const user = await UserRepository.update(existingUser.id, updateObject)
      return user

    } else {
      const createObject = {
        email: email,
        emailVerified: true,
        name: name,
        image: image,
        city: city,
        gender: gender,
        facebookId: facebookId,
        facebookMetadata: rawFacebookProfileString,
        createdAt: new Date()
      }
      const user = await UserRepository.create(createObject)

      return user
    }
  }

}
