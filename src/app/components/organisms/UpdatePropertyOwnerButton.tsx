'use client'
import React from 'react'
import { Button, useDisclosure } from "@nextui-org/react";
import { GoPencil } from 'react-icons/go';

import { Owner, Property } from '@/db/schema';
import UpdatePropertyOwnerModal from '../molecules/UpdatePropertyOwnerModal';

const UpdatePropertyOwnerButton = ({ companyId, property, propertyOwner }: { companyId: string, property: Property, propertyOwner: Owner }) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} color="default" variant='light' isIconOnly startContent={<GoPencil size={16} />}></Button>
            <UpdatePropertyOwnerModal companyId={companyId} property={property} propertyOwner={propertyOwner} isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} />
        </>
    )
}

export default UpdatePropertyOwnerButton