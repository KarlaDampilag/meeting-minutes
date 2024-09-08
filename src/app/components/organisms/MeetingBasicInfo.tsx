import React from 'react'
import { LuBuilding, LuClock8, LuHourglass, LuMapPin } from 'react-icons/lu'

import { MeetingWithProperty } from '@/db/schema'

const MeetingBasicInfo = ({ meeting, includeTitle }: { meeting: MeetingWithProperty, includeTitle?: boolean }) => {
    const dateFormatOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true
    }

    const [hours, minutes, seconds] = meeting.duration.split(":").map(Number);
    const formattedDuration = `${hours} hours ${minutes} minutes`;

    return (
        <div>
            {includeTitle && <h1 className='mb-4'>{meeting.name}</h1>}
            <div className='flex flex-col gap-3'>
                <div className='flex items-center gap-2'>
                    <LuBuilding className='min-w-fit' size={18} />
                    <p className='mb-0 text-sm'>{meeting.property.name}</p>
                </div>
                <div className='flex items-center gap-2'>
                    <LuClock8 className='min-w-fit' size={18} />
                    <p className='mb-0 text-sm'>{new Date(meeting.date).toLocaleString("de-CH", dateFormatOptions)}</p>
                </div>
                <div className='flex items-center gap-2'>
                    <LuHourglass className='min-w-fit' size={18} />
                    <p className='mb-0 text-sm'>{formattedDuration}</p>
                </div>
                <div className='flex items-center gap-2'>
                    <LuMapPin className='min-w-fit' size={20} />
                    <p className='mb-0 text-sm line-clamp-1'>{meeting.location}</p>
                </div>
            </div>
        </div>
    )
}

export default MeetingBasicInfo