import React from 'react'
import { FaLocationDot, FaRegAddressCard } from 'react-icons/fa6'

import Card from '../atoms/Card'
import { PropertyWithManager } from '@/db/schema'

const PropertyCard = ({ property }: { property: PropertyWithManager }) => {
    return (
        <Card className='!max-w-sm'>
            <div className='flex flex-col gap-5'>
                <div className='flex items-center gap-4'>
                    <div className='rounded-full bg-primary-100 w-9 h-9 flex items-center justify-center font-normal'>{property.name.charAt(0)}</div>
                    <p className='font-bold mb-0'>{property.name}</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2'>
                        <FaLocationDot className='min-w-fit' size={18} />
                        <p className='mb-0 text-sm'> {property.address?.street}, {property.address?.city}, {property.address?.country}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <FaRegAddressCard className='min-w-fit' size={18} />
                        <p className='mb-0 text-sm'>{property.propertyManager.first_name} {property.propertyManager.last_name}</p>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default PropertyCard