import Link from 'next/link'
import React from 'react'
import { cn } from '@nextui-org/react';
import { auth } from "@clerk/nextjs/server";
import { HiOutlineBuildingOffice } from 'react-icons/hi2'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { IoCalendarClearOutline, IoCartOutline, IoPersonOutline, IoSettingsOutline } from 'react-icons/io5'

import { db } from '@/db/db';
import { companies, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

const LeftNav = async () => {
    let companyApproved = false;
    const { userId } = auth();

    if (userId) {
        const userResult = await db.select().from(users).where(eq(users.auth_id, userId))
            .leftJoin(companies, eq(users.company_id, companies.id))
            .limit(1);
        if (userResult?.length > 0 && userResult[0].companies?.approved) {
            companyApproved = true;
        }
    }

    return (
        <div className='left-nav'>
            <ul>
                <li><Link href='/dashboard/properties' className={cn({ 'cursor-not-allowed hover:!bg-transparent !text-gray-400': !companyApproved })}><HiOutlineBuildingOffice size={20} className='min-w-fit' /> Properties</Link></li>
                <li><Link href='/dashboard/team' className={cn({ 'cursor-not-allowed hover:!bg-transparent !text-gray-400': !companyApproved })}><IoPersonOutline size={20} className='min-w-fit' /> Team</Link></li> {/** Admins only */}
                <li><Link href='/dashboard/meetings' className={cn({ 'cursor-not-allowed hover:!bg-transparent !text-gray-400': !companyApproved })}><IoCalendarClearOutline size={20} className='min-w-fit' /> Meetings</Link></li>
                <li><Link href='/dashboard/tasks' className={cn({ 'cursor-not-allowed hover:!bg-transparent !text-gray-400': !companyApproved })}><IoMdCheckmarkCircleOutline size={20} className='min-w-fit' /> Tasks</Link></li>
                <li><Link href='/dashboard/suppliers' className={cn({ 'cursor-not-allowed hover:!bg-transparent !text-gray-400': !companyApproved })}><IoCartOutline size={20} className='min-w-fit' /> Suppliers</Link></li>
                <li><Link href='/dashboard/company-settings' className={cn({ 'cursor-not-allowed hover:!bg-transparent !text-gray-400': !companyApproved })}><IoSettingsOutline size={20} className='min-w-fit' /> Company Settings</Link></li> {/** Admins only */}
            </ul>
        </div>
    )
}

export default LeftNav