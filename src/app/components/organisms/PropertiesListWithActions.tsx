'use client'
import React from 'react'

import { UserWithCompany } from '@/db/schema';

import AddPropertyButton from '@/app/components/organisms/AddPropertyButton';
import PropertiesPropertyManagerFilter from '@/app/components/molecules/PropertiesPropertyManagerFilter';
import PropertiesList from './PropertiesList';

const PropertiesListWithActions = ({ userWithCompany }: { userWithCompany: UserWithCompany }) => {
    const [propertyManagerId, setPropertyManagerId] = React.useState<string>('all');

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-start items-center gap-4'>
                <PropertiesPropertyManagerFilter companyId={userWithCompany.company_id as string} selectedPropertyManagerId={propertyManagerId} onChange={setPropertyManagerId} />
                <AddPropertyButton user={userWithCompany} />
            </div>
            <PropertiesList userWithCompany={userWithCompany} propertyManagerId={propertyManagerId} />
        </div>
    )
}

export default PropertiesListWithActions