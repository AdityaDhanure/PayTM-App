import {InitiateAmtButton} from "./InitiateAmtButton.jsx";
import {useState} from "react";
import {useSearchParams} from "react-router-dom";

export const Amount = ()=>{
    const [amount, setAmount] = useState('');
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name')

    return <div className='mt-8'>
        <div className='text-sm font-semibold'>Amount in (Rs)</div>
        <input type='integer' placeholder='Enter amount' className='border-2 my-2 p-1.5 pl-2 pb-2 rounded-md w-full' onChange={
            (e) => setAmount(e.target.value)} />
        <InitiateAmtButton amount ={amount} name={name}/>
    </div>
}