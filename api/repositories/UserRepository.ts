import * as Knex from 'knex'
import * as bcrypt from 'bcrypt'
import knex from '../config/knex'

async function getByFacebookId(facebookId: number) {
  return await knex('user')
  .select()
  .where('facebookId', facebookId)
}

export default {

  findByEmail: async function(email: string) {
    return await knex('user')
      .select()
      .where('email', email)
  },

  create: async function(userObject: any) {
    await knex('user')
      .insert(userObject)
    
    return getByFacebookId(userObject.facebookId)
  },

  update: async function(userId: number, userObject: any) {
    await knex('user')
      .update(userObject)
      .where({ id: userId })

    return getByFacebookId(userObject.facebookId)
  }

}
