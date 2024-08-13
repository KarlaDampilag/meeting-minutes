'use client'
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, Button, cn, Input } from "@nextui-org/react";

import Text from '../atoms/Text';
import PropertyManagerDropdown from './PropertyManagerDropdown';

interface Props {
    companyId: string;
    isPending: boolean;
    isOpen: boolean;
    onAddProperty: (companyId: string, propertyName: string, street: string | null, city: string | null, zipCode: string | null, country: string | null, propertyManagerId: string) => void;
    onClose: () => void;
    onOpenChange: () => void;
}

const AddPropertyModal = ({ companyId, isPending, isOpen, onAddProperty, onClose, onOpenChange }: Props) => {
    const [propertyManagerId, setPropertyManagerId] = React.useState<string>();

    const handleModalClose = () => {
        setPropertyManagerId(undefined);
        onClose();
    }

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            propertyName: { value: string };
            street: { value: string | null };
            city: { value: string | null };
            zipCode: { value: string | null };
            country: { value: string | null };
            propertyManagerId: { value: string };
        };
        const propertyName = target.propertyName.value;
        const street = target.street.value;
        const city = target.city.value;
        const zipCode = target.zipCode.value;
        const country = target.country.value;
        const propertyManagerId = target.propertyManagerId.value;
        // toast.info("Please wait...");
        onAddProperty(companyId, propertyName, street, city, zipCode, country, propertyManagerId);
        // onClose();
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
                        <ModalHeader className="flex flex-col gap-1 pb-3">Add Property</ModalHeader>
                        <ModalBody className='gap-7 pb-5'>
                            <form onSubmit={handleFormSubmit} className='flex flex-col gap-6'>
                                <Input
                                    variant='bordered'
                                    label="Property name"
                                    placeholder="Enter property name"
                                    type='text'
                                    name='propertyName'
                                    isRequired
                                    labelPlacement='outside'
                                    radius='sm'
                                    classNames={{ inputWrapper: 'border border-gray-300' }}
                                />
                                <Input variant='bordered'
                                    label={<Text localeParent='Company Settings' localeKey='Street' />}
                                    placeholder="Grossmatt 92"
                                    type='text'
                                    name='street'
                                    isRequired
                                    labelPlacement='outside'
                                    radius='sm'
                                    classNames={{ inputWrapper: 'border border-gray-300' }}
                                />
                                <Input
                                    variant='bordered'
                                    label={<Text localeParent='Company Settings' localeKey='City' />}
                                    placeholder="Besazio"
                                    type='text'
                                    name='city'
                                    isRequired
                                    labelPlacement='outside'
                                    radius='sm'
                                    classNames={{ inputWrapper: 'border border-gray-300' }}
                                />
                                <Input
                                    variant='bordered'
                                    label={<Text localeParent='Company Settings' localeKey='Zip code' />}
                                    placeholder="6863"
                                    type='text'
                                    name='zipCode'
                                    isRequired
                                    labelPlacement='outside'
                                    radius='sm'
                                    classNames={{ inputWrapper: 'border border-gray-300' }}
                                    validationBehavior='native'
                                />
                                <Input
                                    variant='bordered'
                                    label={<Text localeParent='Company Settings' localeKey='Country' />}
                                    placeholder="Switzerland"
                                    type='text'
                                    name='country'
                                    isRequired
                                    labelPlacement='outside'
                                    radius='sm'
                                    classNames={{ inputWrapper: 'border border-gray-300' }}
                                    validationBehavior='native'
                                />
                                <PropertyManagerDropdown companyId={companyId} selectedUserId={propertyManagerId} onChange={setPropertyManagerId} labelPlacement='outside' className='' />
                                <div className='flex justify-end items-center gap-2'>
                                    <Button color="default" variant="flat" onPress={onClose} radius='sm'>
                                        Close
                                    </Button>
                                    <Button type='submit' color={isPending ? "default" : "primary"} isLoading={isPending} isDisabled={isPending} className={cn({ "cursor-not-allowed": isPending })} radius='sm'>
                                        Add Property
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

export default AddPropertyModal