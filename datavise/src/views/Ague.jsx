import React, { useState } from 'react';
import Papa from 'papaparse';
import { useTable } from 'react-table';
import * as XLSX from 'xlsx';

const Ague = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      let parsedData;
      const fileExt = file.name.split('.').pop();

      if (fileExt === 'csv') {
        parsedData = Papa.parse(event.target.result, { header: true });
        setColumns(Object.keys(parsedData.data[0]).map(header => ({ Header: header, accessor: header })));
        setData(parsedData.data);
      } else if (fileExt === 'xlsx' || fileExt === 'xls') {
        const workbook = XLSX.read(event.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        parsedData = XLSX.utils.sheet_to_json(sheet);
        setColumns(Object.keys(parsedData[0]).map(header => ({ Header: header, accessor: header })));
        setData(parsedData);
      }
    };

    if (file) {
      if (file.name.endsWith('.csv')) {
        reader.readAsText(file);
      } else {
        reader.readAsBinaryString(file);
      }
    }
  };

  const handleExport = () => {
    // Logique pour exporter les données modifiées
  };

  const tableInstance = useTable({ columns, data });

  return (
    <div>
      <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileUpload} />
      <div style={{ overflowX: 'auto' }}>
        {/* Affichage de la table avec react-table */}
      </div>
      <button onClick={handleExport}>Exporter votre CSV</button>
      <button onClick={() => alert('UwU')}>Continuer</button>
    </div>
  );
};

export default Ague;
