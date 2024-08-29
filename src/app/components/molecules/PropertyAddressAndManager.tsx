import React from 'react'
import { LuMapPin, LuPieChart, LuUserSquare2 } from "react-icons/lu";

import { PropertyWithManager } from '@/db/schema'

const PropertyAddressAndManager = ({ property }: { property: PropertyWithManager }) => {
    return (
        <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-2'>
                <LuMapPin className='min-w-fit' size={20} />
                <p className='mb-0 text-sm'>{property.address?.street}, {property.address?.city}, {property.address?.country}</p>
            </div>
            <div className='flex items-center gap-2'>
                <LuUserSquare2 className='min-w-fit' size={19} />
                <p className='mb-0 text-sm'>{property.propertyManager.first_name} {property.propertyManager.last_name}</p>
            </div>
            <div className='flex items-center gap-2'>
                <LuPieChart className='min-w-fit' size={18} />
                <p className='mb-0 text-sm'>{property.total_ownership_shares || 0} Shares</p>
            </div>
        </div>
    )
}

export default PropertyAddressAndManager