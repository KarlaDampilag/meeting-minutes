import React from 'react'

import { getUserAndCompany } from '@/utils/serverActions';
import MeetingsListWithActions from '@/app/components/organisms/MeetingsListWithActions';

const MeetingsPage = async () => {
    const user = await getUserAndCompany();

    if (!user || !user.company_id) {
        return null;
    }

    return (
        <div className='max-w-screen-xl mx-auto'>
            <MeetingsListWithActions userWithCompany={user} />
        </div>
    )
}

export default MeetingsPage