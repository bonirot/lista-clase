import { Request, Response } from "express";
import * as Alumno from "../models/alumno";

export const getAllAlumnos = (req: Request, res: Response) => {
  Alumno.getAllAlumno((err, alumnos) => {
    if (err) throw err;
    res.json(alumnos);
  });
};

export const getAlumnoById = (req: Request, res: Response) => {
  Alumno.getAlumnoById(parseInt(req.params.id), (err, alumno) => {
    if (err) throw err;
    res.json(alumno);
  });
};

export const createAlumno = (req: Request, res: Response) => {
  const newAlumno: Alumno.Alumno = {
    nombre: req.body.nombre,
    email: req.body.email,
    telefono: req.body.telefono,
  };

  Alumno.createAlumno(newAlumno, (err, result) => {
    if (err) throw err;
    res.json({ message: "Alumno created successfully" });
  });
};
