require('dotenv').config()

import { Sequelize } from 'sequelize'
import configs from '../config/database'

const env = process.env.NODE_ENV || 'development'
const config = (configs)[env]

const db = new Sequelize({
  ...config,
})

export default db