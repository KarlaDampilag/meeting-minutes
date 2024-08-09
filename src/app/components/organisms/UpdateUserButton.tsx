'use client'
import React from 'react'
import { Button, useDisclosure } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { GoPencil } from 'react-icons/go';

import { useUpdateRole } from '@/rq-hooks/useUpdateRole';
import { User } from '@/db/schema';

import UpdateUserModal from '../molecules/UpdateUserModal';

const UpdateUserButton = ({ user }: { user: User }) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    
    const { mutate: updateUserRole, isSuccess: isUpdateUserRoleSuccess, isPending: isUpdateUserRolePending, isError: isUpdateUserRoleError } = useUpdateRole();

    const handleUpdateUser = (userId: string, roleId: string | undefined) => {
        if (!!roleId) {
            updateUserRole({ userId: userId, roleId: roleId });
        }
    }

    if (isUpdateUserRoleSuccess) {
        toast.success("Successfully updated", { toastId: "update-user-role" });
    }

    if (isUpdateUserRoleError) {
        toast.error("Something went wrong, please contact support");
    }

    return (
        <>
            <Button onPress={onOpen} color="default" variant='light' isIconOnly startContent={<GoPencil />}></Button>
            <UpdateUserModal user={user} isUpdateUserRolePending={isUpdateUserRolePending} isOpen={isOpen} onUpdateUser={handleUpdateUser} onClose={onClose} onOpenChange={onOpenChange} />
        </>
    )
}

export default UpdateUserButton