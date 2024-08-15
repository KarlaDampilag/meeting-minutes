import React from 'react'
import AddSupplierButton from './AddSupplierButton'
import SuppliersTable from '../molecules/SuppliersTable'

const Suppliers = ({ propertyId, companyId }: { propertyId: string, companyId: string }) => {
    return (
        <div className='flex flex-col gap-4'>
            <AddSupplierButton propertyId={propertyId} companyId={companyId} />
            <SuppliersTable companyId={companyId} propertyId={propertyId} />
        </div>
    )
}

export default Suppliers