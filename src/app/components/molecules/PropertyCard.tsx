import React from 'react'
import { useRouter } from 'next/navigation'

import { PropertyWithManager } from '@/db/schema'
import Card from '../atoms/Card'
import PropertyAddressAndManager from './PropertyAddressAndManager'

const PropertyCard = ({ property }: { property: PropertyWithManager }) => {
    const router = useRouter();

    return (
        <Card className='!max-w-sm cursor-pointer hover:shadow-none hover:border-neutral-100' onClick={() => router.push(`/dashboard/properties/${property.id}`)}>
            <div className='flex flex-col gap-5'>
                <div className='flex items-center gap-4'>
                    <div className='rounded-full bg-primary-100 w-9 h-9 flex items-center justify-center font-normal'>{property.name.charAt(0)}</div>
                    <p className='font-bold mb-0'>{property.name}</p>
                </div>
                <PropertyAddressAndManager property={property} />
            </div>
        </Card>
    )
}

export default PropertyCard