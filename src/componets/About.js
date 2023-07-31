import React, { useContext, useEffect } from 'react'
import NoteContext from '../contex/notes/NoteContext'

function About() {
  const a = useContext(NoteContext)
  
  useEffect(()=>{
          a.update();
         
          setTimeout(()=>{
          a.setstate({
            name:'Ram'
          })
          },1000);
           // eslint-disable-next-line
  },[])

  return (
    <div>About
        <div>
        {a.state.name}
        </div>
    </div>
  )
}

export default About