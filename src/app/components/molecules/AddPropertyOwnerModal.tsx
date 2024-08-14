'use client'
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, Button, cn, Input } from "@nextui-org/react";

import Text from '../atoms/Text';

interface Props {
    companyId: string;
    propertyId: string;
    isPending: boolean;
    isOpen: boolean;
    onAdd: (companyId: string, propertyId: string, firstName: string, lastName: string, telephone: string | null, email: string | null, ownershipPercentage: number | null) => void;
    onClose: () => void;
    onOpenChange: () => void;
}

const AddPropertyOwnerModal = ({ companyId, propertyId, isPending, isOpen, onAdd, onClose, onOpenChange }: Props) => {
    const handleModalClose = () => {
        onClose();
    }

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
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
        onAdd(companyId, propertyId, firstName, lastName, telephone, email, ownershipPercentage);
    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={handleModalClose}
            placement="top-center"
            size='2xl'
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 pb-3">Add Owner</ModalHeader>
                        <ModalBody className='gap-7 pb-5'>
                            <form onSubmit={handleFormSubmit} className='flex flex-col gap-6'>
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
                                />
                                <Input variant='bordered'
                                    label={<Text localeParent='User' localeKey='Email address' />}
                                    placeholder="user@company.com"
                                    type='email'
                                    name='email'
                                    // isRequired
                                    labelPlacement='outside'
                                    radius='sm'
                                    classNames={{ inputWrapper: 'border border-gray-300' }}
                                />
                                <Input
                                    variant='bordered'
                                    label={<Text localeParent='Company Settings' localeKey='Telephone number' />}
                                    placeholder="Enter telephone"
                                    type='text'
                                    name='telephone'
                                    // isRequired
                                    labelPlacement='outside'
                                    radius='sm'
                                    classNames={{ inputWrapper: 'border border-gray-300' }}
                                />
                                <Input
                                    variant='bordered'
                                    label="Ownership percentage"
                                    placeholder="Enter ownership percentage"
                                    type='number'
                                    min="1"
                                    max="100"
                                    name='ownershipPercentage'
                                    // isRequired
                                    labelPlacement='outside'
                                    radius='sm'
                                    classNames={{ inputWrapper: 'border border-gray-300' }}
                                    endContent={'%'}
                                />
                                <div className='flex justify-start items-center gap-2'>
                                    <Button color="default" variant="flat" onPress={onClose} radius='sm'>
                                        Close
                                    </Button>
                                    <Button type='submit' color={isPending ? "default" : "primary"} isLoading={isPending} isDisabled={isPending} className={cn({ "cursor-not-allowed": isPending })} radius='sm'>
                                        Add Owner
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

export default AddPropertyOwnerModal