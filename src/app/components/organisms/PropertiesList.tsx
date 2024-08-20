'use client'
import React from 'react'
import { Spinner } from '@nextui-org/react';

import { useGetProperties } from '@/rq-hooks/useGetProperties'
import { UserWithCompany } from '@/db/schema';

import PropertyCard from '@/app/components/molecules/PropertyCard';

const PropertiesList = ({ userWithCompany, propertyManagerId }: { userWithCompany: UserWithCompany, propertyManagerId: string | undefined }) => {
    const { data, isLoading, isRefetching, isFetched } = useGetProperties({ companyId: userWithCompany.company_id, propertyManagerId });

    if (isFetched) {
        if (data?.length === 0) {
            return <p>No properties</p>
        }

        return (
            <div className='flex flex-wrap gap-4 items-stretch'>
                {data?.map(property => <PropertyCard property={property} key={property.id} />)}
            </div>
        )
    }

    if (isLoading || isRefetching) {
        return <div className='flex items-center justify-center '><Spinner /></div>
    }

    return null
}

export default PropertiesList