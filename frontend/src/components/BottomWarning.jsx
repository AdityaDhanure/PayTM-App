import {useNavigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const BottomWarning = ({label, buttonText, to})=>{
    const navigate = useNavigate();
    return <div className='flex justify-between p-4 pb-2'>
        <div className='font-semibold text-sm pl-5'>{label}</div>
        <div className='text-sm underline hover:font-semibold hover:cursor-pointer pr-6 ' onClick={()=>navigate(to)}>
            {buttonText}
        </div>
    </div>
}