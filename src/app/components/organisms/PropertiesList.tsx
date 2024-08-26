'use client'
import React from 'react'
import { Spinner } from '@nextui-org/react';

import { useGetProperties } from '@/rq-hooks/useGetProperties'
import { UserWithCompany } from '@/db/schema';

import PropertyCard from '@/app/components/molecules/PropertyCard';
import Text from '../atoms/Text';

const PropertiesList = ({ userWithCompany, propertyManagerId, searchTerm }: { userWithCompany: UserWithCompany, propertyManagerId: string | undefined, searchTerm: string | undefined }) => {
    const { data, isLoading, isRefetching, isFetched } = useGetProperties({ companyId: userWithCompany.company_id, propertyManagerId, searchTerm });

    if (isFetched) {
        if (data?.length === 0) {
            return <p><Text localeParent='Properties' localeKey='No properties' /></p>
        }

        return (
            <div className='flex flex-wrap gap-4 items-stretch'>
                {data?.map(property => <PropertyCard property={property} key={property.id} />)}
            </div>
        )
    }

    if (isLoading || isRefetching) {
        return <div className='flex items-center justify-center mt-5'><Spinner /></div>
    }

    return null
}

export default PropertiesList