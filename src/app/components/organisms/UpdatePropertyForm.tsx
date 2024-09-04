
import React from 'react'
import { Button, cn, Input, Tooltip } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { RxQuestionMarkCircled } from 'react-icons/rx';

import PropertyManagerDropdown from '../molecules/PropertyManagerDropdown';
import Text from '../atoms/Text';

import { PropertyWithManager } from '@/db/schema';
import { useUpdateProperty } from '@/rq-hooks/useUpdateProperty';
import { useGetProperty } from '@/rq-hooks/useGetProperty';
import { onKeyDownPreventPeriodInput } from '@/utils/utils';

const UpdatePropertyForm = ({ companyId, property }: { companyId: string, property: PropertyWithManager }) => {
    const { mutate, isPending, isSuccess, isError, reset } = useUpdateProperty({ propertyId: property.id });
    const { refetch } = useGetProperty({ propertyId: property.id, companyId });
    const [propertyManagerId, setPropertyManagerId] = React.useState<string>(property.property_manager_id);

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
        mutate({ companyId, propertyId: property.id, propertyName, street, city, zipCode, country, propertyManagerId, totalOwnershipShares });
    }

    if (isSuccess) {
        toast.success("Successfully updated", { toastId: "update-property" });
        reset();
        refetch();
    }

    if (isError) {
        toast.error("Something went wrong, please contact support", { toastId: "update-property-error" });
    }

    return (
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
                defaultValue={property.name}
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
                defaultValue={property.address?.street}
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
                defaultValue={property.address?.city}
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
                defaultValue={property.address?.zipCode}
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
                defaultValue={property.address?.country}
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
                    defaultValue={property.total_ownership_shares?.toString()}
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
                <Button type='submit' color={isPending ? "default" : "primary"} isLoading={isPending} isDisabled={isPending} className={cn({ "cursor-not-allowed": isPending })} radius='sm'>
                    <Text localeParent='Properties' localeKey='Update Property' />
                </Button>
            </div>
        </form>
    )
}

export default UpdatePropertyForm