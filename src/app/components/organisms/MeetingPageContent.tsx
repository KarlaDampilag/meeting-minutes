'use client'

import React from 'react'
import { Spinner, Tab, Tabs } from '@nextui-org/react';
import { usePDF } from 'react-to-pdf';

import DownloadMeetingAgendaPDFButton from './DownloadMeetingAgendaPDFButton';
import MeetingAgendaDisplay from '../molecules/MeetingAgendaDisplay';
import MeetingBasicInfo from './MeetingBasicInfo'
import SendMeetingInviteButton from './SendMeetingInviteButton';
import Text from '../atoms/Text';
import UpdateMeetingAgendaForm from './UpdateMeetingAgendaForm';

import { Company, MeetingWithPropertyAngAgendaItems, UserWithCompany } from '@/db/schema';
import { useGetMeeting } from '@/rq-hooks/useGetMeeting';

export interface ISignee {
    userId: string | undefined;
    title: string | undefined;
}

const MeetingPageContent = ({ userWithCompany, meetingId }: { userWithCompany: UserWithCompany, meetingId: string }) => {
    const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
    
    const { data: meeting, isLoading, isFetched } = useGetMeeting({ companyId: userWithCompany.company_id, meetingId });

    const [signees, setSignees] = React.useState<ISignee[]>([{ userId: undefined, title: undefined }]);

    if (isLoading) {
        return <Spinner />;
    }

    if (isFetched && !meeting) {
        return null;
    }

    return (
        <>
            <div className='bg-white border border-stone-100 shadow-sm rounded-lg p-8 md:px-10 transition-shadow flex flex-col gap-6'>
                <MeetingBasicInfo meeting={meeting as MeetingWithPropertyAngAgendaItems} />
                <div className='flex items-center gap-2'>
                    <DownloadMeetingAgendaPDFButton user={userWithCompany} toPDF={toPDF} signees={signees} setSignees={setSignees} />
                    <SendMeetingInviteButton />
                </div>
            </div>
            <div className='bg-white border border-stone-100 shadow-sm rounded-lg transition-shadow flex flex-col gap-2'>
                <Tabs
                    aria-label="Options"
                    color="primary"
                    variant="underlined"
                    classNames={{
                        tabList: "gap-8 w-full relative rounded-none p-0 border-b border-divider",
                        cursor: "w-full bg-primary",
                        tab: "max-w-fit px-0 h-12",
                        tabContent: "group-data-[selected=true]:text-primary group-data-[hover=true]:text-primary text-stone-600 text-base",
                        base: "p-8 pb-3 md:p-10 md:pb-3"
                    }}
                >
                    <Tab
                        key="basic"
                        title={
                            <div className="flex items-center space-x-2">
                                <span><Text localeParent='Properties' localeKey='Basic' /></span>
                            </div>
                        }
                    >
                        <div className='px-8 md:px-10'>
                            <UpdateMeetingAgendaForm companyId={userWithCompany.company_id as string} meeting={meeting as MeetingWithPropertyAngAgendaItems} />
                        </div>
                    </Tab>
                    <Tab
                        key="preview"
                        title={
                            <div className="flex items-center space-x-2">
                                <span>Preview</span>
                            </div>
                        }
                    >
                        <MeetingAgendaDisplay company={userWithCompany.company as Company} meeting={meeting as MeetingWithPropertyAngAgendaItems} contentRef={targetRef} signees={signees} />
                    </Tab>
                </Tabs>
            </div>
        </>
    )
}

export default MeetingPageContent