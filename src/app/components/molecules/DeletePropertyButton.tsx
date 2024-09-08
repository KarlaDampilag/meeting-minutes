import React from 'react'
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react"
import { BiSolidTrashAlt } from "react-icons/bi"

import Text from '../atoms/Text'
import { useDeleteProperty } from '@/rq-hooks/useDeleteProperty'
import { Property } from '@/db/schema'
import { toast } from 'react-toastify'

const DeletePropertyButton = ({ property }: { property: Property }) => {
    const { mutate, isPending, isSuccess, isError, reset } = useDeleteProperty({ propertyId: property.id });

    if (isSuccess) {
        toast.success(<Text localeParent='Common' localeKey='Successfully deleted' />, { toastId: "delete-property" });
        reset();
    }

    if (isError) {
        toast.error("Something went wrong, please contact support", { toastId: "delete-property-error" });
    }

    const handleDelete = () => {
        mutate({ propertyId: property.id, companyId: property.company_id });
    }

    return (
        <Popover placement="right" radius='sm'>
            <PopoverTrigger>
                <Button startContent={<BiSolidTrashAlt size={18} />} variant='light' size='sm' radius='sm' ><Text localeParent='Common' localeKey='Delete' /></Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="p-4">
                    <div className="mb-4">
                        <p className='font-bold'>Are you sure? </p>
                        <p className='text-sm'>This will delete all related meetings, minutes, owners, and suppliers. </p>
                        <p className='text-sm'>Deleting a property is irreversible.</p>
                    </div>
                    <Button color='danger' size='sm' isLoading={isPending} isDisabled={isPending} onClick={handleDelete}><Text localeParent='Common' localeKey='Delete' /></Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default DeletePropertyButton