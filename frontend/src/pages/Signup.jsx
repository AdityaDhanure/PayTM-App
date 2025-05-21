import {Heading} from "../components/Heading.jsx";
import {SubHeading} from "../components/SubHeading.jsx";
import {InputBox} from "../components/InputBox.jsx";
import {Button} from "../components/Button.jsx";
import {BottomWarning} from "../components/BottomWarning.jsx";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const Signup = ()=>{
    const navigate = useNavigate();

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    return <div className='bg-gray-200 flex justify-center pt-20 pb-20'>
        <div className='w-80 p-4 bg-white rounded-md'>
            <Heading label='Sign up'/>
            <SubHeading label='Enter your information to create an account'/>
            <InputBox label='First Name' placeholder='Aditya' onChange={e=>setFirstName(e.target.value)}/>
            <InputBox label='Last Name' placeholder='Dhanure' onChange={e=>setLastName(e.target.value)}/>
            <InputBox label='Email' placeholder='abc@gmail.com' onChange={e=>setUserName(e.target.value)}/>
            <InputBox label='Password' placeholder='Password' onChange={e=>setPassword(e.target.value)}/>
            <Button label='Sign up' type='submit' onClick={async ()=>{
                const response = await axios.post('http://localhost:4000/api/v1/user/signup', {
                    firstname, lastname, username, password
                });
                localStorage.setItem('token', response.data.token);
                navigate('/dashb');
            }}/>
            <BottomWarning label='Already have an account?' buttonText='Sign in' to='/signin'/>
        </div>
    </div>
}