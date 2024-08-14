import React from 'react'
import AddPropertyOwnerButton from './AddPropertyOwnerButton'
import PropertyOwnersTable from '../molecules/PropertyOwnersTable'

const PropertyOwners = ({ propertyId, companyId }: { propertyId: string, companyId: string }) => {
    return (
        <div className='flex flex-col gap-4'>
            <AddPropertyOwnerButton propertyId={propertyId} companyId={companyId} />
            <PropertyOwnersTable companyId={companyId} propertyId={propertyId} />
        </div>
    )
}

export default PropertyOwners