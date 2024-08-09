'use client'
import React from 'react'
import { Button, useDisclosure } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { GoTrash } from 'react-icons/go';

import { useDeleteUserFromCompany } from '@/rq-hooks/useDeleteUserFromCompany';
import { User } from '@/db/schema';

import DeleteUserFromCompanyModal from '../molecules/DeleteUserFromCompanyModal';

const DeleteUserFromCompanyButton = ({ user }: { user: User }) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    
    const { mutate: deleteUserFromCompany, isSuccess, isPending, isError } = useDeleteUserFromCompany();

    const handleDeleteUserFromCompany = () => {
        if (!!user.id) {
            deleteUserFromCompany({ companyId: user.company_id, userId: user.id });
        }
    }

    if (isSuccess) {
        toast.success("User deleted", { toastId: "delete-user" });
    }

    if (isError) {
        toast.error("Something went wrong, please contact support");
    }

    return (
        <>
            <Button onPress={onOpen} color="danger" variant='light' isIconOnly startContent={<GoTrash size={16} />}></Button>
            <DeleteUserFromCompanyModal isMutationPending={isPending} isOpen={isOpen} onDeleteUserFromCompany={handleDeleteUserFromCompany} onClose={onClose} onOpenChange={onOpenChange} />
        </>
    )
}

export default DeleteUserFromCompanyButton