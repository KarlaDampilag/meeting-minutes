import React from 'react'

const Section = (props: React.PropsWithChildren) => {
    return (
        <div className='bg-white py-5 px-6 my-5 rounded-lg border-stone-100 border'>{props.children}</div>
    )
}

export default Section