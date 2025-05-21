import {useNavigate, useSearchParams} from "react-router-dom";

export const Success = ()=>{
    const [searchParams] = useSearchParams();
    const Name = searchParams.get('name');
    const amount = searchParams.get('amount');
    const navigate = useNavigate();

    return <div className='flex justify-center my-44 '>
        <div className='flex flex-col'>
            <div className='font-bold text-9xl flex justify-center'>Success</div>
            <div className='flex justify-center text-3xl my-8 font-bold text-green-500'>
                {amount} Rs sent to {Name} Successfully!
            </div>
            <div className='flex justify-center'>
                <button className='text-white rounded-lg bg-green-500 font-bold p-3' onClick={()=>{
                    navigate('/dashboard')
                }}>Dashboard</button>
            </div>
        </div>
    </div>
}