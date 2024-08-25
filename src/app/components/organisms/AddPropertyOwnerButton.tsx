'use client'
import React from 'react'
import { Button, useDisclosure } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { IoMdAdd } from 'react-icons/io';

import AddPropertyOwnerModal from '../molecules/AddPropertyOwnerModal';
import { useAddPropertyOwner } from '@/rq-hooks/useAddPropertyOwner';
import { useGetPropertyOwners } from '@/rq-hooks/useGetPropertyOwners';
import { Property } from '@/db/schema';

const AddPropertyOwnerButton = ({ property }: { property: Property }) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const { mutate: addPropertyOwner, isSuccess, isPending, isError, reset } = useAddPropertyOwner();
    const { refetch } = useGetPropertyOwners({ companyId: property.id, propertyId: property.id });

    const handleAdd = (companyId: string, propertyId: string, firstName: string, lastName: string, telephone: string | null, email: string | null, ownershipPercentage: number | null, street: string | null, city: string | null, zipCode: string | null, country: string | null) => {
        addPropertyOwner({ companyId, propertyId, firstName, lastName, telephone, email, ownershipPercentage, street, city, zipCode, country });
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
            <AddPropertyOwnerModal companyId={property.company_id} property={property} isPending={isPending} isOpen={isOpen} onAdd={handleAdd} onClose={onClose} onOpenChange={onOpenChange} />
        </>
    )
}

export default AddPropertyOwnerButton