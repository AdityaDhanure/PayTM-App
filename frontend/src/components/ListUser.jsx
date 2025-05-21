// eslint-disable-next-line react/prop-types
export const ListUser = ({uName, label, onClick})=>{

    return <div className='flex justify-between mb-2 font-semibold'>
        <div className='flex gap-2'>
            <div className='p-2 rounded-full bg-zinc-200 cursor-pointer'>
                <div className='px-2 font-semibold text-gray-500 text-2xl'>{label}</div>
            </div>
            <div className='my-3'>{uName}</div>
        </div>
        <button className='bg-black text-white h-10 my-1 px-6 pb-1 text-sm rounded-lg'
                onClick={onClick}>Send Money
        </button>
    </div>
}