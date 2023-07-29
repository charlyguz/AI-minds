import React, { useState, useEffect } from "react";
import index from "./index.css";
import teacher from './assets/teacher.png';


export default function App() {
  useEffect(() => {
    fetch('http://localhost:5000/api')
      .then(response => response.json())
      .then(data => console.log(data));
  }, []);
  return (
    <div className="">
      <img src="https://img.freepik.com/vector-gratis/interior-aula-escuela-universidad-concepto-educativo-pizarra-tabla_1441-1694.jpg?w=1480&t=st=1690667104~exp=1690667704~hmac=ee01a1dd45a569f0fdae751ae561ba032ade82af1a22743a54c0a3310d65b22c" alt="Fondo" className="absolute w-full h-full object-cover" />
      
      <img src={teacher} alt="Personaje" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3 w-1/2 md:w-1/3" />



      <div className="absolute bottom-0 left-0 w-full h-2/4 bg-black bg-opacity-50 p-4 rounded-t">
        <h1 className="text-6xl font-bold mb-4 text-black text-center">Hello I'am your teacher</h1>
        <textarea className="w-full p-2 mb-4 h-40" readOnly value="Aqui va la respuesta de gpt en los 2 idiomas en el idioma natal y el que quiere aprender" />
        <input type="text" className="w-full p-2" placeholder="Introduce tu texto aquí" />
      </div>
    </div>
  );
}

