import React, { useState, useEffect } from "react";
import {AudioRecorder, useAudioRecorder} from "react-audio-voice-recorder";
import teacher from '../assets/teacher.png';
import '../index.css';

export default function TeacherComponent({ userData }) {
  const [responseText, setResponseText] = React.useState('');
  const recorderControls = useAudioRecorder();
  const [audioSourceURL, setAudioSourceURL] = React.useState("");
  const [transcriptionText, setTranscriptionText] = useState("");
  const onRecordingComplete = (blob) => {
    const url = URL.createObjectURL(blob);
    console.log(blob);
    setAudioSourceURL(url);
    sendAudioToServer(blob);
  };
  useEffect(() => {
    setTranscriptionText('');
  }, [audioSourceURL]);

  const sendAudioToServer = async (blob) => {
    const audioFile = new File([blob], "audio_file",{type: "audio/wav"});
    const formData = new FormData();
    formData.append('audio', audioFile);
    formData.append('user_name', userData.name);
    formData.append('native_language', userData.nativeLanguage);
    formData.append('target_language', userData.learningLanguage);
    console.log(audioFile);
    const response = await fetch('http://localhost:5000/start_conversation', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
      console.log(data);
      const transcriptionWithUserName = `${userData.name}: ${data.transcript}`; // Concatenar el nombre del usuario con el texto de transcripción
      setTranscriptionText(transcriptionWithUserName);
    };
  React.useEffect(() => {
    const startConversation = async () => {
      const response = await fetch('http://localhost:5000/start_conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          user_name: userData.name,
          native_language: userData.nativeLanguage,
          target_language: userData.learningLanguage
        })
      });
  
      const data = await response.json();
      setResponseText(data.text_response);
      const audio = new Audio(`data:audio/wav;base64,${data.audio_response}`);
      audio.play();
    };
    startConversation();
  }, []);
  
    return (
      <div className="">
        <img src={teacher} alt="Personaje" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3 w-1/2 md:w-1/3" />
        <div className="absolute bottom-0 left-0 w-full h-2/4 bg-black bg-opacity-50 p-4 rounded-t">
          <h1 className="text-6xl font-bold mb-4 text-white text-center">Hello I'am your teacher</h1>
          <textarea className="w-full p-2 mb-4 h-40" readOnly value={responseText} />
          <div className="flex space-x-4">
          <AudioRecorder
            onRecordingComplete={(blob) => onRecordingComplete(blob)}
            recorderControls={recorderControls}
            />
            <audio controls src={audioSourceURL} type="audio/mpeg" preload="metadata"/>
            <textarea type="text" className="w-full p-2" placeholder="Introduce tu texto aquí" 
            value={transcriptionText}
            />
      </div>
        </div>
      </div>
    );
}
