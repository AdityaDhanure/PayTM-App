import {Heading} from "../components/Heading.jsx";
import {ReceiverName} from "../components/ReceiverName.jsx";
import {Amount} from "../components/Amount.jsx";
import {useSearchParams} from "react-router-dom";

export const SendMoney = ()=>{
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name')

    return <div className='bg-gray-200 flex justify-center pt-44 pb-44'>
        <div className='w-80 p-4 bg-white rounded-md'>
            <Heading label='Send Money'/>
            {/* eslint-disable-next-line react/prop-types */}
            <ReceiverName nameU={name} label={name[0].toUpperCase()}/>
            <Amount/>
        </div>
    </div>
}