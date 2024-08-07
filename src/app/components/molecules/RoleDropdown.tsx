'use client'
import React from 'react'
import { Select, SelectItem } from '@nextui-org/react'

const RoleDropdown = ({ selectedRoleId, onChange }: { selectedRoleId: string | undefined, onChange: (selectedRoleId: string) => void }) => {
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
            className="max-w-44"
            variant='bordered'
            labelPlacement='outside'
            radius='sm'
            classNames={{ base: 'max-w-44 !mt-0', trigger: '!border border-gray-300' }}
            isRequired
            selectionMode='single'
            selectedKeys={selectedRoleId ? [selectedRoleId] : []}
            onChange={handleOnChange}
            placeholder='Select role'
        >
            {roles.map((role) => (
                <SelectItem key={role.id as string} value={role.id}>
                    {role.label}
                </SelectItem>
            ))}
        </Select>
    )
}

export default RoleDropdown