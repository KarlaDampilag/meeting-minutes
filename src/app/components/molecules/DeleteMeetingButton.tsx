import React from 'react'
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react"
import { BiSolidTrashAlt } from "react-icons/bi"
import { toast } from 'react-toastify'

import Text from '../atoms/Text'

import { Meeting } from '@/db/schema'
import { useDeleteMeeting } from '../../../rq-hooks/useDeleteMeeting'

const DeleteMeetingButton = ({ companyId, meeting }: { companyId: string, meeting: Meeting }) => {
    const { mutate, isPending, isSuccess, isError, reset } = useDeleteMeeting({ meetingId: meeting.id });

    if (isSuccess) {
        toast.success(<Text localeParent='Common' localeKey='Successfully deleted' />, { toastId: "delete-meeting" });
        reset();
    }

    if (isError) {
        toast.error("Something went wrong, please contact support", { toastId: "delete-meeting-error" });
    }

    const handleDelete = () => {
        mutate({ meetingId: meeting.id, companyId });
    }

    return (
        <Popover placement="right" radius='sm'>
            <PopoverTrigger>
                <Button startContent={<BiSolidTrashAlt size={18} />} variant='light' size='sm' radius='sm' ><Text localeParent='Common' localeKey='Delete' /></Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="p-4">
                    <div className="mb-4">
                        <p className='font-bold'>Are you sure? </p>
                        <p className='text-sm'>This will delete all related minutes. </p>
                        <p className='text-sm'>Deleting a meeting is irreversible.</p>
                    </div>
                    <Button color='danger' size='sm' isLoading={isPending} isDisabled={isPending} onClick={handleDelete}><Text localeParent='Common' localeKey='Delete' /></Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default DeleteMeetingButton