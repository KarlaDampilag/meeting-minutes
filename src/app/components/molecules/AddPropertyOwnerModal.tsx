'use client'
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";

import AddPropertyOwnerForm from './AddPropertyOwnerForm';
import { Property } from '@/db/schema';

interface Props {
    companyId: string;
    property: Property;
    isPending: boolean;
    isOpen: boolean;
    onAdd: (companyId: string, propertyId: string, firstName: string, lastName: string, telephone: string | null, email: string | null, ownedParts: number | null, street: string | null, city: string | null, zipCode: string | null, country: string | null) => void;
    onClose: () => void;
    onOpenChange: () => void;
}

const AddPropertyOwnerModal = ({ companyId, property, isPending, isOpen, onAdd, onClose, onOpenChange }: Props) => {

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            firstName: { value: string };
            lastName: { value: string };
            telephone: { value: string | null };
            email: { value: string | null };
            ownedParts: { value: number | null };
            addressSameAsProperty?: { checked: boolean },
            street: { value: string | null };
            city: { value: string | null };
            zipCode: { value: string | null };
            country: { value: string | null };
        };
        const firstName = target.firstName.value;
        const lastName = target.lastName.value;
        const telephone = target.telephone.value;
        const email = target.email.value;
        const ownedParts = target.ownedParts.value;
        const addressSameAsProperty = target.addressSameAsProperty?.checked;

        let street, city, zipCode, country: string | null = null;
        if (addressSameAsProperty) {
            street = property.address?.street || null;
            city = property.address?.city || null;
            zipCode = property.address?.zipCode || null;
            country = property.address?.country || null;
        } else {
            street = target.street.value;
            city = target.city.value;
            zipCode = target.zipCode.value;
            country = target.country.value;
        }

        onAdd(companyId, property.id, firstName, lastName, telephone, email, ownedParts, street, city, zipCode, country);
    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={onClose}
            placement="top-center"
            size='2xl'
        >
            <ModalContent >
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 pb-3">Add Owner</ModalHeader>
                        <ModalBody className='gap-7 pb-5'>
                            <AddPropertyOwnerForm
                                onSubmit={handleFormSubmit}
                                isPending={isPending}
                                onClose={onClose}
                            />
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default AddPropertyOwnerModal