import express from 'express'
import { updateUser } from '../controllers/editServices.js'
import { updateStaff, updateUserStatus } from '../controllers/update.js'

const router= express.Router()

router.put('/UpdateUser',updateUser)
router.put('/UpdateStaff/:id',updateStaff)
router.put('/UpdateStatus/:id',updateUserStatus)

export default router