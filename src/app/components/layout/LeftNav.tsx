import Link from 'next/link'
import React from 'react'
import { HiOutlineBuildingOffice } from 'react-icons/hi2'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { IoCalendarClearOutline, IoCartOutline, IoPersonOutline, IoSettingsOutline } from 'react-icons/io5'

const LeftNav = () => {
    return (
        <div className='left-nav'>
            <ul>
                <li><Link href='/dashboard/properties'><HiOutlineBuildingOffice size={20} className='min-w-fit' /> Properties</Link></li>
                <li><Link href='/dashboard/team'><IoPersonOutline size={20} className='min-w-fit' /> Team</Link></li> {/** Admins only */}
                <li><Link href='/dashboard/meetings'><IoCalendarClearOutline size={20} className='min-w-fit' /> Meetings</Link></li>
                <li><Link href='/dashboard/tasks'><IoMdCheckmarkCircleOutline size={20} className='min-w-fit' /> Tasks</Link></li>
                <li><Link href='/dashboard/suppliers'><IoCartOutline size={20} className='min-w-fit' /> Suppliers</Link></li>
                <li><Link href='/dashboard/company-settings'><IoSettingsOutline size={20} className='min-w-fit' /> Company Settings</Link></li> {/** Admins only */}
            </ul>
        </div>
    )
}

export default LeftNav