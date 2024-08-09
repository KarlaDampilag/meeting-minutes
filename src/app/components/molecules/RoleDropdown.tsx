'use client'
import React from 'react'
import { Select, SelectItem } from '@nextui-org/react'

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
            label: "Admin"
        },
        {
            id: process.env.NEXT_PUBLIC_PROPERTY_MANAGER_ROLE_ID,
            label: "Property Manager"
        }
    ];

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    }

    return (
        <Select
            aria-label="Role"
            label={useAriaLabel ? "" : "Role"}
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
            placeholder='Select role'
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