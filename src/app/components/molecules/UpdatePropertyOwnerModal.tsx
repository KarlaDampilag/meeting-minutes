'use client'
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { toast } from 'react-toastify';

import { useUpdatePropertyOwner } from '@/rq-hooks/useUpdatePropertyOwner';
import { useGetPropertyOwners } from '@/rq-hooks/useGetPropertyOwners';
import { Owner, Property } from '@/db/schema';

import UpdatePropertyOwnerForm from './UpdatePropertyOwnerForm';

interface Props {
    companyId: string;
    property: Property;
    propertyOwner: Owner;
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
}

const UpdatePropertyOwnerModal = ({ companyId, property, propertyOwner, isOpen, onClose, onOpenChange }: Props) => {
    const { mutate, isPending, isSuccess, isError, reset } = useUpdatePropertyOwner({ propertyOwnerId: propertyOwner.id });
    const { refetch } = useGetPropertyOwners({ companyId, propertyId: propertyOwner.property_id });

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        toast.info("Please wait...");
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

        mutate({ companyId, propertyId: propertyOwner.property_id, propertyOwnerId: propertyOwner.id, firstName, lastName, email, telephone, ownedParts, street, city, zipCode, country });
    }

    if (isSuccess) {
        toast.success("Successfully updated", { toastId: "update-property-owner" });
        reset();
        refetch();
        onClose();
    }

    if (isError) {
        toast.error("Something went wrong, please contact support", { toastId: "update-property-owner-error" });
    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={onClose}
            placement="top-center"
            size='2xl'
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 pb-1">Update Owner</ModalHeader>
                        <ModalBody className='gap-7 pb-5'>
                            <UpdatePropertyOwnerForm
                                property={property}
                                propertyOwner={propertyOwner}
                                isPending={isPending}
                                onSubmit={handleFormSubmit}
                                onClose={onClose}
                            />
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default UpdatePropertyOwnerModal