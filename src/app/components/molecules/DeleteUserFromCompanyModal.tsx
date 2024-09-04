'use client'
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, Button, cn } from "@nextui-org/react";
import { toast } from 'react-toastify';
import Text from '../atoms/Text';

interface Props {
    isMutationPending: boolean;
    isOpen: boolean;
    onDeleteUserFromCompany: () => void;
    onClose: () => void;
    onOpenChange: () => void;
}

const DeleteUserFromCompanyModal = ({ isMutationPending, isOpen, onDeleteUserFromCompany, onClose, onOpenChange }: Props) => {

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        toast.info(<Text localeParent='Common' localeKey='Please wait' />);
        onDeleteUserFromCompany();
        onClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={onClose}
            placement="top-center"
            size='xs'
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 pb-1">Delete User</ModalHeader>
                        <ModalBody className='gap-7 pb-5'>
                            <form onSubmit={handleFormSubmit} className='flex flex-col gap-5'>
                                <p className='mb-0'><Text localeParent="Team" localeKey="deleteUserConfirmation" /></p>
                                <div className='flex justify-end items-center gap-2'>
                                    <Button color="default" variant="flat" onPress={onClose} radius='sm'>
                                        <Text localeParent="Common" localeKey="Close" />
                                    </Button>
                                    <Button type='submit' color={isMutationPending ? "default" : "danger"} isLoading={isMutationPending} isDisabled={isMutationPending} className={cn({ "cursor-not-allowed": isMutationPending })} radius='sm'>
                                    <Text localeParent="Common" localeKey="Delete" />
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

export default DeleteUserFromCompanyModal