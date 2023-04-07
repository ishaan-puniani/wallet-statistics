import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_HOST } from '../../constants';
import { usePagination, useTable } from 'react-table';
import { TableInstance } from 'react-table';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface MyTable extends TableInstance {
    page: any; // Replace 'any' with the type of your data if applicable
    canPreviousPage: any;
    canNextPage: any;
    pageOptions: any;
    pageCount: any;
    gotoPage: any;
    nextPage: any;
    previousPage: any;
    setPageSize: any;
    state: any;
    pageIndex: number
}

export interface IPartnerTransactionTable {
    userId: string;
    currency: string;
    credentials: any;
    showRaw: boolean;
    dataLimit: number;
}
export interface IPartnerTable {
    columns: any;
    data: any;
}
function Table({ columns, data }: IPartnerTable) {
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
            // initialState: { pageIndex: 4 }, // This initialState set which table page show, when we see the table
        },
        usePagination
    ) as MyTable
    // const { pageIndex, pageSize } = state
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
    // const [loading, setLoading] = useState(false);
    const [transactionTable, setTransactionTable] = useState([]);
    const [rawData, setRawData] = useState([]);
    const [transactionTableCount, setTransactionTableTotal] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            // setLoading(true);
            const fetchTransactionTable = await axios.post(
                `${API_HOST}/tenant/${props.credentials.application_id}/get-transaction?limit=${props.dataLimit}&offset=0`,
                {
                    ...props.credentials,
                }
            );
            if (fetchTransactionTable.data) {
                const items = fetchTransactionTable.data.rows
                setTransactionTableTotal(fetchTransactionTable?.data?.count)
                setRawData(items)
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
            // setLoading(false);
        };
        fetchData();
    }, [props.userId, props.dataLimit]);
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
            Cell: ({ value }: any) => (
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
            {/* {loading && <h1>Loading</h1>} */}

            {props.showRaw ? <>

                <h2>Total Transaction Number : {transactionTableCount}</h2>
                {rawData?.map(item => <>
                    <div className="card">
                        <SyntaxHighlighter language="javascript" style={docco}>
                            {JSON.stringify(item, null, 2)}
                        </SyntaxHighlighter>
                    </div>
                </>)}
            </> : <>
                {transactionTable?.length > 0 && (<>
                    <h2>Total Transaction Number : {transactionTableCount}</h2>
                    <Table columns={columns} data={transactionTable} />
                </>
                )}
            </>}
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