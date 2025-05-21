import {useNavigate, useSearchParams} from "react-router-dom";

export const Failed = ()=>{
    const [searchParams] = useSearchParams();
    const Name = searchParams.get('name');
    const navigate = useNavigate();

    return <div className='flex justify-center my-44'>
        <div className='flex flex-col'>
            <div className='font-bold text-9xl flex justify-center'>Failed</div>
            <div className='flex justify-center text-3xl my-8 font-bold text-red-500'>
                Transaction with {Name} Failed!
            </div>
            <div className='flex justify-center my-5'>
                <button className='text-white rounded-lg bg-red-500 font-bold p-3' onClick={() => {
                    navigate('/dashboard')
                }}>Dashboard
                </button>
            </div>
        </div>
    </div>
}