'use client'
import React from 'react'
import { Tabs, Tab, Spinner } from "@nextui-org/react";

import { useGetProperty } from '@/rq-hooks/useGetProperty'
import { PropertyWithManager } from '@/db/schema';

import Suppliers from './Suppliers';
import PropertyBasicInfo from './PropertyBasicInfo';
import PropertyOwners from './PropertyOwners';
import Text from '../atoms/Text';
import UpdatePropertyForm from './UpdatePropertyForm';

const PropertyPageContent = ({ propertyId, companyId }: { propertyId: string, companyId: string }) => {
    const { data, isLoading, isFetched } = useGetProperty({ companyId, propertyId });

    if (isLoading) {
        return <Spinner />;
    }

    if (isFetched && !data) {
        return null;
    }

    return (
        <>
            <div className='bg-white border border-stone-100 shadow-sm rounded-lg p-8 md:px-10 transition-shadow flex flex-col gap-8'>
                <PropertyBasicInfo property={data as PropertyWithManager} />
            </div>
            <div className='bg-white border border-stone-100 shadow-sm rounded-lg p-8 md:px-10 transition-shadow flex flex-col gap-2'>
                <Tabs
                    aria-label="Options"
                    color="primary"
                    variant="underlined"
                    classNames={{
                        tabList: "gap-8 w-full relative rounded-none p-0 border-b border-divider",
                        cursor: "w-full bg-primary",
                        tab: "max-w-fit px-0 h-12",
                        tabContent: "group-data-[selected=true]:text-primary group-data-[hover=true]:text-primary text-stone-600 text-base",
                        panel: "pt-8"
                    }}
                >
                    <Tab
                        key="basic"
                        title={
                            <div className="flex items-center space-x-2">
                                <span><Text localeParent='Properties' localeKey='Basic' /></span>
                            </div>
                        }
                    >
                        <UpdatePropertyForm companyId={companyId} property={data as PropertyWithManager} />
                    </Tab>
                    <Tab
                        key="owners"
                        title={
                            <div className="flex items-center space-x-2">
                                <span><Text localeParent='Properties' localeKey='Owners' /></span>
                            </div>
                        }
                    >
                        <PropertyOwners property={(data as PropertyWithManager)} />
                    </Tab>
                    <Tab
                        key="suppliers"
                        title={
                            <div className="flex items-center space-x-2">
                                <span><Text localeParent='Properties' localeKey='Suppliers' /></span>
                            </div>
                        }
                    >
                        <Suppliers companyId={companyId} propertyId={(data as PropertyWithManager).id} />
                    </Tab>
                </Tabs>
            </div>
        </>
    )
}

export default PropertyPageContent