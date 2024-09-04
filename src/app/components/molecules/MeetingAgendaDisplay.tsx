import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl';

import { Company, MeetingWithPropertyAngAgendaItems } from '@/db/schema'
import { ISignee } from '../organisms/MeetingPageContent';
import UserSignature from './UserSignature';

const MeetingAgendaDisplay = ({ contentRef, company, meeting, signees }: { contentRef: React.RefObject<HTMLDivElement>; company: Company, meeting: MeetingWithPropertyAngAgendaItems, signees: ISignee[] }) => {
    const t = useTranslations('Meetings.Agenda Document');

    const dateFormatOptions: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZoneName: 'short'
    };

    return (
        <div id='pdf-content' ref={contentRef} className='py-16 px-24'>
            <div className='flex gap-3 justify-between text-xs mb-16'>
                <div className='flex flex-col gap-0.5'>
                    <span>{company.name}</span>
                    <span>{company.address?.street}</span>
                    <span>{company.address?.zipCode} {company.address?.city}</span>
                </div>

                <div className='flex flex-col gap-0.5'>
                    <span>Tel. {company.address?.telephone}</span>
                    <span>{company.website}</span>
                    <span>{company.email}</span>
                </div>

                <div className='min-w-fit'>
                    {company.logo && <Image src={company.logo} alt={company.name} width={0} height={0} sizes='100vw' className='w-auto h-11 object-cover' />}
                </div>
            </div>

            <p className='text-center font-medium text-2xl leading-tight mb-16'>
                Stockwerkeigentümergemeinschaft <br />
                {meeting.property.address?.street}{meeting.property.address?.zipCode && (<>, {meeting.property.address?.zipCode} {meeting.property.address?.city}</>)}
            </p>

            <h1 className='text-center font-bold text-2xl tracking-widest mb-16'>PROTOKOLL</h1>

            <p className='text-center w-11/12'>{t('intro', { date: new Intl.DateTimeFormat('de-DE', dateFormatOptions).format(new Date(meeting.date)).replace(', ', ' um ').replace(':', '.').replace(' MESZ', ' Uhr'), location: meeting.location })}</p>

            <hr className='mt-10 mb-5 border-stone-400' />

            <div className='flex flex-col gap-2.5 mb-4'>
                <p className='font-bold mb-0'>Traktanden:</p>
                <div className='flex flex-col gap-2.5'>
                    {meeting.agendaItems.map((agendaItem, index) => (
                        <div className='flex items-center gap-1' key={index}><span>{index + 1}.</span><span>{agendaItem.name}</span></div>
                    ))}
                </div>
            </div>

            <hr className='mt-6 mb-14 border-stone-400' />

            <p className='font-bold mb-2'>{company.name}</p>

            <div className='flex items-end gap-10 w-full justify-between'>
                {signees.map((signee, index) => (
                    <div className='flex flex-col gap-0.25 w-1/2' key={index}>
                        <UserSignature userId={signee.userId} className='max-w-52 h-auto min-h-14' />
                        <span>Name</span>
                        <span className='font-bold'>{signee.title || 'Title'}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MeetingAgendaDisplay