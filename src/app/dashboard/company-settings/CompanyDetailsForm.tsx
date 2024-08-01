'use client'
import { Button, Checkbox, Input } from '@nextui-org/react'
import React from 'react'

const CompanyDetailsForm = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [billingSameAsAddress, setBillingSameAsAddress] = React.useState(true);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        setIsLoading(true);
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
    }

    return (
        <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
            <Input variant='bordered' label="Company name" placeholder="Acme Inc." type='text' name='companyName' isRequired labelPlacement='outside' radius='sm' classNames={{ inputWrapper: 'border border-gray-300' }} />

            <Input variant='bordered' label="Street" placeholder="Sonnenallee 33" type='text' name='street' isRequired labelPlacement='outside' radius='sm' classNames={{ inputWrapper: 'border border-gray-300' }} />
            <Input variant='bordered' label="City" placeholder="Augsburg" type='text' name='city' isRequired labelPlacement='outside' radius='sm' classNames={{ inputWrapper: 'border border-gray-300' }} />
            <Input variant='bordered' label="State" placeholder="Freistaat Bayern" type='text' name='state' isRequired labelPlacement='outside' radius='sm' classNames={{ inputWrapper: 'border border-gray-300' }} />
            <Input variant='bordered' label="Zip code" placeholder="86161" type='text' name='zipCode' isRequired labelPlacement='outside' radius='sm' classNames={{ inputWrapper: 'border border-gray-300' }} />
            <Input variant='bordered' label="Country" placeholder="Germany" type='text' name='country' isRequired labelPlacement='outside' radius='sm' classNames={{ inputWrapper: 'border border-gray-300' }} />
            <Input variant='bordered' label="Telephone number" placeholder="0821 85 13 43" type='text' name='telephone' isRequired labelPlacement='outside' radius='sm' classNames={{ inputWrapper: 'border border-gray-300' }} />

            <hr className='my-3' />

            <h2 className='mb-0'>Billing Details</h2>

            <Checkbox isSelected={billingSameAsAddress} onValueChange={setBillingSameAsAddress}>Same as company address</Checkbox>

            {!billingSameAsAddress && (
                <>
                    <Input variant='bordered' label="Street" placeholder="Sonnenallee 33" type='text' name='billing-street' isRequired labelPlacement='outside' radius='sm' classNames={{ inputWrapper: 'border border-gray-300' }} />
                    <Input variant='bordered' label="City" placeholder="Augsburg" type='text' name='billing-city' isRequired labelPlacement='outside' radius='sm' classNames={{ inputWrapper: 'border border-gray-300' }} />
                    <Input variant='bordered' label="State" placeholder="Freistaat Bayern" type='text' name='billing-state' isRequired labelPlacement='outside' radius='sm' classNames={{ inputWrapper: 'border border-gray-300' }} />
                    <Input variant='bordered' label="Zip code" placeholder="86161" type='text' name='billing-zipCode' isRequired labelPlacement='outside' radius='sm' classNames={{ inputWrapper: 'border border-gray-300' }} />
                    <Input variant='bordered' label="Country" placeholder="Germany" type='text' name='billing-country' isRequired labelPlacement='outside' radius='sm' classNames={{ inputWrapper: 'border border-gray-300' }} />
                    <Input variant='bordered' label="Telephone number" placeholder="0821 85 13 43" type='text' name='billing-telephone' isRequired labelPlacement='outside' radius='sm' classNames={{ inputWrapper: 'border border-gray-300' }} />
                </>
            )}

            <Button color='primary' type='submit' className='h-14 text-base mt-2 mb-4' radius='sm' isLoading={isLoading} isDisabled={isLoading}>Save</Button>
        </form>
    )
}

export default CompanyDetailsForm