'use client'
import React from 'react'
import { Button, useDisclosure } from "@nextui-org/react";
import { GoPencil } from 'react-icons/go';

import { Supplier } from '@/db/schema';
import UpdateSupplierModal from '../molecules/UpdateSupplierModal';

const UpdateSupplierButton = ({ companyId, supplier }: { companyId: string, supplier: Supplier }) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} color="default" variant='light' isIconOnly startContent={<GoPencil size={16} />}></Button>
            <UpdateSupplierModal companyId={companyId} supplier={supplier} isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} />
        </>
    )
}

export default UpdateSupplierButton