import React from 'react'

const Card = (props: React.PropsWithChildren) => {
    return (
        <div className='w-full max-w-md bg-white border border-stone-100 shadow-sm rounded-lg p-8 md:p-10'>{props.children}</div>
    )
}

export default Card