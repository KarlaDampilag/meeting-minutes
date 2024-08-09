'use client'
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useAcceptInvite } from '@/rq-hooks/useAcceptInvite'

const AcceptInvitePage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const inviteId = searchParams.get('id');

    const { mutate, isSuccess } = useAcceptInvite();

    React.useEffect(() => {
        if (!!inviteId) {
            mutate({ inviteId });
        }
    
        if (isSuccess) {
            router.push('/dashboard');
        }
    }, [inviteId, isSuccess]);

    return (
        <div className='px-5 py-2'>Please wait...</div>
    )
}

export default AcceptInvitePage