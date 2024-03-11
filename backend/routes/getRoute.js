import express from 'express'
import {  getBlocks,  getClassMap, getClassrooms, getEvents, getStaff,  getUsers } from '../controllers/getServices.js'


const router= express.Router()

router.post('/getUsers', getUsers)
router.get('/getStaffs', getStaff)
router.get('/getBlocks', getBlocks)
router.get('/getClassrooms', getClassrooms)
router.get('/getEvents', getEvents)
router.post('/getClassMap', getClassMap)



export default router