'use client'
import React from 'react'
import { Button, useDisclosure } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { GoTrash } from 'react-icons/go';

import { useDeletePropertyOwner } from '@/rq-hooks/useDeletePropertyOwner';
import DeletePropertyOwnerModal from '../molecules/DeletePropertyOwnerModal';
import { useGetPropertyOwners } from '@/rq-hooks/useGetPropertyOwners';

const DeletePropertyOwnerButton = ({ propertyOwnerId, companyId, propertyId }: { propertyOwnerId: string, companyId: string, propertyId: string }) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    
    const { mutate, isSuccess, isPending, isError, reset } = useDeletePropertyOwner({ propertyOwnerId });
    const { refetch } = useGetPropertyOwners({ companyId, propertyId });

    const handleDelete = () => {
        mutate({ companyId, propertyId, propertyOwnerId });
    }

    if (isSuccess) {
        toast.success("Successfully deleted", { toastId: "delete-property-owner" });
        reset();
        refetch();
        onClose();
    }

    if (isError) {
        toast.error("Something went wrong, please contact support", { toastId: "delete-property-owner-error" });
    }

    return (
        <>
            <Button onPress={onOpen} color="danger" variant='light' isIconOnly startContent={<GoTrash size={16} />}></Button>
            <DeletePropertyOwnerModal isMutationPending={isPending} isOpen={isOpen} onDelete={handleDelete} onClose={onClose} onOpenChange={onOpenChange} />
        </>
    )
}

export default DeletePropertyOwnerButton