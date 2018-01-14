import * as passport from 'passport'
import * as FacebookTokenStrategy from 'passport-facebook-token'
import {User} from '../../models/User'
import knex from '../../config/knex'
import RegisterService from '../user/RegisterService'
import authenticationConfiguration from '../../config/authentication'

export const PassportService = passport

passport.use(new FacebookTokenStrategy({
  clientID: authenticationConfiguration.facebook.clientId!,
  clientSecret: authenticationConfiguration.facebook.clientSecret!,
  profileFields: ['id', 'email', 'displayName', 'photos', 'gender', 'location', 'locale', 'timezone']
}, (accessToken: string, refreshToken: string, profile: any, done: Function) => {
  knex.transaction((transaction) => {
    return RegisterService.registerOrLoginFacebook(accessToken, profile, transaction)
  }).then((user: User) => {
    done(null, user)
  }).catch((error) => {
    done(error)
  })
}))