import { cn } from '@nextui-org/react';
import React from 'react'
import { FaCircleCheck } from 'react-icons/fa6';

type Properties = {
    title: string | JSX.Element;
    description: string | JSX.Element;
    icon: JSX.Element;
    isSelected: boolean;
    onClick: () => void;
}

const SelectItemCard = (props: Properties) => {
    return (
        <div
            className={cn(
                "relative rounded-md border-2 border-stone-200 p-0.5 flex flex-col items-center justify-center w-full max-w-64 cursor-pointer hover:border-primary transition-colors",
                { "border-primary": props.isSelected }
            )}
            onClick={props.onClick}
        >
            {props.isSelected ? <FaCircleCheck size={20} className='absolute right-1 top-1 text-primary' /> : <div className='w-5 h-5 bg-gray-200 rounded-full absolute right-1 top-1' />}
            {props.icon}
            <div className='p-2'>
                <h3 className='text-xl font-semibold mb-2'>{props.title}</h3>
                <p className='text-sm'>{props.description}</p>
            </div>
        </div>
    )
}

export default SelectItemCard