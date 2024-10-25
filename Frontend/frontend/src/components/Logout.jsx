import React,{useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Logout({setRole}) {
    const navigate = useNavigate();
    useEffect(() => {
      axios.get('http://localhost:8002/auth/logout').then(res=>{
        if(res.data.logout){
            navigate('/')
            setRole('')
        }
      }).catch(error=>console.log(error))
    }, [])
    
  return (
    <div>
      
    </div>
  )
}

export default Logout
