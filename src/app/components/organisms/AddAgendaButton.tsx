'use client'
import React from 'react'
import { Button, useDisclosure } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { IoMdAdd } from 'react-icons/io';

import AddAgendaModal from '../molecules/AddAgendaModal';

import { User } from '@/db/schema';
import { useGetProperties } from '@/rq-hooks/useGetProperties';
import { useAddMeeting } from '@/rq-hooks/useAddMeeting';
import Text from '../atoms/Text';

const AddAgendaButton = ({ user }: { user: User }) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const { mutate: addMeeting, isSuccess, isPending, isError, reset } = useAddMeeting();
    const { refetch } = useGetProperties({ companyId: user.company_id, propertyManagerId: 'all', searchTerm: null });

    const handleAddMeeting = (propertyId: string, name: string, location: string, date: string, hours: string | null, minutes: string | null, agendaTopics: string[]) => {
        addMeeting({ propertyId, name, location, date, hours, minutes, agendaTopics });
    }

    if (isSuccess) {
        toast.success("Successfully added", { toastId: "add-agenda" });
        reset();
        refetch();
        onClose();
    }

    if (isError) {
        toast.error("Something went wrong, please contact support", { toastId: "add-agenda-error" });
    }

    return (
        <div className='mb-3'>
            <Button onPress={onOpen} color="primary" variant='bordered' startContent={<IoMdAdd size={18} className='min-w-fit' />} radius='sm' className='max-w-fit text-medium'><Text localeParent='Meetings' localeKey='Create Meeting Agenda' /></Button>
            <AddAgendaModal companyId={user.company_id as string} isPending={isPending} isOpen={isOpen} onAddMeeting={handleAddMeeting} onClose={onClose} onOpenChange={onOpenChange} />
        </div>
    )
}

export default AddAgendaButton