'use client'
import React from 'react'

import { UserWithCompany } from '@/db/schema';

import AddAgendaButton from './AddAgendaButton';
import MeetingsList from './MeetingsList';
import MeetingsPropertyFilter from '../molecules/MeetingsPropertyFilter';
import SearchTermInput from '../molecules/SearchTermInput';

const MeetingsListWithActions = ({ userWithCompany }: { userWithCompany: UserWithCompany }) => {
    const [searchTerm, setSearchTerm] = React.useState<string>();
    const [propertyId, setPropertyId] = React.useState<string>('all');

    return (
        <div className='flex flex-col gap-4'>
            <AddAgendaButton user={userWithCompany} />
            <div className='flex justify-start items-center gap-4'>
                <SearchTermInput value={searchTerm} onChange={setSearchTerm} />
                <MeetingsPropertyFilter companyId={userWithCompany.company_id as string} selectedPropertyId={propertyId} onChange={setPropertyId} />
            </div>
            <MeetingsList userWithCompany={userWithCompany} propertyId={propertyId} searchTerm={searchTerm} />
        </div>
    )
}

export default MeetingsListWithActions