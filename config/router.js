import express from 'express'
import { loginOrRegister } from '../controllers/auth.js'
import { displayDestination } from '../controllers/destinations.js'
const router = express.Router()

router.route('/')
  .get(displayDestination)
  .post(loginOrRegister)
  // .post(registerUser)

// router.route('/register')
//   .post(registerUser)

export default router