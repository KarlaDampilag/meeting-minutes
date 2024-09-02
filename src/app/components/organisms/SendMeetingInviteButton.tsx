'use client'
import React from 'react'
import { Button, useDisclosure } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { IoIosSend } from 'react-icons/io';

import SendMeetingInviteModal from '../molecules/SendMeetingInviteModal';

const SendMeetingInviteButton = () => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();


    return (
        <div>
            <Button onPress={onOpen} color="primary" variant='solid' startContent={<IoIosSend size={18} className='min-w-fit' />} radius='sm' className='max-w-fit text-medium'>Send Meeting Invite</Button>
            <SendMeetingInviteModal isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} />
        </div>
    )
}

export default SendMeetingInviteButton