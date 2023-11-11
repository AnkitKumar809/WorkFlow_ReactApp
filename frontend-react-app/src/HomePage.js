import React from 'react';
import Header from './Header';
import { useState } from 'react';
import { useParams } from 'react-router-dom'; 
function HomePage() {
   const { id } = useParams();
   const [notes, setNotes] = useState([]);
   

  return (
   <>
     <Header user={id} />

      
   </>
  )
}

export default HomePage;