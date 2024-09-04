import { Invite, Meeting, MeetingWithProperty, MeetingWithPropertyAngAgendaItems, Owner, PropertyWithManager, Supplier, User } from "@/db/schema";

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

    async fetchUser(userId: string): Promise<User> {
        try {
            const res = await fetch(`/api/users/${userId}`);
            if (res.status === 200) {
                const data = await res.json()
                return data;
            }
            throw new Error('Failed to fetch user');
        } catch (error) {
            throw new Error('Failed to fetch user');
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

    async fetchInviteById(id: string): Promise<Invite | null> {
        try {
            const res = await fetch(`/api/invites/byId/${id}`);
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

    async fetchUserByInviteId(id: string): Promise<User | null> {
        try {
            const res = await fetch(`/api/invites/userById/${id}`);
            if (res.status === 200) {
                const data = await res.json()
                return data;
            } else if (res.status === 404) {
                return null;
            }
            throw new Error('Failed to fetch user');
        } catch (error) {
            throw new Error('Failed to fetch user');
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

    async fetchProperties(companyId: string, searchTerm?: string | null): Promise<PropertyWithManager[]> {
        try {
            let res;

            if (!!searchTerm) {
                res = await fetch(`/api/properties/${companyId}?searchTerm=${searchTerm}`);
            } else {
                res = await fetch(`/api/properties/${companyId}`);
            }

            if (res.status === 200) {
                const data = await res.json()
                return data;
            }
            throw new Error('Failed to fetch properties');
        } catch (error) {
            throw new Error('Failed to fetch properties');
        }
    }

    async fetchPropertiesByPropertyManager(propertyManagerId: string, searchTerm?: string | null): Promise<PropertyWithManager[]> {
        try {
            let res;
            if (!!searchTerm) {
                res = await fetch(`/api/propertiesByPropertyManager/${propertyManagerId}?searchTerm=${searchTerm}`);
            } else {
                res = await fetch(`/api/propertiesByPropertyManager/${propertyManagerId}`);
            }
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

    async fetchPropertyOwners(companyId: string, propertyId: string): Promise<Owner[]> {
        try {
            const res = await fetch(`/api/propertyOwners/${companyId}/${propertyId}`);
            if (res.status === 200) {
                const data = await res.json()
                return data;
            }
            throw new Error('Failed to fetch property owners');
        } catch (error) {
            throw new Error('Failed to fetch property owners');
        }
    }

    async fetchSuppliers(companyId: string, propertyId: string): Promise<Supplier[]> {
        try {
            const res = await fetch(`/api/suppliers/${companyId}/${propertyId}`);
            if (res.status === 200) {
                const data = await res.json()
                return data;
            }
            throw new Error('Failed to fetch suppliers');
        } catch (error) {
            throw new Error('Failed to fetch suppliers');
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

    async addProperty(props: { companyId: string, propertyName: string, street: string | null, city: string | null, zipCode: string | null, country: string | null, propertyManagerId: string, totalOwnershipShares: string | null }): Promise<PropertyWithManager> {
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
            if (props.totalOwnershipShares) {
                formData.append("totalOwnershipShares", props.totalOwnershipShares);
            }

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

    async updateProperty(props: { companyId: string, propertyId: string, propertyName: string, street: string | null, city: string | null, zipCode: string | null, country: string | null, propertyManagerId: string, totalOwnershipShares: string | null }): Promise<PropertyWithManager> {
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
            if (props.totalOwnershipShares) {
                formData.append("totalOwnershipShares", props.totalOwnershipShares);
            }

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

    async addPropertyOwner(props: { companyId: string, propertyId: string, firstName: string, lastName: string, telephone: string | null, email: string | null, ownedParts: number | null, street: string | null, city: string | null, zipCode: string | null, country: string | null }): Promise<Owner> {
        try {
            const formData = new FormData();
            formData.append("firstName", props.firstName);
            formData.append("lastName", props.lastName);

            if (props.telephone) {
                formData.append("telephone", props.telephone);
            }
            if (props.email) {
                formData.append("email", props.email);
            }
            if (props.ownedParts) {
                formData.append("ownedParts", props.ownedParts.toString());
            }
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

            const res = await fetch(`/api/propertyOwners/${props.companyId}/${props.propertyId}`, { method: 'POST', body: formData });

            if (res.status === 200) {
                const data = await res.json()
                return data;
            }
            throw new Error('Failed to add property owner');
        } catch (error) {
            throw new Error('Failed to add property owner');
        }
    }

    async updatePropertyOwner(props: { propertyOwnerId: string, companyId: string, propertyId: string, firstName: string, lastName: string, telephone: string | null, email: string | null, ownedParts: number | null, street: string | null, city: string | null, zipCode: string | null, country: string | null }): Promise<Owner> {
        try {
            const formData = new FormData();
            formData.append("firstName", props.firstName);
            formData.append("lastName", props.lastName);

            if (props.telephone) {
                formData.append("telephone", props.telephone);
            }
            if (props.email) {
                formData.append("email", props.email);
            }
            if (props.ownedParts) {
                formData.append("ownedParts", props.ownedParts.toString());
            }
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

            const res = await fetch(`/api/propertyOwners/${props.companyId}/${props.propertyId}/${props.propertyOwnerId}`, { method: 'PUT', body: formData });

            if (res.status === 200) {
                const data = await res.json()
                return data;
            }
            throw new Error('Failed to update property owner');
        } catch (error) {
            throw new Error('Failed to update property owner');
        }
    }

    async deletePropertyOwner(props: { propertyOwnerId: string, companyId: string, propertyId: string }): Promise<boolean> {
        try {
            const res = await fetch(`/api/propertyOwners/${props.companyId}/${props.propertyId}/${props.propertyOwnerId}`, { method: 'DELETE' });

            if (res.status === 200) {
                const data = await res.json()
                return data;
            }
            throw new Error('Failed to delete property owner');
        } catch (error) {
            throw new Error('Failed to delete property owner');
        }
    }

    async addSupplier(props: { companyId: string, propertyId: string, name: string, service: string, telephone: string | null, email: string | null }): Promise<Supplier> {
        try {
            const formData = new FormData();
            formData.append("name", props.name);
            formData.append("service", props.service);

            if (props.telephone) {
                formData.append("telephone", props.telephone);
            }
            if (props.email) {
                formData.append("email", props.email);
            }

            const res = await fetch(`/api/suppliers/${props.companyId}/${props.propertyId}`, { method: 'POST', body: formData });

            if (res.status === 200) {
                const data = await res.json()
                return data;
            }
            throw new Error('Failed to add supplier');
        } catch (error) {
            throw new Error('Failed to add supplier');
        }
    }

    async updateSupplier(props: { supplierId: string, companyId: string, propertyId: string, name: string, service: string, telephone: string | null, email: string | null }): Promise<Supplier> {
        try {
            const formData = new FormData();
            formData.append("name", props.name);
            formData.append("service", props.service);

            if (props.telephone) {
                formData.append("telephone", props.telephone);
            }
            if (props.email) {
                formData.append("email", props.email);
            }

            const res = await fetch(`/api/suppliers/${props.companyId}/${props.propertyId}/${props.supplierId}`, { method: 'PUT', body: formData });

            if (res.status === 200) {
                const data = await res.json()
                return data;
            }
            throw new Error('Failed to update supplier');
        } catch (error) {
            throw new Error('Failed to update supplier');
        }
    }

    async deleteSupplier(props: { supplierId: string, companyId: string, propertyId: string }): Promise<boolean> {
        try {
            const res = await fetch(`/api/suppliers/${props.companyId}/${props.propertyId}/${props.supplierId}`, { method: 'DELETE' });

            if (res.status === 200) {
                const data = await res.json()
                return data;
            }
            throw new Error('Failed to delete supplier');
        } catch (error) {
            throw new Error('Failed to delete supplier');
        }
    }

    async deleteInvite(inviteId: string): Promise<boolean> {
        try {
            const res = await fetch(`/api/invites/byId/${inviteId}`, { method: 'DELETE' });

            if (res.status === 200) {
                const data = await res.json()
                return data;
            }
            throw new Error('Failed to delete invite');
        } catch (error) {
            throw new Error('Failed to delete invite');
        }
    }

    async addMeeting(props: { propertyId: string, name: string, location: string, date: string, hours: string | null, minutes: string | null, agendaTopics: string[] }): Promise<Meeting> {
        try {
            const formData = new FormData();
            formData.append("propertyId", props.propertyId);
            formData.append("name", props.name);
            formData.append("location", props.location);
            formData.append("date", props.date);
            formData.append("agendaTopics", props.agendaTopics.join(','));

            if (props.hours) {
                formData.append("hours", props.hours);
            }
            if (props.minutes) {
                formData.append("minutes", props.minutes);
            }

            const res = await fetch(`/api/meetings`, { method: 'POST', body: formData });

            if (res.status === 200) {
                const data = await res.json()
                return data;
            }
            throw new Error('Failed to add meeting agenda and its items');
        } catch (error) {
            throw new Error('Failed to add meeting agenda and its items');
        }
    }

    async fetchMeetings(companyId: string, searchTerm?: string | null): Promise<MeetingWithProperty[]> {
        try {
            let res;

            if (!!searchTerm) {
                res = await fetch(`/api/meetings/${companyId}?searchTerm=${searchTerm}`);
            } else {
                res = await fetch(`/api/meetings/${companyId}`);
            }

            if (res.status === 200) {
                const data = await res.json()
                return data;
            }
            throw new Error('Failed to fetch meetings');
        } catch (error) {
            throw new Error('Failed to fetch meetings');
        }
    }

    async fetchMeetingsByProperty(propertyId: string, searchTerm?: string | null): Promise<MeetingWithProperty[]> {
        try {
            let res;
            if (!!searchTerm) {
                res = await fetch(`/api/meetingsByProperty/${propertyId}?searchTerm=${searchTerm}`);
            } else {
                res = await fetch(`/api/meetingsByProperty/${propertyId}`);
            }
            if (res.status === 200) {
                const data = await res.json()
                return data;
            }
            throw new Error('Failed to fetch meetings');
        } catch (error) {
            throw new Error('Failed to fetch meetings');
        }
    }

    async fetchMeeting(companyId: string, meetingId: string): Promise<MeetingWithPropertyAngAgendaItems> {
        try {
            const res = await fetch(`/api/meetings/${companyId}/${meetingId}`);
            if (res.status === 200) {
                const data = await res.json()
                return data;
            }
            throw new Error('Failed to fetch meeting');
        } catch (error) {
            throw new Error('Failed to fetch meeting');
        }
    }
}