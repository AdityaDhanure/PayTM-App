import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {Signup} from "./pages/Signup.jsx";
import {SignIn} from "./pages/SignIn.jsx";
import {Dashboard} from "./pages/Dashboard.jsx";
import {SendMoney} from "./pages/SendMoney.jsx";
import {Failed} from "./pages/Failed.jsx";
import {Success} from "./pages/Success.jsx";
import {useEffect} from "react";

function App() {
    return <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<CheckLogin path={'/dashboard'}/>}></Route>

                <Route path='/signup' element={<Signup/>}></Route>
                <Route path='/signin' element={<SignIn />}></Route>

                <Route path='/dashboard' element={<CheckLogin path={'/dashb'} />}></Route>
                <Route path='/dashb' element={<Dashboard/>}></Route>

                <Route path='/send' element={<SendMoney />}></Route>

                <Route path='/success' element={<Success/>}></Route>
                <Route path='/failed' element={<Failed/>}></Route>
            </Routes>
        </BrowserRouter>
    </div>
}

function CheckLogin({path}){
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    useEffect(()=>{
        token ? navigate(path) : navigate('/signin');
    }, [token, navigate, path])
}


export default App
