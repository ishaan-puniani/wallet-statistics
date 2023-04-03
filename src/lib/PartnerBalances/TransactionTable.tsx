import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_HOST } from '../../constants';
import { usePagination, useTable } from 'react-table';

export interface IPartnerTransactionTable {
    userId: string;
    currency: string;
    credentials: any;
    showRaw: boolean;
}

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        usePagination
    )

    // Render the UI for your table
    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup: any) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row: any, i: any) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell: any) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {/* 
          Pagination can be built however you'd like. 
          This is just a very basic UI implementation:
        */}
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                    />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}
const TransactionTable = (props: IPartnerTransactionTable) => {
    const [loading, setLoading] = useState(false);
    const [transactionTable, setTransactionTable] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const fetchTransactionTable = await axios.post(
                `${API_HOST}/tenant/${props.credentials.application_id}/get-transaction?limit=100&offset=0`,
                {
                    ...props.credentials,
                }
            );
            if (fetchTransactionTable.data) {
                const items = fetchTransactionTable.data.rows
                const tableData: any = []
                items?.map((data: any, idx: any) => {
                    const newObject = {
                        id: idx + 1, date: data?.createdAt.split('T')[0], currency: data?.currency, transactionType: data?.transactionType?.name, amount: parseFloat(data?.amount).toFixed(3), actions: [
                            'https://i.ibb.co/7N3L55P/send.png',
                            'https://i.ibb.co/rky41tH/view.png',
                            'https://i.ibb.co/T4bQsPv/download.png',
                        ],
                    }
                    tableData.push(newObject)
                    setTransactionTable(tableData)
                })
            }
            setLoading(false);
        };
        fetchData();
    }, [props.userId, props.currency]);
    const columns = [
        {
            Header: 'Id',
            accessor: 'id',
        },
        {
            Header: 'Date',
            accessor: 'date',
        },
        {
            Header: 'Currency',
            accessor: 'currency',
        },
        {
            Header: 'Transaction Type',
            accessor: 'transactionType',
        },
        {
            Header: 'Amount',
            accessor: 'amount',
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ value }) => (
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'center' }}>
                    {value?.map((image: any, index: any) => (
                        <img key={index} src={image} style={{ width: '24px', height: '24px' }} alt={`Image ${index}`} />
                    ))}
                </div>
            )
        },
    ]
    return (
        <TransactionTableWrapper>
            {loading && <h1>Loading</h1>}
            {!loading && transactionTable?.length > 0 && (
                <Table columns={columns} data={transactionTable} />
            )}
        </TransactionTableWrapper>
    );
};

const TransactionTableWrapper = styled.div`
padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

export default TransactionTable;