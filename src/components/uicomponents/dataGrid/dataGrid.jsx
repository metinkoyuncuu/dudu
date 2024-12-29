import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
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
    gridPosition = { x: '0px', y: '0px' },
    enableFilter = true,
    enableSort = true,
    rowsPerPage: externalRowsPerPage = 10,
}) => {
    const [data, setData] = useState([]); // Tüm veri
    const [filteredData, setFilteredData] = useState([]); // Filtrelenmiş veri
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1); // Sayfa numarası
    const [rowsPerPage, setRowsPerPage] = useState(externalRowsPerPage); // Sayfa başına satır sayısı
    const [filters, setFilters] = useState({}); // Filtreler
    const [selectedRow, setSelectedRow] = useState(null); // Seçilen satır

    // Veriyi yükle (sadece ilk kez yükleme ve filtreleme değiştiğinde)
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const result = await fetchData(); // Veriyi al
            setData(result); // Veriyi set et
            setFilteredData(result); // Filtrelenmiş veriyi de set et
            setLoading(false);
        };
        loadData();
    }, [fetchData]); // fetchData değiştiğinde veri yükle

    // Sayfa verisini ayarla (sayfa değiştirildiğinde)
    const handlePageChange = useCallback((newPage) => {
        setPage(newPage); // Sayfa numarasını güncelle
    }, []);

    // Filtremeyi yönetme
    const handleFilterChange = useCallback((field, value) => {
        setFilters((prevFilters) => {
            const newFilters = {
                ...prevFilters,
                [field]: value,
            };
            applyFilter(newFilters); // Filtreleme işlemini uygula
            return newFilters;
        });
    }, []);

    // Filtreleme işlemi
    const applyFilter = (filters) => {
        let updatedData = [...data];

        // Filtrele
        for (const key in filters) {
            if (filters[key]) {
                updatedData = updatedData.filter((row) =>
                    String(row[key]).toLowerCase().includes(filters[key].toLowerCase())
                );
            }
        }

        setFilteredData(updatedData);
        setPage(1); // Filtre uygulandıktan sonra ilk sayfaya dön
    };

    // Dışa aktarım işlemleri
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

    // Sayfa verisini hesapla
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
                        {memoizedColumns.map((col) => (
                            <th key={col.field} style={{ paddingRight: columnSpacing }}>
                                <div className="header-filter-container">
                                    <div className="header-cell">
                                        {col.header}
                                    </div>
                                    {enableFilter && col.filterable && (
                                        <input
                                            key={col.field} // Her input için benzersiz bir key
                                            type="text"
                                            placeholder={`Filter ${col.header}`}
                                            value={filters[col.field] || ''} // İlgili filtre değerini göster
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
                        handlePageChange(1);
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
                        handlePageChange(Math.max(page - 1, 1));
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
                        handlePageChange(Math.min(page + 1, totalPages));
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
                        handlePageChange(totalPages);
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
