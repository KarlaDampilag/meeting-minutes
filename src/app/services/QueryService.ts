import { Invite, User } from "@/db/schema";

export class QueryService {
    private static instance: QueryService;

    private constructor() { }

    public static getInstance(): QueryService {
        if (!QueryService.instance) {
            QueryService.instance = new QueryService();
        }

        return QueryService.instance;
    }

    async fetchUsers(companyId: string): Promise<User[]> {
        try {
            const res = await fetch(`/api/company/${companyId}/users`);
            if (res.status === 200) {
                const data = await res.json()
                return data;
            }
            throw new Error('Failed to fetch users');
        } catch (error) {
            throw new Error('Failed to fetch users');
        }
    }

    async fetchOpenInvites(companyId: string): Promise<Invite[]> {
        try {
            const res = await fetch(`/api/company/${companyId}/invites`);
            if (res.status === 200) {
                const data = await res.json()
                return data;
            }
            throw new Error('Failed to fetch invites');
        } catch (error) {
            throw new Error('Failed to fetch invites');
        }
    }

    async fetchInviteByUserEmail(email: string): Promise<Invite> {
        try {
            const res = await fetch(`/api/invites/byEmail`);
            const formData = new FormData();
            formData.append("email", email)
            if (res.status === 200) {
                const data = await res.json()
                return data;
            }
            throw new Error('Failed to fetch invite');
        } catch (error) {
            throw new Error('Failed to fetch invite');
        }
    }

    async acceptInvite(inviteId: string): Promise<Invite[]> {
        try {
            const formData = new FormData();
            formData.append("inviteId", inviteId)
            const res = await fetch(`/api/acceptInvite`, { method: 'POST', body: formData });
            if (res.status === 200) {
                const data = await res.json()
                return data;
            }
            throw new Error('Failed to accept invite');
        } catch (error) {
            throw new Error('Failed to accept invite');
        }
    }
}