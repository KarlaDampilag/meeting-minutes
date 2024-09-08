'use client'
import React from 'react'
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import SignatureCapture from '../molecules/SignatureCapture';
import Text from '../atoms/Text';

const SignatureCaptureModal = ({ onSubmit }: { onSubmit: (dataUrl: string) => Promise<boolean> }) => {
    return (
        <Modal
            isOpen={true}
            placement="top-center"
            size='xl'
            isDismissable={false}
            hideCloseButton
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 pb-0 ml-3"><Text localeParent='User' localeKey='Your Signature' /></ModalHeader>
                        <ModalBody className=''>
                            <div className='pb-5'>
                                <SignatureCapture onSubmit={onSubmit} />
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default SignatureCaptureModal