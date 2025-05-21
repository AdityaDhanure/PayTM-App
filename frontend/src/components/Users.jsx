import {ListUser} from "./ListUser.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export const Users = ()=> {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    useEffect(()=>{
        axios.get('http://localhost:4000/api/v1/user/bulk?filter='+ filter)
            .then(res=>{
                setUsers(res.data.users)
            })
    }, [filter])

    const [id, setId] = useState("");
    useEffect(() => {
        async function findUser() {
            await axios.get('http://localhost:4000/api/v1/user/finduser', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => setId(res.data.userId))
        }
        findUser()
    }, [id]);
    const filteredUsers = users.filter(user => id !== user._id);

    const navigate = useNavigate();

    return <div className=' mt-2 p-1'>
        <div className='font-bold text-xl my-2'>Users</div>
        <div className='my-3'>
            <input type='string' placeholder='Search users...' className='border-2 font-semibold py-1 px-3 w-full rounded-md' onChange={(e)=>{
                setFilter(e.target.value)
            }}/>
        </div>
        <div>
            {/* eslint-disable-next-line react/jsx-key */}
            {filteredUsers.map(user => <ListUser key={user._id} uName={user.firstname +' '+ user.lastname} label={user.firstname[0]} onClick={()=>{
                    navigate('/send?id=' + user._id + '&name=' + user.firstname +' '+ user.lastname)
                }}/>
            )}
        </div>
    </div>
}