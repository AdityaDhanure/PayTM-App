import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const AppBar = ()=> {

    const [name, setName] = useState("User");
    useEffect(() => {
        async function findUser() {
            await axios.get('https://paytm-app-8h79.onrender.com/api/v1/user/finduser', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => setName(res.data.firstname))
        }
        findUser()
    }, [name]);

    const navigate = useNavigate();

    return <div>
        <div className='flex justify-between w-full shadow h-14 overflow-hidden'>
            <div className='flex flex-col font-semibold rounded-md p-4'>PayTM App</div>
            <div className='flex rounded-md'>
                <div className='p-4 font-semibold'>Hello</div>
                <div className='flex p-1'>
                    <div className='p-2 mr-3 rounded-full bg-zinc-200 cursor-pointer'>
                        <div className='px-2 font-semibold text-gray-500 text-2xl'>{name[0]}</div>
                    </div>
                </div>
            </div>
        </div>
        <div id={'profile'} className='flex justify-end'>
            <div className=' font-bold w-52 flex flex-col border-2 border-zinc-200 opacity-0 hover:opacity-100'>
                <div className='py-2 pl-7 text-2xl mt-2'>Hello {name}!</div>
                <div className='p-2 mx-8 my-2 pl-11 rounded-lg bg-red-600 text-white hover:border-x-2 hover:border-white hover:bg-red-700'>
                    <button onClick={() => {
                        localStorage.removeItem('token')
                        navigate('/signin')
                    }}>Logout
                    </button>
                </div>
            </div>
        </div>
    </div>
}