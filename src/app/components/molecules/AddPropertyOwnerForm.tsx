import React from 'react'
import { Button, cn, Input, Checkbox } from "@nextui-org/react";

import Text from '../atoms/Text';
import { onKeyDownPreventPeriodInput } from '@/utils/utils';

interface Props {
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    isPending: boolean;
    onClose: () => void;
}

const AddPropertyOwnerForm = ({ onSubmit, isPending, onClose }: Props) => {
    const [addressSameAsProperty, setAddressSameAsProperty] = React.useState(true);

    const handleCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setAddressSameAsProperty(e.target.checked)
    }

    return (
        <form onSubmit={onSubmit} className='flex flex-col gap-6'>
            <Input
                autoFocus
                variant='bordered'
                label={<Text localeParent='User' localeKey='First name' />}
                placeholder="Enter first name"
                type='text'
                name='firstName'
                isRequired
                labelPlacement='outside'
                radius='sm'
                classNames={{ inputWrapper: 'border border-gray-300' }}
                validationBehavior='native'
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
                validationBehavior='native'
            />
            <Input variant='bordered'
                label={<Text localeParent='User' localeKey='Email address' />}
                placeholder="user@company.com"
                type='email'
                name='email'
                isRequired
                labelPlacement='outside'
                radius='sm'
                classNames={{ inputWrapper: 'border border-gray-300' }}
                validationBehavior='native'
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
                validationBehavior='native'
            />
            <Input
                variant='bordered'
                label={<Text localeParent='Owners' localeKey='Owned parts' />}
                placeholder="Enter owned parts"
                type='number'
                min="1"
                name="ownedParts"
                // isRequired
                labelPlacement='outside'
                radius='sm'
                classNames={{ inputWrapper: 'border border-gray-300' }}
                onKeyDown={onKeyDownPreventPeriodInput}
                validationBehavior='native'
            />

            <div>
                <hr className='mt-3 mb-7' />
                <p className='mb-1 font-medium text-sm'>Address</p>
                <Checkbox isSelected={addressSameAsProperty} onChange={handleCheckboxChange} size='sm' className='font-normal' name='addressSameAsProperty'><Text localeParent='Properties' localeKey='Same as property address' /></Checkbox>
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
                    // defaultValue={userWithCompany?.company?.address?.street}
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
                    // defaultValue={userWithCompany?.company?.address?.city}
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
                    // defaultValue={userWithCompany?.company?.address?.zipCode}
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
                    // defaultValue={userWithCompany?.company?.address?.country}
                    />
                </>
            )}

            <div className='flex justify-start items-center gap-2 mt-2'>
                <Button color="default" variant="flat" onPress={onClose} radius='sm'>
                <Text localeParent='Common' localeKey='Close' />
                </Button>
                <Button type='submit' color={isPending ? "default" : "primary"} isLoading={isPending} isDisabled={isPending} className={cn({ "cursor-not-allowed": isPending })} radius='sm'>
                    <Text localeParent='Owners' localeKey='Add Owner' />
                </Button>
            </div>
        </form>
    )
}

export default AddPropertyOwnerForm