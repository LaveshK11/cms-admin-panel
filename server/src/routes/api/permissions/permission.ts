import express from "express";
import { createNewPermission, getAllExistingPermissions } from "../../../controller/permissionController/permissionController";


const router = express.Router();

router.get('/getAllPermission', getAllExistingPermissions)

router.post('/createPermission', createNewPermission)


export default router;