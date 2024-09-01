import React from 'react'
import { useRouter } from 'next/navigation'

import { MeetingWithProperty } from '@/db/schema'
import Card from '../atoms/Card'
import MeetingBasicInfo from '../organisms/MeetingBasicInfo'

const MeetingCard = ({ meeting }: { meeting: MeetingWithProperty }) => {
    const router = useRouter();

    return (
        <Card className='!max-w-sm cursor-pointer hover:shadow-none hover:border-neutral-100' onClick={() => router.push(`/dashboard/meetings/${meeting.id}`)}>
            <div className='flex flex-col gap-5'>
                <div className='flex items-center gap-4'>
                    <div className='rounded-full bg-primary-100 w-9 h-9 flex items-center justify-center font-normal'>{meeting.name.charAt(0)}</div>
                    <p className='font-bold mb-0'>{meeting.name}</p>
                </div>
                <MeetingBasicInfo meeting={meeting} />
            </div>
        </Card>
    )
}

export default MeetingCard