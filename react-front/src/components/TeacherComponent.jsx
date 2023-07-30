import React, { useState } from "react";
import teacher from '../assets/teacher.png';
import '../index.css';

export default function TeacherComponent({ userData }) {
  const [recording, setRecording] = React.useState(null);
  const [isRecording, setIsRecording] = React.useState(false);
  const [responseText, setResponseText] = React.useState('');

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setIsRecording(true);

      const audioChunks = [];
      mediaRecorder.addEventListener('dataavailable', event => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks);
        sendAudioToServer(audioBlob);
        setRecording(audioBlob);
      });

      setRecording(mediaRecorder);
    });
  };

  const stopRecording = () => {
    if (recording) {
      recording.stop();
      setIsRecording(false);
    }
  };

  const sendAudioToServer = async (audioBlob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('user_name', userData.name);
    formData.append('native_language', userData.nativeLanguage);
    formData.append('target_language', userData.learningLanguage);

    const response = await fetch('http://localhost:5000/process_audio', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    
      // Aquí puedes acceder a los datos devueltos por el servidor Flask
      // y actualizar el estado del componente para mostrarlos en la interfaz de usuario
    };
  
    return (
      <div className="">
        <img src={teacher} alt="Personaje" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3 w-1/2 md:w-1/3" />
        <div className="absolute bottom-0 left-0 w-full h-2/4 bg-black bg-opacity-50 p-4 rounded-t">
          <h1 className="text-6xl font-bold mb-4 text-white text-center">Hello I'am your teacher</h1>
          <textarea className="w-full p-2 mb-4 h-40" readOnly value={responseText} />
          <div className="flex space-x-4">
            <input type="text" className="w-full p-2" placeholder="Introduce tu texto aquí" />
            {isRecording ? (
              <button onClick={stopRecording} className="bg-red-500 text-white p-2 rounded">Stop</button>
            ) : (
              <button onClick={startRecording} className="bg-blue-500 text-white p-2 rounded">Record</button>
            )}
          </div>
        </div>
      </div>
    );
}
