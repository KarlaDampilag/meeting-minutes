'use client'
import React from 'react'
import { Button, useDisclosure } from '@nextui-org/react';
import { Margin, Options } from 'react-to-pdf';

import DownloadMeetingAgendaPDFModal from '../molecules/DownloadMeetingAgendaPDFModal';
import { User } from '@/db/schema';
import { ISignee } from './MeetingPageContent';

interface Props {
    user: User;
    signees: ISignee[];
    setSignees: React.Dispatch<React.SetStateAction<ISignee[]>>
    toPDF: (options?: Options) => void;
}

const DownloadMeetingAgendaPDFButton = ({ user, signees, setSignees, toPDF }: Props) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

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
            <Button onPress={onOpen} color="primary" variant='bordered' radius='sm' className='max-w-fit text-base'>Download PDF</Button>
            <DownloadMeetingAgendaPDFModal
                companyId={user.company_id as string}
                isOpen={isOpen}
                onClick={handleDownloadPDF}
                onClose={onClose}
                onOpenChange={onOpenChange}
                signees={signees}
                setSignees={setSignees}
            />
        </>
    )
}

export default DownloadMeetingAgendaPDFButton