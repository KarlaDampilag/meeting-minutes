'use client'
import React from 'react'
import { Button, useDisclosure } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { GoTrash } from 'react-icons/go';

import { useDeleteSupplier } from '@/rq-hooks/useDeleteSupplier';
import { useGetSuppliers } from '@/rq-hooks/useGetSuppliers';

import DeleteSupplierModal from '../molecules/DeleteSupplierModal';
import Text from '../atoms/Text';

const DeleteSupplierButton = ({ supplierId, companyId, propertyId }: { supplierId: string, companyId: string, propertyId: string }) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    
    const { mutate, isSuccess, isPending, isError, reset } = useDeleteSupplier({ supplierId });
    const { refetch } = useGetSuppliers({ companyId, propertyId });

    const handleDelete = () => {
        mutate({ companyId, propertyId, supplierId });
    }

    if (isSuccess) {
        toast.success(<Text localeParent='Common' localeKey='Successfully deleted' />, { toastId: "delete-supplier" });
        reset();
        refetch();
        onClose();
    }

    if (isError) {
        toast.error("Something went wrong, please contact support", { toastId: "delete-supplier" });
    }

    return (
        <>
            <Button onPress={onOpen} color="danger" variant='light' isIconOnly startContent={<GoTrash size={16} />}></Button>
            <DeleteSupplierModal isMutationPending={isPending} isOpen={isOpen} onDelete={handleDelete} onClose={onClose} onOpenChange={onOpenChange} />
        </>
    )
}

export default DeleteSupplierButton