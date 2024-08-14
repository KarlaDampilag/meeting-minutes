import React from 'react'
import PropertyPageContent from '@/app/components/organisms/PropertyPageContent'
import { getUser } from '@/utils/serverActions'

const PropertyPage = async ({ params }: { params: { propertyId: string } }) => {
    const user = await getUser();

    if (!user || !user.company_id) {
        return null;
    }

    return (
        <div className='flex flex-col gap-4 max-w-screen-xl mx-auto'>
            <PropertyPageContent propertyId={params.propertyId} companyId={user.company_id} />
        </div>
    )
}

export default PropertyPage