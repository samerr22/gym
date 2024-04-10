import  { useState } from 'react';
import Cat from "../img/fff.jpg";

function CheckBMI() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBMI] = useState('');

  const calculateBMI = () => {
    const weightInKg = parseFloat(weight);
    const heightInM = parseFloat(height) / 100; // Convert height from cm to meters
    const bmiValue = weightInKg / (heightInM * heightInM);
    setBMI(bmiValue.toFixed(2)); // Round BMI to two decimal places
  };

  return (

  
    <div>

<div className="h-[600px] relative">
        {" "}
        {/* Added relative class */}
        <img src={Cat} alt="" className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0">
          {" "}
          {/* Positioned Dash component here */}
        </div>{" "}
        {/* Added object-cover class */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-14 mt-5">
          <div className="w-[500px]   h-[300px] bg-white rounded-3xl">
          <div className='mt-8 ml-8'>
    <div >
    <h1 className="text-2xl mt-2 mb-2 ml-44 font-serif">
    Calculate
                </h1>
      <div>
        <label>Weight (kg):</label>
        <input
          type="number"
          className=" bg-slate-100 p-3 ml-6 rounded-lg w-[300px] h-11"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div className='mt-5'>
        <label>Height (cm):</label>
        <input
          type="number"
          value={height}
          className=" bg-slate-100 ml-6 p-3 rounded-lg w-[300px] h-11"
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <button 
        className=" bg-yellow-300 text-black shadow-sm mt-6 shadow-black p-3 rounded-lg w-[150px] ml-40  h-11 hover:opacity-90"
      onClick={calculateBMI}>Calculate BMI</button>
      {bmi && (
        <div className='mt-6 ml-[160px] bg-yellow-300 w-36 rounded-lg'>
          <h2 className='ml-3' >Your BMI: {bmi}</h2>
        </div>
      )}
    </div>
    </div>
          </div>
        </div>
      </div>





    
    </div>
  );
}

export default CheckBMI;
