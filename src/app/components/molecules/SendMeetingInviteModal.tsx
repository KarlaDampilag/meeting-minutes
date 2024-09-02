'use client'
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, Button, cn, Tooltip } from "@nextui-org/react";

import Text from '../atoms/Text';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
}

const SendMeetingInviteModal = ({ isOpen, onClose, onOpenChange }: Props) => {
    const isPending = false;

    const subject = encodeURIComponent("Your Subject Here");
    const body = encodeURIComponent("This is the body of the email.");
    const recipients = "example1@example.com,example2@example.com";

    const handleModalClose = () => {
        onClose();
    }

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={handleModalClose}
            placement="top-center"
            size='2xl'
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 pb-3">Send Meeting Invite</ModalHeader>
                        <ModalBody className='gap-7 pb-5'>
                            <form onSubmit={handleFormSubmit} className='flex flex-col gap-6'>
                                <div>
                                    <p>This will open your email client. Please ensure all meeting agenda details are correct.</p>
                                    <p>Tip: download the agenda as PDF and attach it to your email.</p>
                                    <hr className='my-4' />
                                    <p className='font-medium'>Send email to the following property owners:</p>
                                    <ol className='list-decimal ml-6 flex flex-col gap-1.5'>
                                        <li>Sabine Viper (sabine.viper@gmail.com)</li>
                                        <li>Ossie Balding (ossie.balds@yahoo.com)</li>
                                        <li>Mary Concierge (mary@email.com)</li>
                                        <li>Lifel Deftolzi (lifel@email.com)</li>
                                    </ol>
                                </div>

                                <div className='flex justify-start items-center gap-2 mt-1'>
                                    <Button color="default" variant="flat" onPress={onClose} radius='sm'>
                                        <Text localeParent="Common" localeKey="Close" />
                                    </Button>
                                    <a href={`mailto:${recipients}?subject=${subject}&body=${body}`}>
                                        <Tooltip content="This will open your email client" showArrow radius='sm' className='p-2'>
                                            <Button color={isPending ? "default" : "primary"} isLoading={isPending} isDisabled={isPending} className={cn({ "cursor-not-allowed": isPending })} radius='sm'>
                                                Send Meeting Invite
                                            </Button>
                                        </Tooltip>
                                    </a>
                                </div>
                            </form>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default SendMeetingInviteModal