'use client'
import React from 'react'
import { Button, useDisclosure } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { IoMdAdd } from 'react-icons/io';

import AddPropertyOwnerModal from '../molecules/AddPropertyOwnerModal';
import { useAddPropertyOwner } from '@/rq-hooks/useAddPropertyOwner';
import { useGetPropertyOwners } from '@/rq-hooks/useGetPropertyOwners';

const AddPropertyOwnerButton = ({ propertyId, companyId }: { propertyId: string, companyId: string }) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const { mutate: addPropertyOwner, isSuccess, isPending, isError, reset } = useAddPropertyOwner();
    const { refetch } = useGetPropertyOwners({ companyId, propertyId });

    const handleAdd = (companyId: string, propertyId: string, firstName: string, lastName: string, telephone: string | null, email: string | null, ownershipPercentage: number | null) => {
        addPropertyOwner({ companyId, propertyId, firstName, lastName, telephone, email, ownershipPercentage });
    }

    if (isSuccess) {
        toast.success("Successfully added", { toastId: "add-property-owner" });
        reset();
        refetch();
        onClose();
    }

    if (isError) {
        toast.error("Something went wrong, please contact support", { toastId: "add-property-owner-error" });
    }

    return (
        <>
            <Button onPress={onOpen} color="primary" variant='bordered' startContent={<IoMdAdd size={16} className='min-w-fit' />} radius='sm' className='max-w-fit'>Add Owner</Button>
            <AddPropertyOwnerModal companyId={companyId} propertyId={propertyId} isPending={isPending} isOpen={isOpen} onAdd={handleAdd} onClose={onClose} onOpenChange={onOpenChange} />
        </>
    )
}

export default AddPropertyOwnerButton