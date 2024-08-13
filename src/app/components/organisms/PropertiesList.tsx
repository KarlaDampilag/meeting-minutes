'use client'
import React from 'react'
import { Spinner } from '@nextui-org/react';

import { useGetProperties } from '@/rq-hooks/useGetProperties'
import PropertyCard from '../molecules/PropertyCard';

const PropertiesList = ({ companyId }: { companyId: string }) => {
    const { data, isLoading, isFetched } = useGetProperties({ companyId });

    if (isFetched) {
        if (data?.length === 0) {
            return <p>No properties</p>
        }
        return (
            <div className='flex flex-wrap gap-4 items-stretch'>
                {data?.map(property => <PropertyCard property={property} />)}
            </div>
        )
    }

    if (isLoading) {
        return <Spinner />
    }

    return null
}

export default PropertiesList