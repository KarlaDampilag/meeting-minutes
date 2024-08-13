'use client'
import React from 'react'
import { Select, SelectItem } from '@nextui-org/react'

import { useGetPropertyManagers } from '@/rq-hooks/useGetPropertyManagers';
import Text from '../atoms/Text';

interface Props {
    companyId: string;
    selectedUserId: string | undefined;
    onChange: (selectedUserId: string) => void;
    labelPlacement: "outside" | "outside-left" | "inside" | undefined;
    className: string;
    useAriaLabel?: boolean;
    autoFocus?: boolean;
}

const PropertyManagerDropdown = ({ companyId, selectedUserId, onChange, labelPlacement, className, useAriaLabel, autoFocus }: Props) => {
    const { data: propertyManagers, isLoading } = useGetPropertyManagers({ companyId });

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    }

    return (
        <Select
            aria-label="Property Manager"
            label={useAriaLabel ? "" : <Text localeParent="Roles" localeKey="Property Manager" />}
            name="propertyManagerId"
            className={className}
            variant='bordered'
            labelPlacement={labelPlacement}
            radius='sm'
            classNames={{ base: 'max-w-56', trigger: '!border border-gray-300' }}
            isRequired
            selectionMode='single'
            value={selectedUserId}
            defaultSelectedKeys={selectedUserId ? [selectedUserId] : []}
            onChange={handleOnChange}
            placeholder='Select property manager'
            autoFocus={autoFocus}
            isLoading={isLoading}
        >
            {(propertyManagers || []).map((user) => (
                <SelectItem key={user.id as string} value={user.id} >
                    {`${user.last_name}, ${user.first_name}`}
                </SelectItem>
            ))}
        </Select>
    )
}

export default PropertyManagerDropdown