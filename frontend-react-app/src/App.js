// import React from 'react';
// import Login from './Login';
// import Signup from './Signup';
// import Home from './Home';
// import { BrowserRouter , Routes, Route } from 'react-router-dom';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/home" element={<Home />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }


// export default App;


import React , { useState }from 'react';
import Login from './Login';
import Signup from './Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import EditPage from './EditPage/EditPage';

function App() {
  // const reWorkId = (id) => {
  //    setWorkId(id);
  // }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home/:id" element={<HomePage />} />
        <Route path="/edit/:id/:User" element={<EditPage />} />
      </Routes>
    </Router>
  );
}



export default App;
