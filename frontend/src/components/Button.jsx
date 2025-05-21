// eslint-disable-next-line react/prop-types
export const Button = ({label, onClick}) => {
    return <div className='mt-6 hover:border-x-4 hover:border-x-white'>
        <button onClick={onClick} className='bg-black text-white w-full rounded-md p-2 font-semibold'>{label}</button>
    </div>
}