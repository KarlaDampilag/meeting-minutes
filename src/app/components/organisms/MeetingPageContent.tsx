'use client'

import React from 'react'
import { Button, Spinner, Tab, Tabs } from '@nextui-org/react';
import { Margin, usePDF } from 'react-to-pdf';

import MeetingAgendaDisplay from '../molecules/MeetingAgendaDisplay';
import MeetingBasicInfo from './MeetingBasicInfo'
import { Company, MeetingWithProperty } from '@/db/schema';
import SendMeetingInviteButton from './SendMeetingInviteButton';
import { useGetMeeting } from '@/rq-hooks/useGetMeeting';
import Text from '../atoms/Text';

const MeetingPageContent = ({ company, meetingId }: { company: Company, meetingId: string }) => {
    const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
    
    const { data: meeting, isLoading, isFetched } = useGetMeeting({ companyId: company.id, meetingId });

    if (isLoading) {
        return <Spinner />;
    }

    if (isFetched && !meeting) {
        return null;
    }

    const handleDownloadPDF = () => {
        toPDF({
            method: 'open',
            page: {
                margin: Margin.MEDIUM,
                orientation: 'landscape',
             },
        });
    };

    return (
        <>
            <div className='bg-white border border-stone-100 shadow-sm rounded-lg p-8 md:px-10 transition-shadow flex flex-col gap-6'>
                <MeetingBasicInfo meeting={meeting as MeetingWithProperty} />
                <div className='flex items-center gap-2'>
                    <Button color='primary' radius='sm' variant='bordered' onClick={handleDownloadPDF}>Download PDF</Button>
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
                        {/* <UpdatePropertyForm companyId={companyId} property={data as PropertyWithManager} /> */}
                        <div className='px-8 md:px-10'>
                        Update Meeting Agenda Form
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
                        <MeetingAgendaDisplay company={company} meeting={meeting as MeetingWithProperty} contentRef={targetRef} />
                    </Tab>
                </Tabs>
            </div>
        </>
    )
}

export default MeetingPageContent