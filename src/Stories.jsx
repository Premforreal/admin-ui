import React,{useState,useEffect} from 'react';
import { useGlobalContext } from './Context';

const Stories = () => {
    const {hits,query,nbPages,isLoading,removePost} = useGlobalContext();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
      id:"",
      email:'',
      name:'',
      role:''
    });
    const {id,email,name,role} = formData;
    
    function onChange(e){
      setFormData((prevState)=>({
        ...prevState, 
          [e.target.name]:e.target.value,
      }))
    }
    
    function editPost(user) {
      setIsEditing(true);
      setFormData(user);
    }

    function onSubmit(e){
      e.preventDefault();
      setIsEditing(false);
      for (let i = 0; i < hits.length; i++) {
        if(formData.id===hits[i].id){
            hits[i]=formData;
        }
      }
    }

    if(isLoading){
      return(
      <>
        Loading...
      </>);
    }
    return (
      <>
      {isEditing &&       
        <form onSubmit={onSubmit}>
          <input type='text' name='name' value={name} placeholder='Enter name' onChange={onChange} />
          <input type='text' name='email' value={email} placeholder='Enter your email' onChange={onChange} />
          <input type='text' name='role' value={role} placeholder='Enter your role' onChange={onChange} />
          <button type='submit'>Submit</button>
        </form>
      }
      {hits &&
              <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr> 
                  </thead>
                  <tbody>
                  {hits
                  .filter((item)=>{
                      const search = query.replaceAll(' ', '').toLowerCase();
                      if( item.name.replaceAll(' ', '').toLowerCase().includes(search)  ||
                          item.email.replaceAll(' ', '').toLowerCase().includes(search) ||
                          item.role.replaceAll(' ', '').toLowerCase().includes(search)){
                            return item;
                          }
                  })
                  .map((user)=>(
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <button onClick={()=>editPost(user)}>Edit</button>
                          <button onClick={()=>removePost(user.id)}>delete</button>
                        </td>
                      </tr>
                  ))}
                  </tbody>
              </table>
              }
      </>
    )
};

export default Stories