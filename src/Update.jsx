import { useLoaderData } from "react-router-dom";

const Update = () => {
    const loadedUser = useLoaderData()
       const {_id}= loadedUser
    const handleUpdateUser = e =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value
        const email = form.email.value
        const update = {name, email}
        console.log(update);

        fetch(`http://localhost:2000/user/${loadedUser._id}`, {
            method:'PUT',
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(update)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
        })
    }
     
    return (
        <div>
           <form onSubmit={handleUpdateUser}>
           <input type="text" defaultValue={loadedUser?.name} name="name" /><br />
           <input type="email" defaultValue={loadedUser?.email} name="email" /><br />
           <input type="submit" value='Update' />
           </form>
        </div>
    );
};

export default Update;