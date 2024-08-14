import { Invite, PropertyWithManager, User } from "@/db/schema";

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

    async fetchInviteByUserEmail(email: string): Promise<Invite | null> {
        try {
            const res = await fetch(`/api/invites/byEmail/${email}`);
            if (res.status === 200) {
                const data = await res.json()
                return data;
            } else if (res.status === 404) {
                return null;
            }
            throw new Error('Failed to fetch invite');
        } catch (error) {
            throw new Error('Failed to fetch invite');
        }
    }

    async fetchPropertyManagers(companyId: string): Promise<User[]> {
        try {
            const res = await fetch(`/api/propertyManagers/${companyId}`);
            if (res.status === 200) {
                const data = await res.json()
                return data;
            }
            throw new Error('Failed to fetch property managers');
        } catch (error) {
            throw new Error('Failed to fetch property managers');
        }
    }

    async fetchProperties(companyId: string): Promise<PropertyWithManager[]> {
        try {
            const res = await fetch(`/api/properties/${companyId}`);
            if (res.status === 200) {
                const data = await res.json()
                return data;
            }
            throw new Error('Failed to fetch properties');
        } catch (error) {
            throw new Error('Failed to fetch properties');
        }
    }

    async fetchProperty(companyId: string, propertyId: string): Promise<PropertyWithManager> {
        try {
            const res = await fetch(`/api/properties/${companyId}/${propertyId}`);
            if (res.status === 200) {
                const data = await res.json()
                return data;
            }
            throw new Error('Failed to fetch property');
        } catch (error) {
            throw new Error('Failed to fetch property');
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

    async updateRole(userId: string, roleId: string): Promise<User> {
        try {
            const formData = new FormData();
            formData.append("roleId", roleId);

            const res = await fetch(`/api/users/${userId}`, { method: 'POST', body: formData });

            if (res.status === 200) {
                const data = await res.json()
                return data;
            }
            throw new Error('Failed to update user');
        } catch (error) {
            throw new Error('Failed to update user');
        }
    }

    async deleteUserFromCompany(companyId: string, userId: string): Promise<boolean> {
        try {
            const res = await fetch(`/api/company/${companyId}/users/delete/${userId}`, { method: 'POST' });

            if (res.status === 200) {
                const data = await res.json()
                return data;
            }
            throw new Error('Failed to delete user');
        } catch (error) {
            throw new Error('Failed to delete user');
        }
    }

    async addProperty(props: { companyId: string, propertyName: string, street: string | null, city: string | null, zipCode: string | null, country: string | null, propertyManagerId: string }): Promise<PropertyWithManager> {
        try {
            const formData = new FormData();
            formData.append("propertyName", props.propertyName);

            if (props.street) {
                formData.append("street", props.street);
            }
            if (props.city) {
                formData.append("city", props.city);
            }
            if (props.zipCode) {
                formData.append("zipCode", props.zipCode);
            }
            if (props.country) {
                formData.append("country", props.country);
            }
            formData.append("propertyManagerId", props.propertyManagerId);

            const res = await fetch(`/api/properties/${props.companyId}`, { method: 'POST', body: formData });

            if (res.status === 200) {
                const data = await res.json()
                return data;
            }
            throw new Error('Failed to add property');
        } catch (error) {
            throw new Error('Failed to add property');
        }
    }

    async updateProperty(props: { companyId: string, propertyId: string, propertyName: string, street: string | null, city: string | null, zipCode: string | null, country: string | null, propertyManagerId: string }): Promise<PropertyWithManager> {
        try {
            const formData = new FormData();
            formData.append("propertyName", props.propertyName);

            if (props.street) {
                formData.append("street", props.street);
            }
            if (props.city) {
                formData.append("city", props.city);
            }
            if (props.zipCode) {
                formData.append("zipCode", props.zipCode);
            }
            if (props.country) {
                formData.append("country", props.country);
            }
            formData.append("propertyManagerId", props.propertyManagerId);

            const res = await fetch(`/api/properties/${props.companyId}/${props.propertyId}`, { method: 'PUT', body: formData });
            if (res.status === 200) {
                const data = await res.json()
                return data;
            }
            throw new Error('Failed to fetch property');
        } catch (error) {
            throw new Error('Failed to fetch property');
        }
    }
}