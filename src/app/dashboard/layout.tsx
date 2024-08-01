import React from 'react'
import LeftNav from '../components/layout/LeftNav'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='dashboard-container'>
            <LeftNav />
            <div className='dashboard-main-container'>{children}</div>
        </div>
    )
}

export default DashboardLayout