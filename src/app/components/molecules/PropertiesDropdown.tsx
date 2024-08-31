'use client'
import React from 'react'
import { Select, SelectItem } from '@nextui-org/react'

import Text from '../atoms/Text';
import { useGetProperties } from '@/rq-hooks/useGetProperties';

interface Props {
    companyId: string;
    selectedId: string | undefined;
    onChange: (selectedId: string) => void;
    labelPlacement: "outside" | "outside-left" | "inside" | undefined;
    className: string;
    useAriaLabel?: boolean;
    autoFocus?: boolean;
    startContent?: JSX.Element;
    customPlaceholder?: string | JSX.Element;
}

const PropertiesDropdown = ({ companyId, selectedId, onChange, labelPlacement, className, useAriaLabel, autoFocus, startContent, customPlaceholder }: Props) => {
    const { data, isLoading } = useGetProperties({ companyId, propertyManagerId: 'all', searchTerm: undefined });
    const items = data?.sort((a, b) => a.name.localeCompare(b.name)) || [];

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    }

    return (
        <Select
            aria-label="Liegenschaft"
            label={useAriaLabel ? "" : <Text localeParent="Properties" localeKey="Property" />}
            name="propertyId"
            className={className}
            variant='bordered'
            labelPlacement={labelPlacement}
            radius='sm'
            classNames={{ base: 'max-w-56', trigger: '!border border-gray-300' }}
            isRequired
            selectionMode='single'
            value={selectedId}
            defaultSelectedKeys={selectedId ? [selectedId] : []}
            onChange={handleOnChange}
            placeholder={(customPlaceholder as string) || 'Select property'}
            autoFocus={autoFocus}
            isLoading={isLoading}
            startContent={startContent}
        >
            {items.map((property) => {
                return (
                    <SelectItem key={property.id as string} value={property.id} >
                        {property.name}
                    </SelectItem>
                )
            })}
        </Select>
    )
}

export default PropertiesDropdown