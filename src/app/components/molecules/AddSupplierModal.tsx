'use client'
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, Button, cn, Input } from "@nextui-org/react";

import SupplierServiceDropdown from './SupplierServiceDropdown';
import Text from '../atoms/Text';

interface Props {
    companyId: string;
    propertyId: string;
    isPending: boolean;
    isOpen: boolean;
    onAdd: (companyId: string, propertyId: string, name: string, service: string, telephone: string | null, email: string | null) => void;
    onClose: () => void;
    onOpenChange: () => void;
}

const AddSupplierModal = ({ companyId, propertyId, isPending, isOpen, onAdd, onClose, onOpenChange }: Props) => {
    const [service, setService] = React.useState<string>();

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            name: { value: string };
            service: { value: string };
            telephone: { value: string | null };
            email: { value: string | null };
        };
        const name = target.name.value;
        const service = target.service.value;
        const telephone = target.telephone.value;
        const email = target.email.value;
        onAdd(companyId, propertyId, name, service, telephone, email);
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
                        <ModalHeader className="flex flex-col gap-1 pb-3">Add Supplier</ModalHeader>
                        <ModalBody className='gap-7 pb-5'>
                            <form onSubmit={handleFormSubmit} className='flex flex-col gap-6'>
                                <SupplierServiceDropdown
                                    value={service}
                                    onChange={setService}
                                    labelPlacement='outside'
                                    className=''
                                />
                                <Input
                                    variant='bordered'
                                    label={<Text localeParent='Company Settings' localeKey='Company name' />}
                                    placeholder="Acme Inc."
                                    type='text'
                                    name='name'
                                    isRequired
                                    labelPlacement='outside'
                                    radius='sm'
                                    classNames={{ inputWrapper: 'border border-gray-300' }}
                                    validationBehavior='native'
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
                                <div className='flex justify-start items-center gap-2'>
                                    <Button color="default" variant="flat" onPress={onClose} radius='sm'>
                                        Close
                                    </Button>
                                    <Button type='submit' color={isPending ? "default" : "primary"} isLoading={isPending} isDisabled={isPending} className={cn({ "cursor-not-allowed": isPending })} radius='sm'>
                                        Add Supplier
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

export default AddSupplierModal