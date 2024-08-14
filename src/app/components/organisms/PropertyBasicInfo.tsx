import React from 'react'


import { PropertyWithManager } from '@/db/schema'
import PropertyAddressAndManager from '../molecules/PropertyAddressAndManager'

const PropertyBasicInfo = ({ property }: { property: PropertyWithManager }) => {
    return (
        <div>
            <h1 className='mb-4'>{property.name}</h1>
            <PropertyAddressAndManager property={property} />
        </div>
    )
}

export default PropertyBasicInfo