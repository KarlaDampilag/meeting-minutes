'use client'
import React from 'react'

import { UserWithCompany } from '@/db/schema';

import AddPropertyButton from '@/app/components/organisms/AddPropertyButton';
import PropertiesList from './PropertiesList';
import PropertiesPropertyManagerFilter from '@/app/components/molecules/PropertiesPropertyManagerFilter';
import PropertiesSearchTermInput from '../molecules/PropertiesSearchTermInput';

const PropertiesListWithActions = ({ userWithCompany }: { userWithCompany: UserWithCompany }) => {
    const [searchTerm, setSearchTerm] = React.useState<string>();
    const [propertyManagerId, setPropertyManagerId] = React.useState<string>('all');

    return (
        <div className='flex flex-col gap-4'>
            <AddPropertyButton user={userWithCompany} />
            <div className='flex justify-start items-center gap-4'>
                <PropertiesSearchTermInput value={searchTerm} onChange={setSearchTerm} />
                <PropertiesPropertyManagerFilter companyId={userWithCompany.company_id as string} selectedPropertyManagerId={propertyManagerId} onChange={setPropertyManagerId} />
            </div>
            <PropertiesList userWithCompany={userWithCompany} propertyManagerId={propertyManagerId} searchTerm={searchTerm} />
        </div>
    )
}

export default PropertiesListWithActions