import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const InitiateAmtButton = ({amount, name}) => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const navigate = useNavigate();

    return <div className='flex justify-center '>
        <button className='bg-green-500 p-2 w-full rounded-md my-3 font-bold text-white hover:border-x-4 hover:border-x-white' onClick={async ()=>{
            try{
                await axios.post('https://paytm-app-8h79.onrender.com/api/v1/account/transfer', {
                    to: id,
                    amount: parseInt(amount)
                },{
                    headers:{
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                navigate('/success?id='+id+'&name='+name+'&amount='+amount);
            } catch {
                navigate('/failed?id='+id+'&name='+name+'&amount='+amount);
            }
        }}>Initiate Transfer</button>
    </div>
}