import React from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { HiOutlineViewGrid } from 'react-icons/hi'

import { NavLink } from '../components/atoms/NavLink'
import { getUser } from '@/utils/serverActions'

const SuperAdminLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getUser();

    console.log(user)
    console.log(process.env.SUPERADMIN_EMAILS?.toString().split(","))

    if (!user || !process.env.SUPERADMIN_EMAILS?.toString().split(",")?.includes(user.email)) {
        return <p className='m-4'>Page not found.</p>
    }

    return (
        <div className='dashboard-container'>
            <div className='left-nav'>
                <ul>
                    <li>
                        <NavLink
                            href='/superadmin'
                            icon={<HiOutlineViewGrid size={20} className='min-w-fit' />}
                            text='Dashboard'
                        />
                    </li>
                    <li>
                        <NavLink
                            href='/superadmin/pending-companies'
                            icon={<AiOutlineClockCircle size={20} className='min-w-fit' />}
                            text='Pending Companies'
                        />
                    </li>
                </ul>
            </div>
            <div className='dashboard-main-container'>{children}</div>
        </div>
    )
}

export default SuperAdminLayout