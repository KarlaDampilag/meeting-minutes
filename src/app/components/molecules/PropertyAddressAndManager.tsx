import React from 'react'
import { FaLocationDot, FaRegAddressCard } from 'react-icons/fa6'

import { PropertyWithManager } from '@/db/schema'

const PropertyAddressAndManager = ({ property }: { property: PropertyWithManager }) => {
    return (
        <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-2'>
                <FaLocationDot className='min-w-fit' size={18} />
                <p className='mb-0 text-sm'> {property.address?.street}, {property.address?.city}, {property.address?.country}</p>
            </div>
            <div className='flex items-center gap-2'>
                <FaRegAddressCard className='min-w-fit' size={18} />
                <p className='mb-0 text-sm'>{property.propertyManager.first_name} {property.propertyManager.last_name}</p>
            </div>
        </div>
    )
}

export default PropertyAddressAndManager