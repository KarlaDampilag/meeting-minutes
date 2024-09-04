import React from 'react'
import { Spinner } from "@nextui-org/react";

import { useGetUser } from '@/rq-hooks/useGetUser';
import { User } from '@/db/schema';

const UserSignature = ({ userId, className }: { userId: string | undefined, className?: string }) => {
    const { data, isLoading, isFetched } = useGetUser({ userId });

    if (isLoading) {
        return <Spinner />;
    }

    if (isFetched && data && (data as User).signature) {
        return (
            <img alt="user signature" src={(data as User).signature} className={className} />
        )
    }

    return <div className={className}></div>;
}

export default UserSignature