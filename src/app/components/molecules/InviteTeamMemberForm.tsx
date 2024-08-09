'use client'
import React from 'react'
import { Button, cn, Input } from '@nextui-org/react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import RoleDropdown from './RoleDropdown';

const InviteTeamMemberForm = ({ onSubmit }: { onSubmit: (email: string, roleId: string) => Promise<boolean> }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);
    const [email, setEmail] = React.useState<string>();
    const [roleId, setRoleId] = React.useState<string>();

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        try {
            if (!!email && !!roleId) {
                setIsLoading(true);
                event.preventDefault();
                const success = await onSubmit(email, roleId);
                if (success) {
                    setEmail("");
                    setRoleId(undefined);
                    toast.success("User invited successfully");
                    setTimeout(() => {
                        router.push('/dashboard/team')
                    }, 2000);
                } else {
                    throw new Error('Something went wrong.');
                }
            }
        } catch (error) {
            console.error('Failed to invite new user to team');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='bg-white py-6 px-8 pb-9 my-5 rounded-lg border-stone-200 border shadow-sm'>
            <h3 className='mb-0'>Invite team members</h3>
            <p className='mb-5'>Invite users to your company account</p>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-row items-start gap-4 justify-start'>
                    <Input
                        variant='bordered'
                        aria-label="Email"
                        placeholder="Enter email"
                        type='email'
                        name='email'
                        isRequired
                        required
                        
                        labelPlacement='outside'
                        radius='sm'
                        classNames={{ base: 'max-w-xs', inputWrapper: 'border border-gray-300' }}
                        validationBehavior='native'
                        value={email}
                        onValueChange={setEmail}
                    />
                    <RoleDropdown selectedRoleId={roleId} onChange={setRoleId} labelPlacement='inside' className='max-w-44' useAriaLabel />
                    <Button color={isLoading || !email || !roleId ? 'default' : 'primary'} type='submit' size='sm' className={cn('h-10 text-sm px-4', { 'cursor-not-allowed': isLoading || !email || !roleId })} radius='sm' isLoading={isLoading} isDisabled={isLoading || !email || !roleId}>Send Invite</Button>
                </div> 
            </form>
        </div>
    )
}

export default InviteTeamMemberForm