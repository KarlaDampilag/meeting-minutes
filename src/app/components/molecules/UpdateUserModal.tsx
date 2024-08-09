'use client'
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, Button, cn, User as UserComponent } from "@nextui-org/react";
import { toast } from 'react-toastify';

import { User } from '@/db/schema';
import RoleDropdown from './RoleDropdown';

interface Props {
    user: User;
    isUpdateUserRolePending: boolean;
    isOpen: boolean;
    onUpdateUser: (userId: string, roleId: string | undefined) => void;
    onClose: () => void;
    onOpenChange: () => void;
}

const UpdateUserModal = ({ user, isUpdateUserRolePending, isOpen, onUpdateUser, onClose , onOpenChange }: Props) => {
    const [roleId, setRoleId] = React.useState<string | undefined>(user.role_id || undefined);

    const handleModalClose = () => {
        setRoleId(user.role_id || undefined);
        onClose();
    }

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        const target = event.target as typeof event.target & {
            roleId: { value: string };
        };
        const roleId = target.roleId.value;
        toast.info("Please wait...");
        onUpdateUser(user.id, roleId);
        onClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={handleModalClose}
            placement="top-center"
            size='xs'
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 pb-1">Update User</ModalHeader>
                        <ModalBody className='gap-7 pb-5'>
                            <form onSubmit={handleFormSubmit} className='flex flex-col gap-5'>
                                <UserComponent
                                    avatarProps={{ radius: "lg", src: user.image_url as string }}
                                    description={user.email}
                                    name={`${user.first_name} ${user.last_name}`}
                                    className='w-full justify-start'
                                >
                                    {user.email}
                                </UserComponent>
                                <RoleDropdown selectedRoleId={roleId} onChange={(value) => setRoleId(value)} labelPlacement='inside' className='max-w-full' autoFocus />
                                <div className='flex justify-end items-center gap-2'>
                                    <Button color="default" variant="flat" onPress={onClose} radius='sm'>
                                        Close
                                    </Button>
                                    <Button type='submit' color={isUpdateUserRolePending ? "default" : "primary"} isLoading={isUpdateUserRolePending} isDisabled={isUpdateUserRolePending} className={cn({ "cursor-not-allowed": isUpdateUserRolePending })} radius='sm'>
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

export default UpdateUserModal