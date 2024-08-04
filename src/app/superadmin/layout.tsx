import React from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { HiOutlineViewGrid } from 'react-icons/hi'

import { NavLink } from '../components/atoms/NavLink'

const SuperAdminLayout = ({ children }: { children: React.ReactNode }) => {
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