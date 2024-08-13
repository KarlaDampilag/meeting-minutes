'use client'
import React from 'react'
import { Button, useDisclosure } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { IoMdAdd } from 'react-icons/io';

import AddCompanyModal from '../molecules/AddPropertyModal';
import { User } from '@/db/schema';
import { useAddProperty } from '@/rq-hooks/useAddProperty';
import { useGetProperties } from '@/rq-hooks/useGetProperties';

const AddPropertyButton = ({ user }: { user: User }) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const { mutate: addProperty, isSuccess, isPending, isError, reset } = useAddProperty();
    const { refetch } = useGetProperties({ companyId: user.company_id });

    const handleAddProperty = (companyId: string, propertyName: string, street: string | null, city: string | null, zipCode: string | null, country: string | null, propertyManagerId: string) => {
        addProperty({ companyId, propertyName, street, city, zipCode, country, propertyManagerId });
    }

    if (isSuccess) {
        toast.success("Successfully added", { toastId: "add-property" });
        reset();
        refetch();
        onClose();
    }

    if (isError) {
        toast.error("Something went wrong, please contact support", { toastId: "add-property-error" });
    }

    return (
        <>
            <Button onPress={onOpen} color="primary" variant='bordered' startContent={<IoMdAdd size={18} className='min-w-fit' />} radius='sm' className='max-w-fit text-medium'>Add Property</Button>
            <AddCompanyModal companyId={user.company_id as string} isPending={isPending} isOpen={isOpen} onAddProperty={handleAddProperty} onClose={onClose} onOpenChange={onOpenChange} />
        </>
    )
}

export default AddPropertyButton