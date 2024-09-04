'use client'
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, Button } from "@nextui-org/react";
import { IoMdAdd } from 'react-icons/io';

import { ISignee } from '../organisms/MeetingPageContent';

import SigneeFormRow from './SigneeFormRow';
import Text from '../atoms/Text';

interface Props {
    companyId: string;
    isOpen: boolean;
    onClick: () => void;
    onClose: () => void;
    onOpenChange: () => void;

    signees: ISignee[];
    setSignees: React.Dispatch<React.SetStateAction<ISignee[]>>
}

const DownloadMeetingAgendaPDFModal = ({ companyId, isOpen, onClick, onClose, onOpenChange, signees, setSignees }: Props) => {
    const handleModalClose = () => {
        setSignees([{ userId: undefined, title: undefined }]);
        onClose();
    }

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
    }

    const addSignee = () => {
        setSignees(prev => ([...prev, { userId: undefined, title: undefined }]));
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
                        <ModalHeader className="flex flex-col gap-1 pb-3">
                            Select Signees
                        </ModalHeader>
                        <ModalBody className='gap-7 pb-5'>
                            <form onSubmit={handleFormSubmit} className='flex flex-col gap-3'>
                                <p className='mb-4'>Select team members who will sign on the document:</p>

                                {signees.map((signee, index) => (
                                    <SigneeFormRow companyId={companyId} signee={signee} setSignees={setSignees} key={signee.userId} rowIndex={index} />
                                ))}

                                <Button
                                    startContent={<IoMdAdd size={15} className='min-w-fit' />}
                                    variant='bordered'
                                    color='primary'
                                    size='sm'
                                    className='w-fit'
                                    onClick={addSignee}
                                >
                                    Add a signee
                                </Button>

                                <div className='flex justify-start items-center gap-2 mt-5'>
                                    <Button color="default" variant="flat" onPress={onClose} radius='sm'>
                                        <Text localeParent="Common" localeKey="Close" />
                                    </Button>
                                    <Button type='submit' color="primary" radius='sm' onClick={onClick}>
                                        Download PDF
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

export default DownloadMeetingAgendaPDFModal