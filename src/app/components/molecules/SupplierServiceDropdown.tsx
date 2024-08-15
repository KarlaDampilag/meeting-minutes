'use client'
import React from 'react'
import { Select, SelectItem } from '@nextui-org/react';

interface Props {
    value: string | undefined;
    onChange: (value: string) => void;
    labelPlacement: "outside" | "outside-left" | "inside" | undefined;
    className: string;
    useAriaLabel?: boolean;
    autoFocus?: boolean;
    isLoading?: boolean;
}

const options = [
    { value: 'CLEANING', label: 'Cleaning' },
    { value: 'ELECTRICAL', label: 'Electrical' },
    { value: 'LANDSCAPING', label: 'Landscaping/Gardening' },
    { value: 'PAINTING_DECORATING', label: 'Painting and Decorating' },
    { value: 'PEST_CONTROL', label: 'Pest Control' },
    { value: 'PLUMBING', label: 'Plumbing' },
    { value: 'ROOFING', label: 'Roofing' },
    { value: 'SECURITY', label: 'Security' },
    { value: 'WASTE_MANAGEMENT', label: 'Waste Management' }
];

const SupplierServiceDropdown = ({ value, onChange, labelPlacement, className, useAriaLabel, autoFocus, isLoading }: Props) => {

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    }

    return (
        <Select
            aria-label="Service"
            label={useAriaLabel ? "" : "Service"}
            name="service"
            className={className}
            variant='bordered'
            labelPlacement={labelPlacement}
            radius='sm'
            classNames={{ base: 'max-w-56', trigger: '!border border-gray-300' }}
            isRequired
            selectionMode='single'
            value={value}
            defaultSelectedKeys={value ? [value] : []}
            onChange={handleOnChange}
            placeholder='Select service'
            autoFocus={autoFocus}
            isLoading={isLoading}
        >
            {(options || []).map((service) => (
                <SelectItem key={service.value} value={service.value} >
                    {service.label}
                </SelectItem>
            ))}
        </Select>
    )
}

export default SupplierServiceDropdown