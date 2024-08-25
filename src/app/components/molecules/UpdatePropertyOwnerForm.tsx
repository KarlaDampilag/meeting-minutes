import React from 'react'
import { Button, cn, Input, Checkbox } from "@nextui-org/react";

import Text from '../atoms/Text';
import { Owner, Property } from '@/db/schema';

interface Props {
    property: Property;
    propertyOwner: Owner;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    isPending: boolean;
    onClose: () => void;
}

const UpdatePropertyOwnerForm = ({ property, propertyOwner, onSubmit, isPending, onClose }: Props) => {
    const isAddressSameAsProperty =
        property.address?.street == propertyOwner.address?.street &&
        property.address?.city == propertyOwner.address?.city &&
        property.address?.zipCode == propertyOwner.address?.zipCode &&
        property.address?.country == propertyOwner.address?.country;
    const [addressSameAsProperty, setAddressSameAsProperty] = React.useState<boolean>(isAddressSameAsProperty);

    const handleCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setAddressSameAsProperty(e.target.checked)
    }

    return (
        <form onSubmit={onSubmit} className='flex flex-col gap-5'>
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

            <div>
                <hr className='mt-3 mb-7' />
                <p className='mb-1 font-medium text-sm'>Address</p>
                <Checkbox isSelected={addressSameAsProperty} onChange={handleCheckboxChange} size='sm' className='font-normal' name='addressSameAsProperty'>Same as property address</Checkbox>
            </div>

            {!addressSameAsProperty && (
                <>
                    <Input
                        variant='bordered'
                        label={<Text localeParent='Company Settings' localeKey='Street' />}
                        placeholder="Grossmatt 92"
                        type='text'
                        name='street'
                        labelPlacement='outside'
                        radius='sm'
                        classNames={{ inputWrapper: 'border border-gray-300' }}
                        validationBehavior='native'
                        defaultValue={propertyOwner?.address?.street}
                    />
                    <Input
                        variant='bordered'
                        label={<Text localeParent='Company Settings' localeKey='City' />}
                        placeholder="Besazio"
                        type='text'
                        name='city'
                        labelPlacement='outside'
                        radius='sm'
                        classNames={{ inputWrapper: 'border border-gray-300' }}
                        validationBehavior='native'
                        defaultValue={propertyOwner?.address?.city}
                    />
                    <Input
                        variant='bordered'
                        label={<Text localeParent='Company Settings' localeKey='Zip code' />}
                        placeholder="6863"
                        type='text'
                        name='zipCode'
                        labelPlacement='outside'
                        radius='sm'
                        classNames={{ inputWrapper: 'border border-gray-300' }}
                        validationBehavior='native'
                        defaultValue={propertyOwner?.address?.zipCode}
                    />
                    <Input
                        variant='bordered'
                        label={<Text localeParent='Company Settings' localeKey='Country' />}
                        placeholder="Switzerland"
                        type='text'
                        name='country'
                        labelPlacement='outside'
                        radius='sm'
                        classNames={{ inputWrapper: 'border border-gray-300' }}
                        validationBehavior='native'
                        defaultValue={propertyOwner?.address?.country}
                    />
                </>
            )}

            <div className='flex justify-end items-center gap-2'>
                <Button color="default" variant="flat" onPress={onClose} radius='sm'>
                    Close
                </Button>
                <Button type='submit' color={isPending ? "default" : "primary"} isLoading={isPending} isDisabled={isPending} className={cn({ "cursor-not-allowed": isPending })} radius='sm'>
                    Update
                </Button>
            </div>
        </form>
    )
}

export default UpdatePropertyOwnerForm