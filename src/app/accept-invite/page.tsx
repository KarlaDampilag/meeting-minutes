'use client'
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useAcceptInvite } from '@/rq-hooks/useAcceptInvite'

const AcceptInvitePage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const inviteId = searchParams.get('inviteId');

    const { mutate, data } = useAcceptInvite({ inviteId });

    if (!!inviteId) {
        mutate({ inviteId });
    }

    if (!!data) {
        router.push('/dashboard');
    }

    return (
        <div>Please wait...</div>
    )
}

export default AcceptInvitePage