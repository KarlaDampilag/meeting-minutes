'use client'
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, Button, cn } from "@nextui-org/react";
import { toast } from 'react-toastify';

interface Props {
    isMutationPending: boolean;
    isOpen: boolean;
    onDelete: () => void;
    onClose: () => void;
    onOpenChange: () => void;
}

const DeletePropertyOwnerModal = ({ isMutationPending, isOpen, onDelete, onClose, onOpenChange }: Props) => {
    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        toast.info("Please wait...");
        onDelete();
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
                        <ModalHeader className="flex flex-col gap-1 pb-1">Delete Property Owner</ModalHeader>
                        <ModalBody className='gap-7 pb-5'>
                            <form onSubmit={handleFormSubmit} className='flex flex-col gap-5'>
                                <p className='mb-0'>Are you sure? Deleting a property owner is irreversible!</p>
                                <div className='flex justify-end items-center gap-2'>
                                    <Button color="default" variant="flat" onPress={onClose} radius='sm'>
                                        Close
                                    </Button>
                                    <Button type='submit' color={isMutationPending ? "default" : "danger"} isLoading={isMutationPending} isDisabled={isMutationPending} className={cn({ "cursor-not-allowed": isMutationPending })} radius='sm'>
                                        Delete
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

export default DeletePropertyOwnerModal