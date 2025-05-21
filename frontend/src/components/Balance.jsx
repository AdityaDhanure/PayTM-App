// eslint-disable-next-line react/prop-types
export const Balance = ({balance})=>{
    return <div className='flex font-bold text-xl'>
        <div className='p-1'>Your balance</div>
        <div className='p-1 pl-2'>Rs {balance}</div>
    </div>
}