'use client'
import React from 'react'
import { Select, SelectItem } from '@nextui-org/react'

import Text from '../atoms/Text';

interface Props {
    selectedRoleId: string | undefined;
    onChange: (selectedRoleId: string) => void;
    labelPlacement: "outside" | "outside-left" | "inside" | undefined;
    className: string;
    useAriaLabel?: boolean;
    autoFocus?: boolean;
}

const RoleDropdown = ({ selectedRoleId, onChange, labelPlacement, className, useAriaLabel, autoFocus }: Props) => {
    const roles = [
        {
            id: process.env.NEXT_PUBLIC_ADMIN_ROLE_ID,
            label: <Text localeParent='Roles' localeKey='Admin' />
        },
        {
            id: process.env.NEXT_PUBLIC_PROPERTY_MANAGER_ROLE_ID,
            label: <Text localeParent='Roles' localeKey='Property Manager' />
        }
    ];

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    }

    return (
        <Select
            aria-label="Rolle"
            label={useAriaLabel ? "" : <Text localeParent="Roles" localeKey="Role" />}
            name="roleId"
            className={className}
            variant='bordered'
            labelPlacement={labelPlacement}
            radius='sm'
            classNames={{ base: 'max-w-44 !mt-0', trigger: '!border border-gray-300' }}
            isRequired
            selectionMode='single'
            value={selectedRoleId}
            defaultSelectedKeys={selectedRoleId ? [selectedRoleId] : []}
            onChange={handleOnChange}
            placeholder='Rolle auswählen'
            autoFocus={autoFocus}
        >
            {roles.map((role) => (
                <SelectItem key={role.id as string} value={role.id} >
                    {role.label}
                </SelectItem>
            ))}
        </Select>
    )
}

export default RoleDropdown