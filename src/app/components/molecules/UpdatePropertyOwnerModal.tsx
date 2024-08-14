'use client'
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, Button, cn, User as UserComponent, Input } from "@nextui-org/react";
import { toast } from 'react-toastify';

import { useUpdatePropertyOwner } from '@/rq-hooks/useUpdatePropertyOwner';
import Text from '../atoms/Text';
import { useGetPropertyOwners } from '@/rq-hooks/useGetPropertyOwners';
import { Owner } from '@/db/schema';

interface Props {
    companyId: string;
    propertyOwner: Owner;
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
}

const UpdatePropertyOwnerModal = ({ companyId, propertyOwner, isOpen, onClose, onOpenChange }: Props) => {
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
            ownershipPercentage: { value: number | null };
        };
        const firstName = target.firstName.value;
        const lastName = target.lastName.value;
        const telephone = target.telephone.value;
        const email = target.email.value;
        const ownershipPercentage = target.ownershipPercentage.value;
        mutate({ companyId, propertyId: propertyOwner.property_id, propertyOwnerId: propertyOwner.id, firstName, lastName, email, telephone, ownershipPercentage });
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
                            <form onSubmit={handleFormSubmit} className='flex flex-col gap-5'>
                                <Input
                                    variant='bordered'
                                    label={<Text localeParent='User' localeKey='First name' />}
                                    placeholder="Enter first name"
                                    type='text'
                                    name='firstName'
                                    isRequired
                                    labelPlacement='outside'
                                    radius='sm'
                                    classNames={{ inputWrapper: 'border border-gray-300' }}
                                    defaultValue={propertyOwner.first_name}
                                />
                                <Input
                                    variant='bordered'
                                    label={<Text localeParent='User' localeKey='Last name' />}
                                    placeholder="Enter last name"
                                    type='text'
                                    name='lastName'
                                    isRequired
                                    labelPlacement='outside'
                                    radius='sm'
                                    classNames={{ inputWrapper: 'border border-gray-300' }}
                                    defaultValue={propertyOwner.last_name}
                                />
                                <Input variant='bordered'
                                    label={<Text localeParent='User' localeKey='Email address' />}
                                    placeholder="user@company.com"
                                    type='email'
                                    name='email'
                                    labelPlacement='outside'
                                    radius='sm'
                                    classNames={{ inputWrapper: 'border border-gray-300' }}
                                    defaultValue={propertyOwner.email || undefined}
                                />
                                <Input
                                    variant='bordered'
                                    label={<Text localeParent='Company Settings' localeKey='Telephone number' />}
                                    placeholder="Enter telephone"
                                    type='text'
                                    name='telephone'
                                    labelPlacement='outside'
                                    radius='sm'
                                    classNames={{ inputWrapper: 'border border-gray-300' }}
                                    defaultValue={propertyOwner.telephone || undefined}
                                />
                                <Input
                                    variant='bordered'
                                    label="Ownership percentage"
                                    placeholder="Enter ownership percentage"
                                    type='number'
                                    min="1"
                                    max="100"
                                    name='ownershipPercentage'
                                    labelPlacement='outside'
                                    radius='sm'
                                    classNames={{ inputWrapper: 'border border-gray-300' }}
                                    endContent={'%'}
                                    defaultValue={propertyOwner.ownership_share || undefined}
                                />
                                <div className='flex justify-end items-center gap-2'>
                                    <Button color="default" variant="flat" onPress={onClose} radius='sm'>
                                        Close
                                    </Button>
                                    <Button type='submit' color={isPending ? "default" : "primary"} isLoading={isPending} isDisabled={isPending} className={cn({ "cursor-not-allowed": isPending })} radius='sm'>
                                        Update
                                    </Button>
                                </div>
                            </form>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default UpdatePropertyOwnerModal