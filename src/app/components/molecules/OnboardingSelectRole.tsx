'use client'
import React from 'react'
import { Button, cn } from '@nextui-org/react';
import { AiOutlineHome } from 'react-icons/ai';
import { FaArrowRightLong, FaCheck, FaXmark } from 'react-icons/fa6';
import { RiShieldUserLine } from 'react-icons/ri';
import SelectItemCard from '../atoms/SelectItemCard';
import { useRouter } from 'next/navigation';

const OnboardingSelectRole = ({ assignPendingRole }: { assignPendingRole: (role: "First Admin" | "Admin" | "Property Manager") => Promise<boolean> }) => {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = React.useState<"Admin" | "Property Manager">();
    const [showHasCompanyAccountSelect, setShowHasCompanyAccountSelect] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleRoleSelect = async () => {
        if (selectedRole === "Admin") {
            setShowHasCompanyAccountSelect(true);
        } else {
            await handleAssignPendingRole();
        }
    }

    const handleAssignPendingRole = async () => {
        if (!!selectedRole) {
            setIsLoading(true);
            const success = await assignPendingRole(selectedRole);
            if (success) {
                router.refresh();
            }
        }
    }

    if (showHasCompanyAccountSelect) {
        return <HasCompanyAccountSelect assignPendingRole={assignPendingRole} />
    }

    return (
        <div className='text-center w-fit mx-auto'>
            <h1 className='mb-6'>Select Your Role</h1>
            <p className='mb-8'>What&apos;s your role within the company?</p>
            <div className='flex items-center gap-5'>
                <SelectItemCard
                    title="Admin"
                    description="Set up the company account, manage team members, and access all the features available to Property Managers."
                    icon={<RiShieldUserLine size={40} className='text-primary mt-4' />}
                    isSelected={selectedRole === "Admin"}
                    onClick={() => setSelectedRole("Admin")}
                />
                <SelectItemCard
                    title="Property Manager"
                    description="Manage property details, schedule meetings, record and document meeting minutes, and manage meeting attachments."
                    icon={<AiOutlineHome size={40} className='text-primary mt-4' />}
                    isSelected={selectedRole === "Property Manager"}
                    onClick={() => setSelectedRole("Property Manager")}
                />
            </div>
            <Button
                variant='flat'
                color={!!selectedRole && !isLoading ? 'primary' : 'default'}
                radius='sm'
                fullWidth
                className={cn('mt-6 h-12', { 'cursor-not-allowed': !selectedRole || isLoading })}
                disabled={!selectedRole}
                endContent={<FaArrowRightLong />}
                onClick={handleRoleSelect}
                isDisabled={isLoading}
                isLoading={isLoading}
            >
                Continue
            </Button>
        </div>
    )
}

const HasCompanyAccountSelect = ({ assignPendingRole }: { assignPendingRole: (role: "First Admin" | "Admin" | "Property Manager") => Promise<boolean> }) => {
    const router = useRouter();
    const [hasCompanyAccount, setHasCompanyAccount] = React.useState<boolean>();
    const [isLoading, setIsLoading] = React.useState(false);

    const handleHasCompanyAccountSelect = async () => {
        if (hasCompanyAccount === true) {
            setIsLoading(true);
            try {
                const success = await assignPendingRole("Admin");
                if (success) {
                    router.refresh();
                } else {
                    throw new Error('Failed to assign pending admin role')
                }
            } catch (error) {
                console.error('Failed to assign pending admin role');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(true);
            try {
                const success = await assignPendingRole("First Admin");
                if (success) {
                    router.push('/dashboard/company-settings');
                } else {
                    throw new Error('Failed to assign pending first admin role')
                }
            } catch (error) {
                console.error('Failed to assign pending first admin role');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
    }

    return (
        <div className='text-center w-fit mx-auto max-w-[529px]'>
            <h1 className='mb-6'>Company Account Status</h1>
            <p className='mb-8'>Does your company already have an account with {process.env.NEXT_PUBLIC_APP_NAME}?</p>
            <div className='flex items-center gap-5 mx-auto w-fit'>
                <SelectItemCard
                    title="No Existing Company Account"
                    description="Create a new company account for verification."
                    icon={<FaXmark size={40} className='text-primary mt-4' />}
                    isSelected={hasCompanyAccount === false}
                    onClick={() => setHasCompanyAccount(false)}
                />
                <SelectItemCard
                    title="Company Account Exists"
                    description="Join by getting access from an admin."
                    icon={<FaCheck size={40} className='text-primary mt-4' />}
                    isSelected={hasCompanyAccount === true}
                    onClick={() => setHasCompanyAccount(true)}
                />
            </div>
            <Button
                variant='flat'
                color={hasCompanyAccount !== undefined ? 'primary' : 'default'}
                radius='sm'
                fullWidth
                className={cn('mt-6 h-12', { 'cursor-not-allowed': hasCompanyAccount === undefined || isLoading })}
                disabled={hasCompanyAccount === undefined}
                endContent={<FaArrowRightLong />}
                onClick={handleHasCompanyAccountSelect}
                isDisabled={isLoading}
                isLoading={isLoading}
            >
                Continue
            </Button>
        </div>
    );
}

export default OnboardingSelectRole