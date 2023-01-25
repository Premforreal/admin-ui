import React,{useEffect} from 'react'
import axios from 'axios';

const Stories = () => {
  const API = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  function getAPIdata() {
    axios.get(API)
      .then((res)=>{
        console.log(res.data)
      })
      .catch((err)=>{
      console.log(err)
      }); 
  }

  useEffect(() => {
    getAPIdata();
  }, [])
  

  return (
    <div>Stories</div>
  )
};

export default Stories