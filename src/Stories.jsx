import React,{useState,useEffect} from 'react';
import { useGlobalContext } from './Context';

const Stories = () => {
    const {hits,IDARRAY,query,nbPages,isLoading,removePost,removeMultiple} = useGlobalContext();
    const [isEditing, setIsEditing] = useState(false);
    const [checked, setChecked] = useState(new Array(100).fill(false));
    const [masterCheck, setMasterCheck] = useState(false);
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

    function removeMultipleHelper(id) {
      IDARRAY.includes(id) 
        ? IDARRAY.splice(IDARRAY.indexOf(id), 1) 
        : IDARRAY.push(id);
    }

    function selectAll() {
      setMasterCheck(!masterCheck);
      if(!masterCheck){
        for (let i = 0; i < hits.length; i++) {
          IDARRAY.push(hits[i].id);
        }
      }
      else{
        while (IDARRAY.length>0) {
          IDARRAY.pop();
        }
      }
      let arr = checked.map((item)=>!masterCheck);
      setChecked(arr);
    }

    function checkHelper(id) {
      let arr = [];
      for (let i = 0; i < checked.length; i++) 
      {
          i+1==id 
              ? arr.push(!checked[i]) 
              : arr.push(checked[i])
      }
      setChecked(arr);
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
          <> 
          <button onClick={()=>{
                  removeMultiple(IDARRAY);
                  setMasterCheck(false);
                  }}>Delete selected</button>
              <table>
                  <thead>
                    <tr>
                      <th>
                        <input  type="checkbox" 
                                checked={masterCheck}
                                onChange={selectAll}
                                />
                      </th>
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
                        <td>
                          <input  type="checkbox"
                                  checked={checked[parseInt(user.id)-1]}
                                  onChange={()=>removeMultipleHelper(user.id)}
                                  onClick={()=>checkHelper(parseInt(user.id))}
                          />
                        </td>
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
              </>
              }

      </>
    )
};

export default Stories