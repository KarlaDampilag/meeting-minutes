'use client'
import React from 'react'
import { Button, useDisclosure } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { GoTrash } from 'react-icons/go';

import { useDeleteInvite } from '@/rq-hooks/useDeleteInvite';
import DeleteInviteModal from '../molecules/DeleteInviteModal';

const DeleteInviteButton = ({ inviteId }: { inviteId: string }) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    
    const { mutate: deleteInvite, isSuccess, isPending, isError } = useDeleteInvite();

    const handleDeleteInvite = () => {
        if (!!inviteId) {
            deleteInvite({ inviteId });
        }
    }

    if (isSuccess) {
        toast.success("Invite deleted", { toastId: "delete-invite" });
    }

    if (isError) {
        toast.error("Something went wrong, please contact support");
    }

    return (
        <>
            <Button onPress={onOpen} color="danger" variant='light' isIconOnly startContent={<GoTrash size={16} />}></Button>
            <DeleteInviteModal isMutationPending={isPending} isOpen={isOpen} onDelete={handleDeleteInvite} onClose={onClose} onOpenChange={onOpenChange} />
        </>
    )
}

export default DeleteInviteButton