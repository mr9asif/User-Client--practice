
import { useEffect, useState } from 'react';
import './App.css'
import { Link } from 'react-router-dom';

function App() {
  const [users , setUsers] = useState([])
  const [refech, setRefech]= useState(null)
 
  
  const handleAddUser = e =>{
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name, email};
    console.log(user)


     fetch('http://localhost:2000/user', {
      method:"POST",
      headers:{
        'content-type': 'application/json'
      },
      body:JSON.stringify(user)
     })
     .then(res=> res.json())
     .then(data=>{
      console.log(data)
     
      if(data.insertedId){
        alert('account successfully added!')
        setRefech(Date.now())
        
        console.log(users)
       
      }
    
     })

     

     
  }
 

  useEffect(()=>{
    fetch('http://localhost:2000/user')
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
     
      setUsers(data)
   
    })
   },[refech])


   const handleDelete=_id=>{
       console.log('delete this', _id)

       fetch(`http://localhost:2000/user/${_id}`, {
        method:"DELETE",
        
       })
       .then(res=>res.json())
       .then(data=>{
        console.log(data)
        if(data.deletedCount > 0){
          alert('delete successfully')
          // const remainig = users.filter(user=> user._id !== _id)
          // setUsers(remainig)
          setRefech(Date.now())
        }
       })
   }

  //  const handleUpdate=_id=>{
  //   console.log('update', _id)
  //  }

  return (
    <>
     
      <h3>CRUD USer {users.length}</h3>
       <form onSubmit={handleAddUser}>
       <input type="text" name='name' placeholder='Name' />
       <input type="email" name='email' placeholder='Email' />
       <input type="submit" value='add user' id="" />
       </form>

     
         {
          users.map(user=> <p key={user._id}>{user.name}: {user.email} :: {user._id} 
            <Link to={`/update/${user._id}`}><button>Update</button></Link>        
            <button onClick={()=>handleDelete(user._id)}>X</button></p>)
         }
     
    </>
  )
}

export default App
