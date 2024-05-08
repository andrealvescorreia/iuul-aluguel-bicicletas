import 'dotenv/config'

import { Sequelize } from 'sequelize'
import configs from '../config/database.js'

const env = process.env.NODE_ENV || 'development'
const config = (configs)[env]

export const db = new Sequelize({
  ...config,
})