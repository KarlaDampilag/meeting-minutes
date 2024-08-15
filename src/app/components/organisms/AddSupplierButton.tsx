'use client'
import React from 'react'
import { Button, useDisclosure } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { IoMdAdd } from 'react-icons/io';

import AddSupplierModal from '../molecules/AddSupplierModal';
import { useAddSupplier } from '@/rq-hooks/useAddSupplier';
import { useGetSuppliers } from '@/rq-hooks/useGetSuppliers';

const AddSupplierButton = ({ propertyId, companyId }: { propertyId: string, companyId: string }) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const { mutate, isSuccess, isPending, isError, reset } = useAddSupplier();
    const { refetch } = useGetSuppliers({ companyId, propertyId });

    const handleAdd = (companyId: string, propertyId: string, name: string, service: string, telephone: string | null, email: string | null) => {
        mutate({ companyId, propertyId, name, service, telephone, email });
    }

    if (isSuccess) {
        toast.success("Successfully added", { toastId: "add-supplier" });
        reset();
        refetch();
        onClose();
    }

    if (isError) {
        toast.error("Something went wrong, please contact support", { toastId: "add-supplier-error" });
    }

    return (
        <>
            <Button onPress={onOpen} color="primary" variant='bordered' startContent={<IoMdAdd size={16} className='min-w-fit' />} radius='sm' className='max-w-fit'>Add Supplier</Button>
            <AddSupplierModal companyId={companyId} propertyId={propertyId} isPending={isPending} isOpen={isOpen} onAdd={handleAdd} onClose={onClose} onOpenChange={onOpenChange} />
        </>
    )
}

export default AddSupplierButton