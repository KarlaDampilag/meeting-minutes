'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import { Button, Checkbox, Input } from '@nextui-org/react'
import { ImageListType } from 'react-images-uploading';

import { UserWithCompany } from '@/db/schema'
import ImageInput from '@/app/components/atoms/ImageInput';
import Text from '@/app/components/atoms/Text';
import Image from 'next/image';

interface Props {
    userWithCompany: UserWithCompany;
    onSubmit: (userWithCompany: UserWithCompany, formData: FormData, billingSameAsAddress: boolean) => Promise<boolean>;
}

const CompanyDetailsForm = ({ userWithCompany, onSubmit }: Props) => {
    const router = useRouter();

    const isAddressSameAsProperty =
        userWithCompany.company?.address?.street == userWithCompany.company?.billing_address?.street &&
        userWithCompany.company?.address?.city == userWithCompany.company?.billing_address?.city &&
        userWithCompany.company?.address?.zipCode == userWithCompany.company?.billing_address?.zipCode &&
        userWithCompany.company?.address?.country == userWithCompany.company?.billing_address?.country;

    const [isLoading, setIsLoading] = React.useState(false);
    const [billingSameAsAddress, setBillingSameAsAddress] = React.useState(isAddressSameAsProperty);
    const [images, setImages] = React.useState<ImageListType>(!!userWithCompany.company?.logo ? [{ dataURL: userWithCompany.company.logo }] : []);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        try {
            setIsLoading(true);
            event.preventDefault();

            const formData = new FormData(event.currentTarget);
            if (!!images[0]?.file) {
                formData.append("logo", images[0].file as File);
            }

            const success = await onSubmit(userWithCompany, formData, billingSameAsAddress);
            if (success) {
                toast.success("Updated successfully");
                setTimeout(() => {
                    router.refresh();
                }, 2000);
            } else {
                toast.error("Something went wrong, please contact support")
            }
        } catch (error) {
            console.error('Failed to create or update company details');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
            <Input
                variant='bordered'
                label={<Text localeParent='Company Settings' localeKey='Company name' />}
                placeholder="Acme Inc."
                type='text'
                name='companyName'
                isRequired
                labelPlacement='outside'
                radius='sm'
                classNames={{ inputWrapper: 'border border-gray-300' }}
                validationBehavior='native'
                defaultValue={userWithCompany?.company?.name}
            />

            <Input
                variant='bordered'
                label={<Text localeParent='Company Settings' localeKey='Street' />}
                placeholder="Grossmatt 92"
                type='text'
                name='street'
                isRequired
                labelPlacement='outside'
                radius='sm'
                classNames={{ inputWrapper: 'border border-gray-300' }}
                validationBehavior='native'
                defaultValue={userWithCompany?.company?.address?.street}
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
                defaultValue={userWithCompany?.company?.address?.city}
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
                defaultValue={userWithCompany?.company?.address?.zipCode}
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
                defaultValue={userWithCompany?.company?.address?.country}
            />
            <Input
                variant='bordered'
                label={<Text localeParent='Company Settings' localeKey='Telephone number' />}
                placeholder="091 233 20 88"
                type='text'
                name='telephone'
                isRequired
                labelPlacement='outside'
                radius='sm'
                classNames={{ inputWrapper: 'border border-gray-300' }}
                validationBehavior='native'
                defaultValue={userWithCompany?.company?.address?.telephone}
            />
            <div>
                <label htmlFor='image' className='block mb-2 text-sm'>Logo</label>
                <ImageInput value={images} onChange={setImages} />
            </div>

            <hr className='my-3' />

            <h2 className='mb-0'><Text localeParent='Company Settings' localeKey='Billing Details' /></h2>

            <Checkbox isSelected={billingSameAsAddress} onValueChange={setBillingSameAsAddress}><Text localeParent='Company Settings' localeKey='Same as company address' /></Checkbox>

            {!billingSameAsAddress && (
                <>
                    <Input variant='bordered'
                        label={<Text localeParent='Company Settings' localeKey='Street' />}
                        placeholder="Grossmatt 92"
                        type='text'
                        name='billing-street'
                        isRequired
                        labelPlacement='outside'
                        radius='sm'
                        classNames={{ inputWrapper: 'border border-gray-300' }}
                        defaultValue={userWithCompany?.company?.billing_address?.street}
                    />
                    <Input
                        variant='bordered'
                        label={<Text localeParent='Company Settings' localeKey='City' />}
                        placeholder="Besazio"
                        type='text'
                        name='billing-city'
                        isRequired
                        labelPlacement='outside'
                        radius='sm'
                        classNames={{ inputWrapper: 'border border-gray-300' }}
                        defaultValue={userWithCompany?.company?.billing_address?.city}
                    />
                    <Input
                        variant='bordered'
                        label={<Text localeParent='Company Settings' localeKey='Zip code' />}
                        placeholder="6863"
                        type='text'
                        name='billing-zipCode'
                        isRequired
                        labelPlacement='outside'
                        radius='sm'
                        classNames={{ inputWrapper: 'border border-gray-300' }}
                        defaultValue={userWithCompany?.company?.billing_address?.zipCode}
                    />
                    <Input
                        variant='bordered'
                        label={<Text localeParent='Company Settings' localeKey='Country' />}
                        placeholder="Switzerland"
                        type='text'
                        name='billing-country'
                        isRequired
                        labelPlacement='outside'
                        radius='sm'
                        classNames={{ inputWrapper: 'border border-gray-300' }}
                        defaultValue={userWithCompany?.company?.billing_address?.country}
                    />
                    <Input
                        variant='bordered'
                        label={<Text localeParent='Company Settings' localeKey='Telephone number' />}
                        placeholder="091 233 20 88"
                        type='text'
                        name='billing-telephone'
                        isRequired
                        labelPlacement='outside'
                        radius='sm'
                        classNames={{ inputWrapper: 'border border-gray-300' }}
                        defaultValue={userWithCompany?.company?.billing_address?.telephone}
                    />
                </>
            )}

            <Button color='primary' type='submit' className='h-12 text-base mt-2 mb-4' radius='sm' isLoading={isLoading} isDisabled={isLoading}><Text localeParent='Common' localeKey='Submit' /></Button>
        </form>
    )
}

export default CompanyDetailsForm