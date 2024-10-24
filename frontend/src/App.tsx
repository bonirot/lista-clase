import "./App.css";
import React, { useEffect, useState } from "react";
import { IAlumno } from "./interfaces/alumno.interface";

function App() {
  const [alumnos, setAlumnos] = useState<IAlumno[]>([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState("");

  const fetchAlumnos = async () => {
    try {
      const response = await fetch("http://localhost:4000/alumnos");
      const data = await response.json();
      setAlumnos(data);
    } catch (error) {
      console.error("Error fetching alumnos:", error);
    }
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  const validEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const addAlumno = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!nombre.trim()) {
      setError("El nombre no puede estar vacío.");
      return;
    }
    if (!email.trim() || !validEmail(email)) {
      setError("Por favor ingresa un email válido.");
      return;
    }
    if (!telefono.trim()) {
      setError("El teléfono no puede estar vacío.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/alumnos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, email, telefono }),
      });

      if (response.ok) {
        setNombre("");
        setEmail("");
        setTelefono("");
        fetchAlumnos();
      } else {
        alert("Error al agregar el alumno");
      }
    } catch (error) {
      console.error("Error agregando alumno:", error);
    }
  };

  return (
    <div>
      <h1>Crear Alumno</h1>
      <form className="form" onSubmit={addAlumno}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          required
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Teléfono"
          required
        />
        <button type="submit">Agregar</button>
      </form>

      <h2>Lista de Alumnos</h2>
      <ul>
        {alumnos.map((alum) => (
          <li key={alum.id}>
            {alum.nombre} - {alum.email} - {alum.telefono}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
