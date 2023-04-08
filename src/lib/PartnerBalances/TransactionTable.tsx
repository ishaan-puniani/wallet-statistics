import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { API_HOST } from "../../constants";
import { usePagination, useTable } from "react-table";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Modal from "react-modal";
import TransactionDetails from "../Transactions/TransactionDetails";

export interface IPartnerTransactionTable {
    userId: string;
    currency: string;
    credentials: any;
    showRaw: boolean;
}
export interface IPartnerTable {
    columns: any;
    data: any;
}

function Table({
    columns,
    data,
    fetchData,
    loading,
    pageCount: controlledPageCount
}: any) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        // Get the state from the instance
        state: { pageIndex, pageSize },
    }: any = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 }, // Pass our hoisted table state
            manualPagination: true, // Tell the usePagination
            // hook that we'll handle our own data fetching
            // This means we'll also have to provide our own
            // pageCount.
            pageCount: controlledPageCount,
        } as any,
        usePagination
    );

    // Listen for changes in pagination and use the state to fetch our new data
    React.useEffect(() => {
        fetchData({ pageIndex, pageSize });
    }, [fetchData, pageIndex, pageSize]);

    // Render the UI for your table
    return (
        <>
            {/* <pre>
                    <code>
                        {JSON.stringify(
                            {
                                pageIndex,
                                pageSize,
                                pageCount,
                                canNextPage,
                                canPreviousPage,
                            },
                            null,
                            2
                        )}
                    </code>
                </pre>    */}
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup: any) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? " 🔽"
                                                : " 🔼"
                                            : ""}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row: any, i: number) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell: any) => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                    <tr>
                        {loading ? (
                            // Use our custom loading state to show a loading indicator
                            <td colSpan={10000}>Loading...</td>
                        ) : (
                            <td colSpan={10000}>
                                Showing {page.length} of ~{controlledPageCount * pageSize}{" "}
                                results
                            </td>
                        )}
                    </tr>
                </tbody>
            </table>
            {/* 
          Pagination can be built however you'd like. 
          This is just a very basic UI implementation:
        */}
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {"<<"}
                </button>{" "}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {"<"}
                </button>{" "}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {">"}
                </button>{" "}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {">>"}
                </button>{" "}
                <span>
                    Page{" "}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{" "}
                </span>
                <span>
                    | Go to page:{" "}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            gotoPage(page);
                        }}
                        style={{ width: "100px" }}
                    />
                </span>{" "}
                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}

const TransactionTable = (props: IPartnerTransactionTable) => {
    // const [loading, setLoading] = useState(false);
    const [transactionTable, setTransactionTable] = useState([]);
    const [transactionForDetails, setTransactionForDetails] = useState();
    const [transactionTableCount, setTransactionTableTotal] = useState([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         // setLoading(true);
    //         const fetchTransactionTable = await axios.post(
    //             `${API_HOST}/tenant/${props.credentials.application_id}/get-transaction?limit=${props.defaultPageSize}&offset=0`,
    //             {
    //                 ...props.credentials,
    //             }
    //         );
    //         if (fetchTransactionTable.data) {
    //             const items = fetchTransactionTable.data.rows
    //             setTransactionTableTotal(fetchTransactionTable?.data?.count)
    //             setRawData(items)
    //             const tableData: any = []
    //             items?.map((data: any, idx: any) => {
    //                 const newObject = {
    //                     id: idx + 1, date: data?.createdAt.split('T')[0], currency: data?.currency, transactionType: data?.transactionType?.name, amount: parseFloat(data?.amount).toFixed(3), actions: [
    //                         'https://i.ibb.co/7N3L55P/send.png',
    //                         'https://i.ibb.co/rky41tH/view.png',
    //                         'https://i.ibb.co/T4bQsPv/download.png',
    //                     ],
    //                 }
    //                 tableData.push(newObject)
    //                 setTransactionTable(tableData)
    //             })
    //         }
    //         // setLoading(false);
    //     };
    //     fetchData();

    // }, [props.userId, props.defaultPageSize]);

    const [detailsDialogVisible, setDetailsDialogVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [pageCount, setPageCount] = React.useState(0);
    const fetchIdRef = React.useRef(0);

    const fetchData = React.useCallback(async ({ pageSize, pageIndex }: any) => {
        // This will get called when the table needs new data
        // You could fetch your data from literally anywhere,
        // even a server. But for this example, we'll just fake it.

        // Give this fetch an ID
        const fetchId = ++fetchIdRef.current;

        // Set the loading state
        setLoading(true);

        // We'll even set a delay to simulate a server here

        // Only update the data if this is the latest fetch
        if (fetchId === fetchIdRef.current) {
            const startRow = pageSize * pageIndex;
            //   const endRow = startRow + pageSize

            const fetchTransactionTable = await axios.post(
                `${API_HOST}/tenant/${props.credentials.application_id}/get-transaction?limit=${pageSize}&offset=${startRow}`,
                {
                    ...props.credentials,
                }
            );
            if (fetchTransactionTable.data) {
                const items = fetchTransactionTable.data.rows;
                setTransactionTable(items);
                setPageCount(fetchTransactionTable.data.count);
            }

            // Your server could send back total page count.
            // For now we'll just fake it, too
            // setPageCount(Math.ceil(serverData.length / pageSize))

            setLoading(false);
        }
    }, []);

    const columns = [
        {
            Header: "Id",
            accessor: "id",
        },
        {
            Header: "Date",
            accessor: "createdAt",
        },
        {
            Header: "Currency",
            accessor: "currency",
        },
        {
            Header: "Transaction Type",
            accessor: "transactionTypeIdentifier",
        },
        {
            Header: "Amount",
            accessor: "amount",
        },
        {
            Header: "Virtual Value",
            accessor: "virtualValue",
        },
        {
            Header: "Actions",
            accessor: "actions",
            Cell: ({ row }: any) => {
                const record = row.values;
                return (
                    <div
                        style={{
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src={"https://i.ibb.co/rky41tH/view.png"}
                            style={{ width: "24px", height: "24px" }}
                            onClick={() => {
                                setTransactionForDetails(record.id);
                                setDetailsDialogVisible(true);
                            }}
                        ></img>
                        {/* {record?.value?.map((image: any, index: any) => (
            <img
              key={index}
              src={image}
              style={{ width: "24px", height: "24px" }}
              alt={`Image ${index}`}
            />
          ))} */}
                    </div>
                );
            },
        },
    ];

    const afterDetailsDialogClose = () => {

    };
    const doCloseDetailsDialog = () => {
        setTransactionForDetails(undefined);
        setDetailsDialogVisible(false);
    };

    return (
        <TransactionTableWrapper>
            {/* {loading && <h1>Loading</h1>} */}
            {props.showRaw ? (
                <>
                    {transactionTable?.map((item) => (
                        <>
                            <div className="card">
                                <SyntaxHighlighter language="javascript" style={docco}>
                                    {JSON.stringify(item, null, 2)}
                                </SyntaxHighlighter>
                            </div>
                        </>
                    ))}
                </>
            ) : (
                <>
                    <>
                        <Table
                            columns={columns}
                            data={transactionTable}
                            fetchData={fetchData}
                            loading={loading}
                            pageCount={pageCount}
                        />

                        <Modal
                            isOpen={detailsDialogVisible}
                            onAfterOpen={afterDetailsDialogClose}
                            onRequestClose={doCloseDetailsDialog}
                            //   style={customStyles}
                            contentLabel="Example Modal"
                        >
                            <h1>Transaction Details</h1>
                            <p>{transactionForDetails}</p>
                            <TransactionDetails
                                credentials={props.credentials}
                                transactionId={transactionForDetails}
                                showRaw
                                loadLinkedTransactions={true}
                                loadLinkedAchievements={true}
                            />
                        </Modal>
                    </>
                </>
            )}
        </TransactionTableWrapper>
    );
};

const TransactionTableWrapper = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    width: 100%;
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
