import React, { useState } from "react";
import {AudioRecorder, useAudioRecorder} from "react-audio-voice-recorder";
import teacher from '../assets/teacher.png';
import '../index.css';

export default function TeacherComponent({ userData }) {
  
    const recorderControls = useAudioRecorder();

    const [audioSourceURL, setAudioSourceURL] = React.useState("");

    const onRecordingComplete = (blob) => {
      const url = URL.createObjectURL(blob);

      console.log(blob);
      setAudioSourceURL(url);
      //sendAudioToServer(blob);
    };

  const sendAudioToServer = async (blob) => {
    const audioFile = new File([blob], "audio_file",{type: "audio/wav"});
    const formData = new FormData();
    formData.append('audio', audioFile);
    formData.append('user_name', userData.name);
    formData.append('native_language', userData.nativeLanguage);
    formData.append('target_language', userData.learningLanguage);

    const response = await fetch('http://localhost:5000/process_audio', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
      console.log(data);
      // Aquí puedes acceder a los datos devueltos por el servidor Flask
      // y actualizar el estado del componente para mostrarlos en la interfaz de usuario
      
    };
    return (
      <div className="">
        <img src={teacher} alt="Personaje" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3 w-1/2 md:w-1/3" />
        <div className="absolute bottom-0 left-0 w-full h-2/4 bg-black bg-opacity-50 p-4 rounded-t">
          <h1 className="text-6xl font-bold mb-4 text-white text-center">Hello I'am your teacher</h1>
          <textarea className="w-full p-2 mb-4 h-40" readOnly/>
          <div className="flex space-x-4">
            <AudioRecorder
            onRecordingComplete={(blob) => onRecordingComplete(blob)}
            recorderControls={recorderControls}
            downloadFileExtension="webm"
            />
            <audio controls src={audioSourceURL} type="audio/mpeg" preload="metadata"/>
            <input type="text" className="w-full p-2" placeholder="Introduce tu texto aquí" />
      </div>

        </div>
      </div>
    );
}
