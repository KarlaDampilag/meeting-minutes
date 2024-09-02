import { Company, MeetingWithProperty } from '@/db/schema'
import Image from 'next/image'
import React from 'react'

const MeetingAgendaDisplay = ({ contentRef, company, meeting }: { contentRef: React.RefObject<HTMLDivElement>; company: Company, meeting: MeetingWithProperty }) => {
    return (
        <div id='pdf-content' ref={contentRef} className='py-16 px-24'>
            <div className='flex gap-3 justify-between text-xs mb-16'>
                <div className='flex flex-col gap-0.5'>
                    <span>Biland Immobilien Management AG</span>
                    <span>Nordstresse 14</span>
                    <span>4665 Oftringen</span>
                </div>

                <div className='flex flex-col gap-0.5'>
                    <span>Tel. +41 62 791 18 90</span>
                    <span>www.biland-immobilien.ch</span>
                    <span>info@biland-immobilien.ch</span>
                </div>

                <div className='min-w-fit'>
                    {company.logo && <Image src={company.logo} alt={company.name} width={0} height={0} sizes='100vw' className='w-auto h-14 object-cover' />}
                </div>
            </div>

            <p className='text-center font-medium text-2xl leading-tight mb-16'>
                Stockwerkeigentümergemeinschaft <br />
                {meeting.property.address?.street}{meeting.property.address?.zipCode && (<>, {meeting.property.address?.zipCode} {meeting.property.address?.city}</>)}
            </p>

            <h1 className='text-center font-bold text-2xl tracking-widest mb-16'>PROTOKOLL</h1>

            <p className='text-center'>der ordentlichen Eigentumerversammlung der Stockwerkeigentumerschaft vom 26. Juni 2024 um 18.00 Uhr im Mehrzweckraum Nr. 2 Gemeinde Niedergosgen, Hauptstrasse 50, 5013 Niedergosgen</p>

            <hr className='mt-10 mb-5 border-stone-400' />

            <div className='flex flex-col gap-2.5 mb-4'>
                <p className='font-bold mb-0'>Traktanden:</p>
                <div className='flex flex-col gap-2.5'>
                    <div className='flex items-center gap-1'><span>1.</span><span>Begrüssung und Feststellung der Beschlussfähigkeit</span></div>
                    <div className='flex items-center gap-1'><span>2.</span><span>Wahl des Protokollführers</span></div>
                    <div className='flex items-center gap-1'><span>3.</span><span>Genehmigung des letztjährigen Protokolls</span></div>
                    <div className='flex items-center gap-1'><span>4.</span><span>Abnahme der Jahresrechnung vom 01.01.2023 - 31.12.2023</span></div>
                </div>
            </div>

            <hr className='mt-6 mb-14 border-stone-400' />

            <p className='font-bold mb-5'>Biland Immobilien Managment AG</p>

            <div className='flex items-center gap-40'>
                <div className='flex flex-col gap-0.25'>
                    [signature]
                    <span>Sascha Biland</span>
                    <span className='font-bold'>Vorstiz</span>
                </div>
                <div className='flex flex-col gap-0.25'>
                    [signature]
                    <span>Sascha Biland</span>
                    <span className='font-bold'>Vorstiz</span>
                </div>
            </div>
        </div>
    )
}

export default MeetingAgendaDisplay