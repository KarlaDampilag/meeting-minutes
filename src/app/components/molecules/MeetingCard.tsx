import React from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@nextui-org/react'
import { RiPencilFill } from 'react-icons/ri'

import Card from '../atoms/Card'
import DeleteMeetingButton from './DeleteMeetingButton';
import MeetingBasicInfo from '../organisms/MeetingBasicInfo'

import { MeetingWithProperty } from '@/db/schema'

const MeetingCard = ({ companyId, meeting }: { companyId: string, meeting: MeetingWithProperty }) => {
    const router = useRouter();

    return (
        <Card className='!max-w-sm cursor-pointer hover:shadow-none hover:border-neutral-100 md:pb-9' onClick={() => router.push(`/dashboard/meetings/${meeting.id}`)}>
            <div className='flex flex-col gap-8'>
                <div className='flex items-center gap-4'>
                    <div className='rounded-full bg-gray-200 w-9 h-9 flex items-center justify-center font-normal'>{meeting.name.charAt(0)}</div>
                    <p className='font-bold mb-0 line-clamp-1'>{meeting.name}</p>
                </div>
                <MeetingBasicInfo meeting={meeting} />
            </div>
            <div className='mt-7 flex items-center gap-2 w-full justify-between'>
                <Button startContent={<RiPencilFill size={18} />} variant='solid' color='primary' size='sm' radius='sm' onClick={() => router.push(`/dashboard/meetings/${meeting.id}`)}>Edit</Button>
                <DeleteMeetingButton meeting={meeting} companyId={companyId} />
            </div>
        </Card>
    )
}

export default MeetingCard