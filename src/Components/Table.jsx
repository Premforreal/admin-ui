import React,{useState} from 'react';
import { useGlobalContext } from '../Context/Context';
import Delete from '@mui/icons-material/DeleteOutline';
import Edit from '@mui/icons-material/Edit';
import Pagination from './Pagination';

const Table = () => {
    let {data,newData,IDARRAY,query,page,nbPages,isLoading,removePost,removeMultiple} = useGlobalContext();
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

    function onSubmit(e){
      e.preventDefault();
      setIsEditing(false);
      for (let i = 0; i < data.length; i++) {
        if(formData.id===data[i].id){
            data[i]=formData;
        }
      }
    }

    function editPost(user) {
      setIsEditing(true);
      setFormData(user);
    }

    function removeMultipleHelper(id) {
      IDARRAY.includes(id) 
        ? IDARRAY.splice(IDARRAY.indexOf(id), 1) 
        : IDARRAY.push(id);
    }

    function selectAll() {
      setMasterCheck(!masterCheck);
      if(!masterCheck){
        for (let i = 0; i < data.length; i++) {
          if (i>=(page*10-10) && (i<page*10)) {
            IDARRAY.push(data[i].id); 
          }
        }
      }
      else{
        while (IDARRAY.length>0) {
          IDARRAY.pop();
        }
      }
      let arr =checked.map((item)=>!masterCheck);
      setChecked(arr);
    }

    function checkHelper(id) {
      let arr = [];
      for (let i = 0; i < checked.length; i++) {
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
        <div className="popup">
          <form onSubmit={onSubmit}>
            <p>Click to edit the required field</p>
            <hr />
            <label htmlFor="name">Name:</label>
            <input type='text' name='name' value={name} placeholder='Enter name' onChange={onChange} />
            <label htmlFor="name">Email:</label>
            <input type='text' name='email' value={email} placeholder='Enter your email' onChange={onChange} />
            <label htmlFor="name">Role:</label>
            <input type='text' name='role' value={role} placeholder='Enter your role' onChange={onChange} />
            <button className='cancel' onClick={()=>setIsEditing(false)}>cancel</button>
            <button type='submit'>Submit</button>
          </form>
        </div>       
      }
      {data &&
          <> 
              <table className='table'>
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
                  {newData
                  .slice(page*10-10,page*10)
                  .map((user)=>(
                      <tr key={user.id} className = {checked[parseInt(user.id)-1] ? "selected" : null}>
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
                          <Edit className='edit' onClick={()=>editPost(user)} ></Edit>
                          <Delete className='delete' onClick={()=>removePost(user.id)} ></Delete>
                        </td>
                      </tr>
                  ))}
                  </tbody>
              </table>
              </>
              }
          <div className="container">
              <button className='delete-selected' 
                  onClick={()=>{
                        setMasterCheck(false);
                        setChecked(new Array(100).fill(false));
                        removeMultiple(IDARRAY);
                        IDARRAY.length = 0;
                        }}>Delete selected
              </button>
              <Pagination/>
          </div>
      </>
    )
};

export default Table;