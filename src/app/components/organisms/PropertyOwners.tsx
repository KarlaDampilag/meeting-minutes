import React from 'react'
import AddPropertyOwnerButton from './AddPropertyOwnerButton'
import PropertyOwnersTable from '../molecules/PropertyOwnersTable'
import { Property } from '@/db/schema'

const PropertyOwners = ({ property }: { property: Property }) => {
    return (
        <div className='flex flex-col gap-4'>
            <AddPropertyOwnerButton property={property} />
            <PropertyOwnersTable property={property} />
        </div>
    )
}

export default PropertyOwners