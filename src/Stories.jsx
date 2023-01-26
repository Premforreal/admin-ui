import React from 'react';
import { useGlobalContext } from './Context';

const Stories = () => {
    const {hits,query,nbPages,isLoading, removePost } = useGlobalContext();

    if(isLoading){
      return(
      <>
        Loading...
      </>);
    }
    return (
      <>
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
                  {hits.filter((item)=>{
                      const search = query.replaceAll(' ', '').toLowerCase();
                      if( item.name.replaceAll(' ', '').toLowerCase().includes(search) ||
                          item.email.replaceAll(' ', '').toLowerCase().includes(search) ||
                          item.role.replaceAll(' ', '').toLowerCase().includes(search)){
                            return item
                          }
                  }).map((user)=>(
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
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