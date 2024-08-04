'use client'
import { CompanyAndSubmittingUser } from '@/db/schema';
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react'
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaCheck } from 'react-icons/fa6';
import { HiOutlineRefresh } from 'react-icons/hi';
import { IoMdRefresh } from 'react-icons/io';
import { toast } from 'react-toastify';

const columns = [
    { name: "COMPANY NAME", uid: "name" },
    { name: "ADDRESS", uid: "address" },
    { name: "SUBMITTED BY", uid: "submittedBy" },
    { name: "ACTIONS", uid: "actions" }
];

const PendingCompaniesTable = ({ companiesData, handleApprove }: { companiesData: CompanyAndSubmittingUser[], handleApprove: (companyId: string, companyName: string, userId: string, firstName: string, email: string) => Promise<boolean> }) => {
    const router = useRouter();

    const onApproveClick = async (companyId: string, companyName: string, userId: string | undefined, firstName: string | undefined, email: string | undefined) => {
        if (companyId && userId && firstName && email) {
            toast.info('Please wait...');
            const success = await handleApprove(companyId, companyName, userId, firstName, email);
            if (success) {
                toast.success("Approved successfully");
                setTimeout(() => { router.refresh() }, 1000);
            } else {
                toast.error("Something went wrong, please try again later...");
            }
        }
    }

    const renderCell = React.useCallback((companyAndUser: CompanyAndSubmittingUser, columnKey: string) => {
        const company = companyAndUser.companies;
        const submittingUser = companyAndUser.users;

        switch (columnKey) {
            case "name":
                return (
                    <span>
                        {company.name}
                    </span>
                );
            case "address":
                const address = company.address as any;
                return (
                    <div className='flex flex-col gap-1'>
                        <div className='flex items-center gap-2'><span>{address.street}</span></div>
                        <div className='flex items-center gap-2'><span>{address.city}</span></div>
                        <div className='flex items-center gap-2'><span>{address.zipCode} {address.state}</span></div>
                        <div className='flex items-center gap-2'><span>{address.country}</span></div>
                    </div>
                )
            case "submittedBy":
                return <span>{submittingUser?.first_name} {submittingUser?.last_name}</span>;
            case "actions":
                return (
                    <div className="relative flex items-center justify-center gap-4">
                        <Tooltip
                            radius='sm'
                            shadow='lg'
                            content={
                                <div className="px-2 py-3 border-stone-500 max-w-xl">
                                    <p className='mb-1 text-sm'>Approving a company will:</p>
                                    <ul className='list-disc ml-6'>
                                        <li className='text-sm'>Grant its team members access to the platform.</li>
                                        <li className='text-sm'>Grant the submitting user the role of <i>Admin</i>.</li>
                                        <li className='text-sm'>The company&apos;s free trial of 7 days will start once approved.</li>
                                    </ul>
                                </div>
                            }
                        >
                            <Button color='primary' variant='solid' radius='sm' size='sm' startContent={<FaCheck />} onClick={() => onApproveClick(company.id, company.name, submittingUser?.id, submittingUser?.first_name, submittingUser?.email)}>Approve</Button>
                        </Tooltip>
                    </div>
                );
            default:
                return (company as any)[columnKey];
        }
    }, []);

    return (
        <>
            <Button
                color='primary'
                variant='bordered'
                radius='sm'
                size='sm'
                startContent={<IoMdRefresh size={20} />}
                onClick={() => router.refresh()}
                className='text-medium mb-3'
            >
                Refresh
            </Button>
            <Table aria-label="Pending companies table" isStriped>
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={companiesData} emptyContent={"There are no pending companies."}>
                    {(item) => (
                        <TableRow key={item.companies.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey as string)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}

export default PendingCompaniesTable