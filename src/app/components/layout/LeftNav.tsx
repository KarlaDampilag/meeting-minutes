import React from 'react'
import { cn } from '@nextui-org/react';
import { auth } from "@clerk/nextjs/server";
import { FiUsers } from "react-icons/fi";
import { HiOutlineBuildingOffice } from 'react-icons/hi2'
import { HiOutlineUsers, HiOutlineViewGrid } from 'react-icons/hi';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { IoCalendarClearOutline, IoCartOutline, IoPersonOutline, IoSettingsOutline } from 'react-icons/io5'

import { db } from '@/db/db';
import { companies, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

import { NavLink } from '../atoms/NavLink';
import Text from '../atoms/Text';
import Image from 'next/image';
import { LuUsers } from 'react-icons/lu';

const LeftNav = async () => {

    let companyApproved = false;
    let isAdmin;
    let companyLogo = null;
    let companyName = null;
    const { userId } = auth();

    if (userId) {
        const userResult = await db.select().from(users).where(eq(users.auth_id, userId))
            .leftJoin(companies, eq(users.company_id, companies.id))
            .limit(1);
        if (userResult?.length > 0 && userResult[0].companies?.approved) {
            companyApproved = true;
            isAdmin = userResult[0].users.role_id === process.env.NEXT_PUBLIC_ADMIN_ROLE_ID;
            companyLogo = userResult[0].companies?.logo;
            companyName = userResult[0].companies?.name;
        }
    }

    return (
        <div className='left-nav'>
            {companyApproved && (
                <>
                <div className='flex items-center justify-start gap-2 mt-2 mb-5 ml-6'>
                    {!!companyLogo && <div className='max-w-10 w-10 min-w-fit'><Image src={companyLogo} alt="logo" width={40} height={0} sizes='100vw' className='h-auto rounded-md' /></div>}
                    <p className='mb-0 font-medium text-sm text-stone-700'>{companyName}</p>
                    </div>
                    <hr className='border-stone-200' />
                </>
            )}
            <ul>
                <li>
                    <NavLink
                        href='/dashboard'
                        className={cn({ 'cursor-not-allowed hover:!bg-transparent !text-gray-400': !companyApproved })}
                        icon={<HiOutlineViewGrid size={20} className='min-w-fit' />}
                        text={<Text localeParent='Dashboard' localeKey='Dashboard' />}
                    />
                </li>
                <li>
                    <NavLink
                        href='/dashboard/properties'
                        className={cn({ 'cursor-not-allowed hover:!bg-transparent !text-gray-400': !companyApproved })}
                        icon={<HiOutlineBuildingOffice size={20} className='min-w-fit' />}
                        text={<Text localeParent='Properties' localeKey='Properties' />}
                    />
                </li>
                {isAdmin && (
                    <li>
                        <NavLink
                            href='/dashboard/team'
                            className={cn({ 'cursor-not-allowed hover:!bg-transparent !text-gray-400': !companyApproved })}
                            icon={<LuUsers size={20} className='min-w-fit' />}
                            text={<Text localeParent='Team' localeKey='Team' />}
                        />
                    </li>
                )}
                <li>
                    <NavLink
                        href='/dashboard/meetings'
                        className={cn({ 'cursor-not-allowed hover:!bg-transparent !text-gray-400': !companyApproved })}
                        icon={<IoCalendarClearOutline size={20} className='min-w-fit' />}
                        text={<Text localeParent='Meetings' localeKey='Meetings' />}
                    />
                </li>
                <li>
                    <NavLink
                        href='/dashboard/tasks'
                        className={cn({ 'cursor-not-allowed hover:!bg-transparent !text-gray-400': !companyApproved })}
                        icon={<IoMdCheckmarkCircleOutline size={20} className='min-w-fit' />}
                        text={<Text localeParent='Tasks' localeKey='Tasks' />}
                    />
                </li>
                {/* <li>
                    <NavLink
                        href='/dashboard/suppliers'
                        className={cn({ 'cursor-not-allowed hover:!bg-transparent !text-gray-400': !companyApproved })}
                        icon={<IoCartOutline size={20} className='min-w-fit' />}
                        text={<Text localeParent='Suppliers' localeKey='Suppliers' />}
                    />
                </li> */}
                {isAdmin && (
                    <li>
                        <NavLink
                            href='/dashboard/company-settings'
                            className={cn({ 'cursor-not-allowed hover:!bg-transparent !text-gray-400': !companyApproved })}
                            icon={<IoSettingsOutline size={20} className='min-w-fit' />}
                            text={<Text localeParent='Company Settings' localeKey='Company Settings' />}
                        />
                    </li>
                )}
            </ul>
        </div>
    )
}

export default LeftNav