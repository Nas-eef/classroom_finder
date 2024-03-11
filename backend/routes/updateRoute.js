import express from 'express'
import { updateUser } from '../controllers/editServices.js'

const router= express.Router()

router.put('/UpdateUser',updateUser)

export default router