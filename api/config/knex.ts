import * as databaseConfig from '../../knexfile.js'
import Knex = require('knex')
const ENV = process.env.ENV || 'development'

const knex = Knex(databaseConfig[ENV])

export default knex