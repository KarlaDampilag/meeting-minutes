import React, { useRef, useEffect } from 'react';
import { Input } from '@nextui-org/react';

import { debounce } from '@/utils/utils';

const SearchTermInput = ({ value, onChange }: { value: string | undefined; onChange: (value: string) => void }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const debouncedOnChange = useRef(debounce((newValue: string) => {
        onChange(newValue);
    }, 300)).current;

    useEffect(() => {
        debouncedOnChange(value || '');
    }, [value, debouncedOnChange]);

    const handleInputChange = () => {
        if (inputRef.current) {
            debouncedOnChange(inputRef.current.value);
        }
    };

    const handleClear = () => {
        if (inputRef.current) {
            inputRef.current.value = "";
            handleInputChange();
        }
    }

    return (
        <Input
            ref={inputRef}
            defaultValue={value}
            onValueChange={handleInputChange}
            radius='sm'
            variant='bordered'
            classNames={{ base: 'max-w-72', inputWrapper: '!border border-gray-300' }}
            placeholder='Search'
            isClearable
            onClear={handleClear}
        />
    );
};

export default SearchTermInput;
