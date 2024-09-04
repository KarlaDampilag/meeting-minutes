'use client'
import React from 'react'
import { Select, SelectItem } from '@nextui-org/react'

import { useGetUsers } from '@/rq-hooks/useGetUsers';

interface Props {
    companyId: string;
    selectedUserId: string | undefined;
    onChange: (selectedUserId: string) => void;
    labelPlacement: "outside" | "outside-left" | "inside" | undefined;
    className: string;
    useAriaLabel?: boolean;
    autoFocus?: boolean;
    startContent?: JSX.Element;
    customPlaceholder?: string | JSX.Element;
    allowAll?: boolean;
}

const TeamMemberDropdown = ({ companyId, selectedUserId, onChange, labelPlacement, className, useAriaLabel, autoFocus, startContent, customPlaceholder, allowAll }: Props) => {
    const { data: users, isLoading, isRefetching, refetch } = useGetUsers({ companyId });

    const items = (users || []).sort((a, b) => `${a.last_name}, ${a.first_name}`.localeCompare(`${b.last_name}, ${b.first_name}`))

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    }

    return (
        <Select
            aria-label="Team member"
            label={useAriaLabel ? "" : "Team member"}
            name="userId"
            className={className}
            variant='bordered'
            labelPlacement={labelPlacement}
            radius='sm'
            classNames={{ base: 'max-w-56', trigger: '!border border-gray-300' }}
            isRequired
            selectionMode='single'
            value={selectedUserId}
            defaultSelectedKeys={selectedUserId}
            onChange={handleOnChange}
            placeholder={(customPlaceholder as string) || 'Select property manager'}
            autoFocus={autoFocus}
            isLoading={isLoading}
            startContent={startContent}
        >
            {items.map((user) => (
                <SelectItem key={user.id as string} value={user.id} >
                    {`${user.last_name}, ${user.first_name}`}
                </SelectItem>
            ))}
        </Select>
    )
}

export default TeamMemberDropdown