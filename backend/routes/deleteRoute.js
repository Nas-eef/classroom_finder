import express from "express";
import {    deleteBlock, deleteClassroom, deleteStaff,  deleteUser } from "../controllers/deleteServices.js";

const router=express.Router();

router.delete('/deleteUser/:id', deleteUser)
router.delete('/deleteStaff/:id', deleteStaff)
router.delete('/deleteBlock/:id', deleteBlock)
router.delete('/deleteClassroom/:id', deleteClassroom)

export default router