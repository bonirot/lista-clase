import { Router } from "express";
import * as alumnoController from "../controllers/alumno.controller";

const router: Router = Router();

router.get("/", alumnoController.getAllAlumnos);
router.get("/:id", alumnoController.getAlumnoById);
router.post("/", alumnoController.createAlumno);

export default router;
