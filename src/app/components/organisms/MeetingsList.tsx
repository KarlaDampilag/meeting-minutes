'use client'
import React from 'react'
import { Spinner } from '@nextui-org/react';

import { useGetMeetings } from '@/rq-hooks/useGetMeetings';
import { UserWithCompany } from '@/db/schema';

import MeetingCard from '../molecules/MeetingCard';
import Text from '../atoms/Text';

const MeetingsList = ({ userWithCompany, propertyId, searchTerm }: { userWithCompany: UserWithCompany, propertyId: string | undefined, searchTerm: string | undefined }) => {
    const { data, isLoading, isRefetching, isFetched } = useGetMeetings({ companyId: userWithCompany.company_id, propertyId, searchTerm });

    if (isFetched) {
        if (data?.length === 0) {
            return <p>No meetings</p>
        }

        return (
            <div className='flex flex-wrap gap-4 items-stretch'>
                {data?.map(meeting => <MeetingCard meeting={meeting} key={meeting.id} />)}
            </div>
        )
    }

    if (isLoading || isRefetching) {
        return <div className='flex items-center justify-center mt-5'><Spinner /></div>
    }

    return null
}

export default MeetingsList