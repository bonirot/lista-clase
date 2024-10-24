import db from "../config/database";

export interface Alumno {
  id?: number;
  nombre: string;
  email: string;
  telefono: string;
}

export const getAllAlumno = (callback: (err: any, results: any) => void) => {
  db.query("SELECT * FROM alumnos", callback);
};

export const getAlumnoById = (
  id: number,
  callback: (err: any, results: any) => void
) => {
  db.query("SELECT * FROM alumnos WHERE id = ?", [id], callback);
};

export const createAlumno = (
  newAlumno: Alumno,
  callback: (err: any, results: any) => void
) => {
  db.query("INSERT INTO alumnos SET ?", newAlumno, callback);
};
