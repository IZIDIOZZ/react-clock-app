import React from 'react';
import Clock from './components/Clock';

function App() {
  return (
    <div className="App">
   
     <Clock  size={500}></Clock>
     <Clock  size={400}></Clock>
     <Clock  size={300}></Clock>
     <Clock  size={200}></Clock>
     
    </div>
  );
}

export default App;
