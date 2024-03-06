import express from "express";
import { getAllExistingRole, createNewRoles, deleteRole } from "../../../controller/roleController/rolesController";

const router = express.Router();

router.get('/getAllRoles', getAllExistingRole)
router.post('/createRoles', createNewRoles)
router.delete('/deleteRoles/', deleteRole)


export default router;