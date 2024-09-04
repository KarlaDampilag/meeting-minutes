'use client'
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, Button, cn, Input } from "@nextui-org/react";
import { toast } from 'react-toastify';

import { useGetSuppliers } from '@/rq-hooks/useGetSuppliers';
import { useUpdateSupplier } from '@/rq-hooks/useUpdateSupplier';
import { Supplier } from '@/db/schema';

import SupplierServiceDropdown from './SupplierServiceDropdown';
import Text from '../atoms/Text';

interface Props {
    companyId: string;
    supplier: Supplier;
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
}

const UpdateSupplierModal = ({ companyId, supplier, isOpen, onClose, onOpenChange }: Props) => {
    const { mutate, isPending, isSuccess, isError, reset } = useUpdateSupplier({ supplierId: supplier.id });
    const { refetch } = useGetSuppliers({ companyId, propertyId: supplier.property_id });
    const [service, setService] = React.useState<string>(supplier.service);

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        toast.info(<Text localeParent='Common' localeKey='Please wait' />);
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
        mutate({ companyId, propertyId: supplier.property_id, supplierId: supplier.id, name, service, email, telephone });
    }

    if (isSuccess) {
        toast.success(<Text localeParent='Common' localeKey='Successfully updated' />, { toastId: "update-supplier" });
        reset();
        refetch();
        onClose();
    }

    if (isError) {
        toast.error("Something went wrong, please contact support", { toastId: "update-supplier-error" });
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
                        <ModalHeader className="flex flex-col gap-1 pb-1">Update Supplier</ModalHeader>
                        <ModalBody className='gap-7 pb-5'>
                            <form onSubmit={handleFormSubmit} className='flex flex-col gap-5'>
                                <SupplierServiceDropdown
                                    value={service}
                                    onChange={setService}
                                    labelPlacement='outside'
                                    className=''
                                />
                                <Input
                                    variant='bordered'
                                    label={<Text localeParent='User' localeKey='First name' />}
                                    placeholder="Enter first name"
                                    type='text'
                                    name='name'
                                    isRequired
                                    labelPlacement='outside'
                                    radius='sm'
                                    classNames={{ inputWrapper: 'border border-gray-300' }}
                                    defaultValue={supplier.name}
                                />
                                <Input variant='bordered'
                                    label={<Text localeParent='User' localeKey='Email address' />}
                                    placeholder="user@company.com"
                                    type='email'
                                    name='email'
                                    labelPlacement='outside'
                                    radius='sm'
                                    classNames={{ inputWrapper: 'border border-gray-300' }}
                                    defaultValue={supplier.email || undefined}
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
                                    defaultValue={supplier.telephone || undefined}
                                />
                                <div className='flex justify-end items-center gap-2'>
                                    <Button color="default" variant="flat" onPress={onClose} radius='sm'>
                                        Close
                                    </Button>
                                    <Button type='submit' color={isPending ? "default" : "primary"} isLoading={isPending} isDisabled={isPending} className={cn({ "cursor-not-allowed": isPending })} radius='sm'>
                                        Update
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

export default UpdateSupplierModal