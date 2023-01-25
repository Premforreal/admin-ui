import React from 'react';
import { useGlobalContext } from './Context';

const Stories = () => {
    const {hits,nbPages,isLoading } = useGlobalContext();

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
                  {hits.map((user)=>(
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>actions</td>
                      </tr>
                  ))}
                  </tbody>
              </table>
              }
      </>
    )
};

export default Stories