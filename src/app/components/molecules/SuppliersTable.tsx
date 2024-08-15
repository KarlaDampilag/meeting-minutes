'use client'
import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from "@nextui-org/react";

import { useGetSuppliers } from '@/rq-hooks/useGetSuppliers';
import DeleteSupplierButton from '../organisms/DeleteSupplierButton';
import UpdateSupplierButton from '../organisms/UpdateSupplierButton';

const columns = [
    { name: "NAME", uid: "name" },
    { name: "SERVICE", uid: "service" },
    { name: "EMAIL", uid: "email" },
    { name: "TELEPHONE", uid: "telephone" },
    { name: "ACTIONS", uid: "actions" },
];

const SuppliersTable = ({ companyId, propertyId }: { companyId: string, propertyId: string }) => {
    const { data, isLoading, isRefetching } = useGetSuppliers({ companyId, propertyId });

    const renderCell = React.useCallback((supplier: any, columnKey: string) => { // FIXME change type any
        const cellValue = supplier[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "service":
                    return (
                        <div className="flex flex-col">
                            <p className="text-bold text-sm">{cellValue}</p>
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
            case "actions":
                return (
                    <div className="relative flex items-center justify-center gap-4">
                        <span className="text-lg cursor-pointer">
                            <UpdateSupplierButton companyId={companyId} supplier={supplier} />
                        </span>
                        <span className="text-lg cursor-pointer">
                            <DeleteSupplierButton companyId={companyId} propertyId={supplier.property_id} supplierId={supplier.id} />
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

export default SuppliersTable