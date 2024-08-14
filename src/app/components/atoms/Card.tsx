import React from 'react'

const Card = (props: React.PropsWithChildren<{ className?: string, onClick?: () => void }>) => {
    return (
        <div className={`w-full max-w-md bg-white border border-stone-100 shadow-sm rounded-lg p-8 md:p-10 transition-all ${props.className ? props.className : ''}`} onClick={props.onClick}>{props.children}</div>
    )
}

export default Card