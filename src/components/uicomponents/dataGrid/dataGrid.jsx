import React, { useState, useEffect } from 'react';  // React ve gerekli hook'ları içe aktarma
import { CSVLink } from 'react-csv';  // CSVLink'i içe aktarma
import * as XLSX from 'xlsx';  // XLSX'i içe aktarma
import './dataGrid.css';

const DataGrid = ({
    fetchData,
    columns,
    fileName,
    gridWidth = '98%',
    columnSpacing = '10px',
    showXlsxButton = true,
    showXlsButton = true,
    showCsvButton = true,
    showTxtButton = true,
    gridPosition = { x: '0px', y: '0px' },
    enableFilter = true,
    enableSort = true,
}) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filters, setFilters] = useState({});
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const result = await fetchData(page, rowsPerPage);
            setData(result);
            setFilteredData(result);
            setLoading(false);
        };
        loadData();
    }, [page, rowsPerPage, fetchData]);

    const exportToExcel = (type) => {
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `${fileName}.${type}`);
    };

    const handleFilterChange = (column, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [column]: value,
        }));
    };

    useEffect(() => {
        const filtered = data.filter((row) => {
            return columns.every((col) => {
                if (!filters[col.field]) return true;
                return row[col.field]
                    .toString()
                    .toLowerCase()
                    .includes(filters[col.field].toLowerCase());
            });
        });
        setFilteredData(filtered);
    }, [filters, data]);

    const handleSort = (column) => {
        if (column.sortable !== false && enableSort) {
            const newDirection = sortConfig.key === column.field && sortConfig.direction === 'asc' ? 'desc' : 'asc';
            setSortConfig({ key: column.field, direction: newDirection });

            const sortedData = [...filteredData].sort((a, b) => {
                if (a[column.field] < b[column.field]) return newDirection === 'asc' ? -1 : 1;
                if (a[column.field] > b[column.field]) return newDirection === 'asc' ? 1 : -1;
                return 0;
            });
            setFilteredData(sortedData);
        }
    };

    const handleRowClick = (index) => {
        setSelectedRow(index === selectedRow ? null : index);
    };

    // Filter out columns with showNotColumn: true
    const visibleColumns = columns.filter(col => (col.showNotColumn !== undefined ? col.showNotColumn : false) !== true);

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
                    <button onClick={() => exportToExcel('xlsx')} className="export-button">
                        XLSX
                    </button>
                )}
                {showXlsButton && (
                    <button onClick={() => exportToExcel('xls')} className="export-button">
                        XLS
                    </button>
                )}
                {showCsvButton && (
                    <CSVLink data={filteredData} filename={`${fileName}.csv`}>
                        <button className="export-button">CSV</button>
                    </CSVLink>
                )}
                {showTxtButton && (
                    <button onClick={() => exportToExcel('txt')} className="export-button">
                        TXT
                    </button>
                )}
            </div>

            <table className="datagrid" style={{ width: gridWidth, backgroundColor: 'white' }}>
                <thead>
                    <tr>
                        {visibleColumns.map((col) => (
                            <th key={col.field} style={{ paddingRight: columnSpacing }}>
                                <div className="header-filter-container">
                                    <div className="header-cell" onClick={() => handleSort(col)}>
                                        {col.header}
                                        <span className="sort-arrow">
                                            {(sortConfig.key === col.field) ? (sortConfig.direction === 'asc' ? '↓' : '↑') : '↓'}
                                        </span>
                                    </div>
                                    {enableFilter && col.filterable && (
                                        <input
                                            type="text"
                                            placeholder={`Filter ${col.header}`}
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
                            <td colSpan={visibleColumns.length}>Loading...</td>
                        </tr>
                    ) : (
                        filteredData.map((row, index) => (
                            <tr
                                key={index}
                                onClick={() => handleRowClick(index)}
                                style={{
                                    backgroundColor: selectedRow === index ? 'whitesmoke' : 'transparent',
                                }}
                            >
                                {visibleColumns.map((col) => (
                                    <td key={col.field} style={{ paddingRight: columnSpacing }}>
                                        {col.render ? col.render(row[col.field]) : row[col.field]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="pagination">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span>Page {page}</span>
                <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
            </div>
        </div>
    );
};

export default DataGrid;
