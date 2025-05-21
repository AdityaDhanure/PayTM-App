import  {Heading} from "../components/Heading.jsx";
import {SubHeading} from "../components/SubHeading.jsx";
import {InputBox} from "../components/InputBox.jsx";
import {Button} from "../components/Button.jsx";
import {BottomWarning} from "../components/BottomWarning.jsx";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const SignIn = ()=> {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return <div className='bg-gray-200 flex justify-center pt-40 pb-40'>
        <div className='w-80 h-96 bg-white p-4 flex flex-col justify-between rounded-md'>
            <Heading label='Sign in'/>
            <SubHeading label='Enter your information to sign in'/>
            <InputBox label='Email' placeholder='abc@gmail.com' onChange={e=>setUsername(e.target.value)}/>
            <InputBox label='Password' placeholder='Password' onChange={e=>setPassword(e.target.value)}/>
            <Button label='Sign in' type='button' onClick={async () =>{
                const response = await axios.post('https://paytm-app-8h79.onrender.com/api/v1/user/signin', {username, password});
                localStorage.setItem('token', response.data.token);
                navigate('/dashb');
            }}/>
            <BottomWarning label="Don't have an account?" buttonText='Sign up' to='/signup'/>
        </div>
    </div>
}