// eslint-disable-next-line react/prop-types
export const InputBox = ({label, placeholder, onChange}) => {
    return <div>
        <div className='pb-1.5 pt-1.5 font-semibold'>{label}</div>
        <input onChange={onChange} placeholder={placeholder} type="text" className='border-2 p-1 w-full rounded-md' />
    </div>
}