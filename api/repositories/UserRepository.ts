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
      .insert({
        name: userObject.name,
        image: userObject.image,
        email: userObject.email,
        facebookId: userObject.facebookId,
        gender: userObject.gender,
        location: undefined,
        city: userObject.city,
        province: undefined,
        country: undefined,
        created_at: userObject.createdAt,
        updated_at: userObject.updatedAt
      })
    
    return getByFacebookId(userObject.facebookId)
  },

  update: async function(userId: number, userObject: any) {
    return await knex('user')
      .update(userObject)
      .where({ id: userId })
  }

}
