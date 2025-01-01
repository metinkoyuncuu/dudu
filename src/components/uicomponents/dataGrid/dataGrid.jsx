import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'; // PDF oluşturmak için gerekli
import 'jspdf-autotable';
import './dataGrid.css';

const DataGrid = React.memo(({
    fetchData,
    columns,
    fileName = 'My_data',
    gridWidth = '98%',
    columnSpacing = '10px',
    showXlsxButton = true,
    showXlsButton = true,
    showCsvButton = true,
    showTxtButton = true,
    showPdfButton = true,
    gridPosition = { x: '0px', y: '0px' },
    enableFilter = true,
    enableSort = true,
    rowsPerPage: externalRowsPerPage = 10,
}) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(externalRowsPerPage);
    const [filters, setFilters] = useState({});
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const result = await fetchData();
            setData(result);
            setFilteredData(result);
            setLoading(false);
        };
        loadData();
    }, [fetchData]);

    const handleFilterChange = useCallback((field, value) => {
        setFilters((prevFilters) => {
            const newFilters = {
                ...prevFilters,
                [field]: value,
            };
            return newFilters;
        });
    }, []);

    useEffect(() => {
        const applyFilter = () => {
            let updatedData = [...data];
            Object.keys(filters).forEach((key) => {
                const filterValue = filters[key];
                if (filterValue) {
                    updatedData = updatedData.filter((row) => {
                        const cellValue = String(row[key] || '').toLowerCase();
                        return cellValue.includes(filterValue.toLowerCase());
                    });
                }
            });
            setFilteredData(updatedData);
            setPage(1); // Filtreleme sonrası sayfayı başa döndür
        };

        applyFilter();
    }, [filters, data]);

    const exportToExcel = useCallback((fileType) => {
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] };

        if (fileType === 'xlsx') {
            XLSX.writeFile(wb, `${fileName}.xlsx`);
        } else if (fileType === 'xls') {
            XLSX.writeFile(wb, `${fileName}.xls`);
        } else if (fileType === 'txt') {
            const txtData = filteredData.map(row => Object.values(row).join('\t')).join('\n');
            const blob = new Blob([txtData], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${fileName}.txt`;
            link.click();
        }
    }, [filteredData, fileName]);

    const exportToPdf = useCallback(() => {
        const doc = new jsPDF();
        const headers = columns.map(col => col.header);
        const rows = filteredData.map(row => columns.map(col => row[col.field]));

        doc.text(fileName, 20, 10);
        doc.autoTable({
            head: [headers],
            body: rows,
        });

        doc.save(`${fileName}.pdf`);
    }, [filteredData, columns, fileName]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIdx = (page - 1) * rowsPerPage;
    const endIdx = page * rowsPerPage;
    const paginatedData = filteredData.slice(startIdx, endIdx);

    const memoizedColumns = useMemo(() => columns, [columns]);

    return (
        <div
            className="datagrid-container"
            style={{
                width: gridWidth,
                position: 'absolute',
                left: gridPosition.x,
                top: gridPosition.y
            }}
        >
            <div className="export-buttons">
                {showXlsxButton && (
                    <button
                        id="xlsx-button"
                        name="xlsx-button"
                        className="export-button"
                        onClick={() => exportToExcel('xlsx')}
                        type="button"
                    >
                        XLSX
                    </button>
                )}
                {showXlsButton && (
                    <button
                        id="xls-button"
                        name="xls-button"
                        className="export-button"
                        onClick={() => exportToExcel('xls')}
                        type="button"
                    >
                        XLS
                    </button>
                )}
                {showCsvButton && (
                    <CSVLink data={filteredData} filename={`${fileName}.csv`}>
                        <button
                            id="csv-button"
                            name="csv-button"
                            className="export-button"
                            type="button"
                        >
                            CSV
                        </button>
                    </CSVLink>
                )}
                {showTxtButton && (
                    <button
                        id="txt-button"
                        name="txt-button"
                        className="export-button"
                        onClick={() => exportToExcel('txt')}
                        type="button"
                    >
                        TXT
                    </button>
                )}
                {showPdfButton && (
                    <button
                        id="pdf-button"
                        name="pdf-button"
                        className="export-button"
                        onClick={exportToPdf}
                        type="button"
                    >
                        PDF
                    </button>
                )}
            </div>

            <table className="datagrid" style={{ width: gridWidth, backgroundColor: 'white' }}>
                <thead>
                    <tr>
                        {memoizedColumns.map((col) => (
                            <th key={col.field} style={{ paddingRight: columnSpacing }}>
                                <div className="header-filter-container">
                                    <div className="header-cell">
                                        {col.header}
                                    </div>
                                    {enableFilter && col.filterable && (
                                        <input
                                            type="text"
                                            placeholder={`Filter ${col.header}`}
                                            value={filters[col.field] || ''}
                                            onChange={(e) => handleFilterChange(col.field, e.target.value)}
                                            className="filter-input"
                                        />
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={columns.length}>Loading...</td>
                        </tr>
                    ) : (
                        paginatedData.map((row, index) => (
                            <tr
                                key={index}
                                onClick={() => setSelectedRow(index)}
                                style={{
                                    backgroundColor: selectedRow === index ? 'whitesmoke' : 'transparent',
                                }}
                            >
                                {memoizedColumns.map((col) => (
                                    <td key={col.field} style={{ paddingRight: columnSpacing }}>
                                        {row[col.field]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="pagination">
                <a
                    href="#"
                    className={`ui-paginator-first ui-state-default ui-corner-all ${page === 1 ? 'ui-state-disabled' : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        setPage(1);
                    }}
                    aria-label="First Page"
                >
                    <span>{"<<"}</span>
                </a>
                <a
                    href="#"
                    className={`ui-paginator-prev ui-state-default ui-corner-all ${page === 1 ? 'ui-state-disabled' : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        setPage((prev) => Math.max(prev - 1, 1));
                    }}
                    aria-label="Previous Page"
                >
                    <span>{"<"}</span>
                </a>
                <span>Page {page} of {totalPages}</span>
                <a
                    href="#"
                    className={`ui-paginator-next ui-state-default ui-corner-all ${page === totalPages ? 'ui-state-disabled' : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        setPage((prev) => Math.min(prev + 1, totalPages));
                    }}
                    aria-label="Next Page"
                >
                    <span>{">"}</span>
                </a>
                <a
                    href="#"
                    className={`ui-paginator-last ui-state-default ui-corner-all ${page === totalPages ? 'ui-state-disabled' : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        setPage(totalPages);
                    }}
                    aria-label="Last Page"
                >
                    <span>{">>"}</span>
                </a>
            </div>
        </div>
    );
});

export default DataGrid;
