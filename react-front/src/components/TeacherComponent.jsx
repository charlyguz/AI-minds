import React, { useState, useEffect, useRef } from "react";
import teacher from '../assets/teacher.png';
import '../index.css';
import MicRecorder from 'mic-recorder-to-mp3';

export default function TeacherComponent({ userData }) {
  const [responseText, setResponseText] = React.useState('');
  const [feedbackText, setFeedback] = React.useState('');
  const recorder = useRef(null); //Recorder
  const audioPlayer = useRef(null); //Ref for HTML Audio tag
  const [transcriptionText, setTranscriptionText] = useState("");
  const [blobURL, setBlobUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    //Declares the recorder object and stores it in ref
    recorder.current = new MicRecorder({ bitRate: 128 });
    setTranscriptionText('');
  }, []);
  const startRecording = () => {
    //start() returns a promise incase if audio is not blocked by browser
    recorder.current.start().then(() => {
      setIsRecording(true);
    });
  };
  const stopRecording = () => {
    recorder.current
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const newBlobUrl = URL.createObjectURL(blob); //generates url from blob
        setBlobUrl(newBlobUrl); //refreshes the page
        setIsRecording(false);
        sendAudioToServer(blob);
      })
      .catch((e) => console.log(e));
  };

  const sendAudioToServer = async (blob) => {
    const audioFile = new File([blob], "audio_file",{type: "audio/mp3"});
    const formData = new FormData();
    formData.append('audio', audioFile);
    formData.append('user_name', userData.name);
    formData.append('native_language', userData.nativeLanguage);
    formData.append('target_language', userData.learningLanguage);
    console.log(blob);
    const response = await fetch('http://localhost:5000/start_conversation', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
      console.log(data);
      setResponseText(data.text_response);
      const audio = new Audio(`data:audio/wav;base64,${data.audio_response}`);
      const transcriptionWithUserName = `${userData.name}: ${data.transcript}`;
      setTranscriptionText(transcriptionWithUserName);
      setFeedback(data.feedback);
      audio.play();
    };
    return (
      <div className="">
        <img src={teacher} alt="Personaje" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3 w-1/2 md:w-1/3" />
        <div className="absolute bottom-0 left-0 w-full h-2/4 bg-black bg-opacity-50 p-4 rounded-t">
          <h1 className="text-6xl font-bold mb-4 text-white text-center">Hello I'am your teacher</h1>
          <textarea className="w-full p-2 mb-4 h-20" readOnly value={responseText}/>
          <textarea className="w-full p-2 mb-4 h-20" readOnly value={feedbackText}/>
          <div className="flex space-x-4">
          <textarea type="text" className="w-full p-2" placeholder="Introduce tu texto aquí" value={transcriptionText}/>
          <button onClick={startRecording} disabled={isRecording}>
            Record
          </button>
          <button onClick={stopRecording} disabled={!isRecording}>
            Stop
          </button>
          <audio
            ref={audioPlayer}
            src={blobURL}
            controls="controls"
            onEnded={() => setPlay(false)} //event handler when audio has stopped playing
          />
          </div>
        </div>
      </div>
    );
}
