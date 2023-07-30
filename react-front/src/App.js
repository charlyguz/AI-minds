import React, { useState } from "react";
import classroom from './assets/classroom.jpg';
import StartComponent from './components/StartComponent.jsx';
import TeacherComponent from './components/TeacherComponent.jsx';

export default function App() {
  const [stage, setStage] = useState('start');
  const [userData, setUserData] = useState(null);

  const handleStart = (data) => {
    setUserData(data);
    setStage('teacher');
  };

  return (
    <div className="">
      <img src={classroom} alt="Fondo" className="absolute w-full h-full object-cover" />
      {stage === 'start' && <StartComponent onStart={handleStart} />}
      {stage === 'teacher' && <TeacherComponent userData={userData} />}
    </div>
  );
}

