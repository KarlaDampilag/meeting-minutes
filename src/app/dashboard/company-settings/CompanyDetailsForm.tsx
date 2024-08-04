'use client'
import { Button, Checkbox, Input } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const CompanyDetailsForm = ({ onSubmit }: { onSubmit: (formData: FormData, billingSameAsAddress: boolean) => Promise<void> }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);
    const [billingSameAsAddress, setBillingSameAsAddress] = React.useState(true);

    // FIXME if company exists, that should be the default value of the input fields.

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        try {
            setIsLoading(true);
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            await onSubmit(formData, billingSameAsAddress);
            setTimeout(() => {
                router.refresh();
            }, 2000);
        } catch (error) {
            console.error('Failed to create or update company details');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
            <Input variant='bordered' label="Company name" placeholder="Acme Inc." type='text' name='companyName' isRequired labelPlacement='outside' radius='sm' classNames={{ inputWrapper: 'border border-gray-300' }} validationBehavior='native' />

            <Input variant='bordered' label="Street" placeholder="Grossmatt 92" type='text' name='street' isRequired labelPlacement='outside' radius='sm' classNames={{ inputWrapper: 'border border-gray-300' }} validationBehavior='native' />
            <Input variant='bordered' label="City" placeholder="City:  Besazio" type='text' name='city' isRequired labelPlacement='outside' radius='sm' classNames={{ inputWrapper: 'border border-gray-300' }} validationBehavior='native' />
            <Input variant='bordered' label="State" placeholder="Bern" type='text' name='state' isRequired labelPlacement='outside' radius='sm' classNames={{ inputWrapper: 'border border-gray-300' }} validationBehavior='native' />
            <Input variant='bordered' label="Zip code" placeholder="6863" type='text' name='zipCode' isRequired labelPlacement='outside' radius='sm' classNames={{ inputWrapper: 'border border-gray-300' }} validationBehavior='native' />
            <Input variant='bordered' label="Country" placeholder="Switzerland" type='text' name='country' isRequired labelPlacement='outside' radius='sm' classNames={{ inputWrapper: 'border border-gray-300' }} validationBehavior='native' />
            <Input variant='bordered' label="Telephone number" placeholder="091 233 20 88" type='text' name='telephone' isRequired labelPlacement='outside' radius='sm' classNames={{ inputWrapper: 'border border-gray-300' }} validationBehavior='native' />

            <hr className='my-3' />

            <h2 className='mb-0'>Billing Details</h2>

            <Checkbox isSelected={billingSameAsAddress} onValueChange={setBillingSameAsAddress}>Same as company address</Checkbox>

            {!billingSameAsAddress && (
                <>
                    <Input variant='bordered' label="Street" placeholder="Grossmatt 92" type='text' name='billing-street' isRequired labelPlacement='outside' radius='sm' classNames={{ inputWrapper: 'border border-gray-300' }} />
                    <Input variant='bordered' label="City" placeholder="City:  Besazio" type='text' name='billing-city' isRequired labelPlacement='outside' radius='sm' classNames={{ inputWrapper: 'border border-gray-300' }} />
                    <Input variant='bordered' label="State" placeholder="Bern" type='text' name='billing-state' isRequired labelPlacement='outside' radius='sm' classNames={{ inputWrapper: 'border border-gray-300' }} />
                    <Input variant='bordered' label="Zip code" placeholder="6863" type='text' name='billing-zipCode' isRequired labelPlacement='outside' radius='sm' classNames={{ inputWrapper: 'border border-gray-300' }} />
                    <Input variant='bordered' label="Country" placeholder="Switzerland" type='text' name='billing-country' isRequired labelPlacement='outside' radius='sm' classNames={{ inputWrapper: 'border border-gray-300' }} />
                    <Input variant='bordered' label="Telephone number" placeholder="091 233 20 88" type='text' name='billing-telephone' isRequired labelPlacement='outside' radius='sm' classNames={{ inputWrapper: 'border border-gray-300' }} />
                </>
            )}

            <Button color='primary' type='submit' className='h-12 text-base mt-2 mb-4' radius='sm' isLoading={isLoading} isDisabled={isLoading}>Submit</Button>
        </form>
    )
}

export default CompanyDetailsForm