import * as Knex from 'knex'
import * as bcrypt from 'bcrypt'
import knex from '../config/knex'

export default {

  findByEmail: async function(email: string) {
    return await knex('user')
      .select()
      .where('email', email)
  },

  create: async function(userObject: any) {
    return await knex('user')
      .insert(userObject)
  },

  update: async function(userId: number, userObject: any) {
    return await knex('user')
      .update(userObject)
      .where({ id: userId })
  }

}
