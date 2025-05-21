import {AppBar} from "../components/AppBar.jsx";
import {Balance} from "../components/Balance.jsx";
import {Users} from "../components/Users.jsx";
import axios from "axios";
import {useEffect, useState} from "react";

export const Dashboard = ()=>{
    const [balance, setBalance] = useState(0);
    useEffect(() => {
        async function fetchBalance(){
            await axios.get('https://paytm-app-8h79.onrender.com/api/v1/account/balance', {
                headers:{
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res=> setBalance(res.data.balance) )
        }
        fetchBalance();
    }, [balance]);

    return <div>
        <AppBar/>
        <div className='m-8 -mt-24'>
            <Balance balance={balance.toFixed(3)} />
            <Users/>
        </div>
    </div>
}