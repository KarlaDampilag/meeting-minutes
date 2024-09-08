import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'
import { RiPencilFill } from 'react-icons/ri'

import { PropertyWithManager } from '@/db/schema'

import Card from '../atoms/Card'
import DeletePropertyButton from './DeletePropertyButton';
import PropertyAddressAndManager from './PropertyAddressAndManager'

const PropertyCard = ({ property }: { property: PropertyWithManager }) => {
    const router = useRouter();

    return (
        <Card className='!max-w-sm cursor-pointer hover:shadow-none hover:border-neutral-100 md:pb-9' onClick={() => router.push(`/dashboard/properties/${property.id}`)}>
            <div className='flex flex-col gap-8'>
                <div className='flex items-center gap-4'>
                    <div className='rounded-full bg-gray-200 w-9 h-9 flex items-center justify-center font-normal'>{property.name.charAt(0)}</div>
                    <p className='font-bold mb-0 line-clamp-1'>{property.name}</p>
                </div>
                <div className='ml-1'>
                    <PropertyAddressAndManager property={property} />
                </div>
            </div>
            <div className='mt-7 flex items-center gap-2 w-full justify-between'>
                <Button startContent={<RiPencilFill size={18} />} variant='solid' color='primary' size='sm' radius='sm' onClick={() => router.push(`/dashboard/properties/${property.id}`)}>Edit</Button>
                <DeletePropertyButton property={property} />
            </div>
        </Card>
    )
}

export default PropertyCard