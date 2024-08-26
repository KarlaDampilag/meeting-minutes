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
    startContent?: JSX.Element;
    customPlaceholder?: string | JSX.Element;
    allowAll?: boolean;
}

const PropertyManagerDropdown = ({ companyId, selectedUserId, onChange, labelPlacement, className, useAriaLabel, autoFocus, startContent, customPlaceholder, allowAll }: Props) => {
    const { data: propertyManagers, isLoading } = useGetPropertyManagers({ companyId });
    const items = allowAll ? [{ id: 'all', first_name: '', last_name: 'All' }].concat(propertyManagers || []) : propertyManagers || [];

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    }

    return (
        <Select
            aria-label="Bewirtschafter:In"
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
            placeholder={(customPlaceholder as string) || 'Select property manager'}
            autoFocus={autoFocus}
            isLoading={isLoading}
            startContent={startContent}
        >
            {items.map((user) => {
                if (user.id === 'all') {
                    return (
                        <SelectItem key={user.id as string} value={user.id} >
                            {user.last_name}
                        </SelectItem>
                    )
                }
                return (
                    <SelectItem key={user.id as string} value={user.id} >
                        {`${user.last_name}, ${user.first_name}`}
                    </SelectItem>
                )
            })}
        </Select>
    )
}

export default PropertyManagerDropdown