import express from 'express'
import { addusers,  addStaff, addClassroom, addEvents, addDepartment } from '../controllers/addServices.js'


const router= express.Router()


router.post('/addusers', addusers)
router.post('/addStaff', addStaff)
router.post('/addClassroom', addClassroom)
router.post('/addDepartment', addDepartment)
router.post('/addEvent', addEvents)


export default router

