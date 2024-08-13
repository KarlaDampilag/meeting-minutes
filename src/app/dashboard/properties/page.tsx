import React from 'react'

import { getUser } from '@/utils/serverActions'
import AddPropertyButton from '@/app/components/organisms/AddPropertyButton';
import PropertiesList from '@/app/components/organisms/PropertiesList';

const PropertiesPage = async () => {
    const userWithCompany = await getUser();

    if (!userWithCompany || !userWithCompany.company_id) {
        return null;
    }

    return (
        <div className='flex flex-col gap-7 max-w-screen-xl mx-auto'>
            <AddPropertyButton user={userWithCompany} />
            <PropertiesList companyId={userWithCompany.company_id} />
        </div>
    )
}

export default PropertiesPage