import NoteContext from "./NoteContext"
import React, { useState } from "react"

const NoteState = (props) =>{
    const inital= {
        name:'Bhavesh',
        rno:'69'
    }
    const [state,setstate] = useState(inital)
    const update =() =>{
        setTimeout(()=>{
            setstate({
                name:'Gunjal',
                rno:'Tai'
             })
        },2000)
    }
    
    return(
        <NoteContext.Provider value={{state,update,setstate}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;