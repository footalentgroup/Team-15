import { IAuth } from "@/interfaces/IAuth.interfaces";
import { Content } from "@/interfaces/ICourses.interface";

export const dummyUser: IAuth = {
  refresh_token: "123123",
  access_token: "123123",
  user: {
    id: 1,
    username: "ProfesorTest",
    first_name: "Profesor",
    last_name: "Test",
    email: "profesor@email.com",
    role: "user"
  }
};

export const dummyStudents = [
  {
    id: 1,
    curso_id: 1,
    nombre: "juan",
    apellido: "gonzález"
  },
  {
    id: 2,
    curso_id: 1,
    nombre: "martín",
    apellido: "rodríguez"
  },
  {
    id: 3,
    curso_id: 1,
    nombre: "carlos",
    apellido: "gómez"
  },
  {
    id: 4,
    curso_id: 1,
    nombre: "josé",
    apellido: "fernández"
  },
  {
    id: 5,
    curso_id: 1,
    nombre: "luis",
    apellido: "lópez"
  },
  {
    id: 6,
    curso_id: 1,
    nombre: "miguel",
    apellido: "martínez"
  },
  {
    id: 7,
    curso_id: 1,
    nombre: "jorge",
    apellido: "díaz"
  },
  {
    id: 8,
    curso_id: 1,
    nombre: "pedro",
    apellido: "pérez"
  },
  {
    id: 9,
    curso_id: 1,
    nombre: "ricardo",
    apellido: "garcía"
  },
  {
    id: 10,
    curso_id: 1,
    nombre: "fernando",
    apellido: "sánchez"
  },
  {
    id: 11,
    curso_id: 1,
    nombre: "juan",
    apellido: "gonzález"
  },
  {
    id: 12,
    curso_id: 1,
    nombre: "martín",
    apellido: "rodríguez"
  },
  {
    id: 13,
    curso_id: 1,
    nombre: "carlos",
    apellido: "gómez"
  },
  {
    id: 14,
    curso_id: 1,
    nombre: "josé",
    apellido: "fernández"
  },
  {
    id: 15,
    curso_id: 1,
    nombre: "luis",
    apellido: "lópez"
  },
  {
    id: 16,
    curso_id: 1,
    nombre: "miguel",
    apellido: "martínez"
  },
  {
    id: 17,
    curso_id: 1,
    nombre: "jorge",
    apellido: "díaz"
  },
  {
    id: 18,
    curso_id: 1,
    nombre: "pedro",
    apellido: "pérez"
  },
  {
    id: 19,
    curso_id: 1,
    nombre: "ricardo",
    apellido: "garcía"
  },
  {
    id: 20,
    curso_id: 1,
    nombre: "fernando",
    apellido: "sánchez"
  }
];

export const dummyPlanification: Content[] = [
  {
    unidad: 1,
    tema: "La Revolución Francesa",
    subtemas: [
      "Desigualdades sociales",
      "Crisis económica",
      "Ideas de la Ilustración",
      "Asamblea Nacional",
      "Toma de la Bastilla",
      "Reinado del Terror",
      "Fin del feudalismo",
      "Declaración de los Derechos del Hombre",
      "Ascenso de Napoleón"
    ],
    quantity: 0
  },
  {
    unidad: 2,
    tema: "La Guerra Fría",
    subtemas: [
      "Fin de la Segunda Guerra Mundial",
      "Tensiones entre EE.UU. y la URSS",
      "Guerra de Corea",
      "Crisis de los Misiles en Cuba",
      "Guerra de Vietnam",
      "Caída del Muro de Berlín",
      "Disolución de la URSS",
      "Fin del bloque comunista"
    ],
    quantity: 0
  },
];
