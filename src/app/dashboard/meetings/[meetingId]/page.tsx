import MeetingPageContent from '@/app/components/organisms/MeetingPageContent'
import { getUserAndCompany } from '@/utils/serverActions';
import React from 'react'

const MeetingPage = async ({ params }: { params: { meetingId: string } }) => {
    const user = await getUserAndCompany();

    if (!user || !user.company?.id) {
        return null;
    }

    return (
        <div className='flex flex-col gap-4 max-w-screen-xl mx-auto'>
            <MeetingPageContent userWithCompany={user} meetingId={params.meetingId} />
        </div>
    )
}

export default MeetingPage