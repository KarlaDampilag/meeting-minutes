import React from 'react'
import Link from 'next/link'
import { AiOutlineClockCircle } from 'react-icons/ai'

const SuperAdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='dashboard-container'>
            <div className='left-nav'>
                <ul>
                    <li><Link href='/superadmin/pending-companies'><AiOutlineClockCircle size={20} className='min-w-fit' />Pending Companies</Link></li>
                </ul>
            </div>
            <div className='dashboard-main-container'>{children}</div>
        </div>
    )
}

export default SuperAdminLayout