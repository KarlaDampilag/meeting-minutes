import React from 'react'

import { getUserAndCompany } from '@/utils/serverActions'

import PropertiesListWithActions from '@/app/components/organisms/PropertiesListWithActions';

const PropertiesPage = async () => {
    const user = await getUserAndCompany();

    if (!user || !user.company_id) {
        return null;
    }

    return (
        <div className='max-w-screen-xl mx-auto'>
            <PropertiesListWithActions userWithCompany={user} />
        </div>
    )
}

export default PropertiesPage