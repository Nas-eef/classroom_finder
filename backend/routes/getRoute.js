import express from 'express'
import {  getBlocks,  getClassMap, getClassrooms, getDepartmentMap, getDepartments, getEvents, getStaff,  getUsers } from '../controllers/getServices.js'


const router= express.Router()

router.post('/getUsers', getUsers)
router.get('/getStaffs', getStaff)
router.get('/getBlocks', getBlocks)
router.get('/getClassrooms', getClassrooms)
router.get('/getEvents', getEvents)
router.get('/getDepartments', getDepartments)
router.post('/getClassMap', getClassMap)
router.post('/getDepartmentMap', getDepartmentMap)



export default router