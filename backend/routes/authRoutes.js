import express from 'express'
import { Adminlogin,   StaffLogin,   login } from '../controllers/auth.js'


const router= express.Router()


router.post('/Login', login)
router.post('/StaffLogin', StaffLogin)
router.post('/AdminLogin', Adminlogin)


export default router
