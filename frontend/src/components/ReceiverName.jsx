// eslint-disable-next-line react/prop-types
export const ReceiverName = ({nameU, label})=>{
    return <div className='mt-16'>
        <div className='flex gap-3 font-semibold'>
            <div className='p-2 rounded-full bg-zinc-200 cursor-pointer'>
                <div className='px-2 font-semibold text-gray-500 text-2xl'>{label}</div>
            </div>
            <div className='my-3'>{nameU}</div>
        </div>
    </div>
}