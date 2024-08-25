'use client'
import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from "@nextui-org/react";

import { useGetPropertyOwners } from '@/rq-hooks/useGetPropertyOwners';
import UpdatePropertyOwnerButton from '../organisms/UpdatePropertyOwnerButton';
import DeletePropertyOwnerButton from '../organisms/DeletePropertyOwnerButton';
import { Property } from '@/db/schema';

const columns = [
    { name: "NAME", uid: "name" },
    { name: "EMAIL", uid: "email" },
    { name: "TELEPHONE", uid: "telephone" },
    { name: "ADDRESS", uid: "address" },
    { name: "OWNED PARTS", uid: "ownedParts" },
    { name: "ACTIONS", uid: "actions" },
];

const PropertyOwnersTable = ({ property }: { property: Property }) => {
    const { data, isLoading, isRefetching } = useGetPropertyOwners({ companyId: property.company_id, propertyId: property.id });

    const renderCell = React.useCallback((owner: any, columnKey: string) => { // FIXME change type any
        const cellValue = owner[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{owner.first_name} {owner.last_name}</p>
                    </div>
                );
            case "email":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm">{cellValue}</p>
                    </div>
                );
            case "telephone":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm">{cellValue}</p>
                    </div>
                );
                case "address":
                    return (
                        <div className="flex flex-col">
                            {cellValue && <p className="text-bold text-sm">{cellValue.street} {cellValue.city} {cellValue.zipCode} {cellValue.country}</p>}
                        </div>
                    );
            case "ownedParts":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm">{owner.ownership_share} / {property.total_ownership_shares}</p>
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex items-center justify-center gap-4">
                        <span className="text-lg cursor-pointer">
                            <UpdatePropertyOwnerButton companyId={property.company_id} property={property} propertyOwner={owner} />
                        </span>
                        <span className="text-lg cursor-pointer">
                            <DeletePropertyOwnerButton companyId={property.company_id} propertyId={owner.property_id} propertyOwnerId={owner.id} />
                        </span>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <Table aria-label="Team table" radius='sm'>
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={data || []} isLoading={isLoading || isRefetching} loadingContent={<Spinner />}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey as string)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default PropertyOwnersTable