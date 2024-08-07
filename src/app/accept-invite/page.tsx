'use client'
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useAcceptInvite } from '@/rq-hooks/useAcceptInvite'

const AcceptInvitePage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const inviteId = searchParams.get('id');

    const { mutate, data } = useAcceptInvite({ inviteId });

    React.useEffect(() => {
        if (!!inviteId) {
            mutate({ inviteId });
        }
    
        if (!!data) {
            router.push('/dashboard');
        }
    }, [inviteId]);

    return (
        <div className='px-5'>Please wait...</div>
    )
}

export default AcceptInvitePage