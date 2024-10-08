'use client'
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, Button, cn, Input, Tooltip } from "@nextui-org/react";
import { RxQuestionMarkCircled } from "react-icons/rx";


import Text from '../atoms/Text';
import PropertyManagerDropdown from './PropertyManagerDropdown';
import { onKeyDownPreventPeriodInput } from '@/utils/utils';

interface Props {
    companyId: string;
    isPending: boolean;
    isOpen: boolean;
    onAddProperty: (companyId: string, propertyName: string, street: string | null, city: string | null, zipCode: string | null, country: string | null, propertyManagerId: string, totalOwnershipShares: string | null) => void;
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
            totalOwnershipShares: { value: string | null };
        };
        const propertyName = target.propertyName.value;
        const street = target.street.value;
        const city = target.city.value;
        const zipCode = target.zipCode.value;
        const country = target.country.value;
        const propertyManagerId = target.propertyManagerId.value;
        const totalOwnershipShares = target.totalOwnershipShares.value;
        onAddProperty(companyId, propertyName, street, city, zipCode, country, propertyManagerId, totalOwnershipShares);
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
                        <ModalHeader className="flex flex-col gap-1 pb-3"><Text localeParent='Properties' localeKey='Add Property' /></ModalHeader>
                        <ModalBody className='gap-7 pb-5'>
                            <form onSubmit={handleFormSubmit} className='flex flex-col gap-6'>
                                <Input
                                    variant='bordered'
                                    label={<Text localeParent='Properties' localeKey='Property name' />}
                                    placeholder="XYZ Liegenschaft"
                                    type='text'
                                    name='propertyName'
                                    isRequired
                                    labelPlacement='outside'
                                    radius='sm'
                                    classNames={{ inputWrapper: 'border border-gray-300' }}
                                    validationBehavior='native'
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
                                    validationBehavior='native'
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
                                    validationBehavior='native'
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
                                <PropertyManagerDropdown companyId={companyId} selectedUserId={propertyManagerId} onChange={setPropertyManagerId} labelPlacement='outside' className='' customPlaceholder={<Text localeParent="Common" localeKey="Choose" />} />
                                <div className='flex items-center justify-start gap-2'>
                                    <Input
                                        variant='bordered'
                                        label={<Text localeParent='Properties' localeKey='Total ownership shares' />}
                                        placeholder="900"
                                        type='number'
                                        name='totalOwnershipShares'
                                        isRequired
                                        labelPlacement='outside'
                                        radius='sm'
                                        classNames={{ base: 'max-w-56', inputWrapper: 'border border-gray-300' }}
                                        validationBehavior='native'
                                        onKeyDown={onKeyDownPreventPeriodInput}
                                    />
                                    <Tooltip showArrow={true} content="The total number of ownership parts for this property. This represents the sum of all shares of owners." radius='sm'>
                                        <div className='flex items-center justify-center mt-6'>
                                            <RxQuestionMarkCircled className='text-gray-700 cursor-pointer' />
                                        </div>
                                    </Tooltip>
                                </div>
                                <div className='flex justify-start items-center gap-2'>
                                    <Button color="default" variant="flat" onPress={onClose} radius='sm'>
                                        <Text localeParent="Common" localeKey="Close" />
                                    </Button>
                                    <Button type='submit' color={isPending ? "default" : "primary"} isLoading={isPending} isDisabled={isPending} className={cn({ "cursor-not-allowed": isPending })} radius='sm'>
                                        <Text localeParent="Properties" localeKey="Add Property button" />
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