import './App.css';
import axios from 'axios';
import { useState,useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");


  useEffect(() => {
      axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
        .then((res)=>setData(res.data))
        .catch((err)=>console.log(err))  
  }, [])

  function deleteItem(id) {
    console.log(id);
    setData(data.filter((item)=>item.id!==id));
    console.log(data);
  }

  return (
    <>
        <div className='search'>
            <input  placeholder='search by name, email or role' 
                    type="text" 
                    onChange={(e)=>setSearch(e.target.value)}/>
        </div>
        
        <tbody>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
          {/* https://www.freecodecamp.org/news/how-the-question-mark-works-in-javascript/ */}
          
          {data?.filter((item)=>{
                return search.toLowerCase()==="" ? item :
                    ( item.name.toLowerCase().includes(search)  || 
                      item.email.toLowerCase().includes(search) || 
                      item.role.toLowerCase().includes(search)
                    ) 
            }).map((item) => (
              <tr key={item.id}>
                <th>
                  <input type="checkbox" />
                </th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <button>
                    edit
                  </button>
                  <button onClick={()=>deleteItem(item.id)}>
                    delete
                  </button>
                </td>
              </tr>
           ))}
        </tbody>
    </>
  );
}

export default App;
