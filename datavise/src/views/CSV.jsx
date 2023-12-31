import React, { useState } from 'react';
import Papa from 'papaparse';
import { Button, Table, Input } from 'semantic-ui-react';
import { UilArrowLeft, UilArrowRight, UilTrashAlt, UilExport } from '@iconscout/react-unicons';


function CSV() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [csvLoaded, setCsvLoaded] = useState(false);

  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length === 0) {
      setFilteredData(data);
    } else {
      const filtered = data.filter(row => 
        Object.values(row).some(
          value => value.toString().toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setFilteredData(filtered);
    }
    setCurrentPage(1);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          setData(result.data);
          setFilteredData(result.data);
          setCsvLoaded(true);
          e.target.value = '';
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  };

  const handleEdit = (rowIndex, colIndex, value) => {
    const newData = [...data];
    newData[rowIndex][colIndex] = value;
    setData(newData);
  };

  const handleDelete = (rowIndex) => {
    const newData = data.filter((_, index) => index !== rowIndex);
    setData(newData);
  };

  const handleExport = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'export.csv');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = searchTerm ? filteredData.slice(indexOfFirstRow, indexOfLastRow) : data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = searchTerm ? Math.ceil(filteredData.length / rowsPerPage) : Math.ceil(data.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div>
      {/* Bouton d'importation */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <input type="file" id="file" accept=".csv" onChange={handleFileChange} />
      </div>
  
      {csvLoaded && (
        <>
          {/* Boutons d'exportation et pour continuer */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
            <Button onClick={handleExport} style={{ borderRadius: '50%', backgroundColor: 'emerald' }}>
              <UilExport />
            </Button>
            <Button onClick={() => alert('To be Continued')} style={{ borderRadius: '50%', backgroundColor: 'emerald' }}>
              <UilArrowRight />
            </Button>
          </div>
  
          {/* Barre de recherche */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <Input
              icon='search'
              placeholder='Rechercher...'
              onChange={handleSearchChange}
              value={searchTerm}
            />
          </div>
  
          {/* Tableau */}
          <div style={{ 
            maxWidth: '80%',
            margin: 'auto', 
            overflowX: 'auto', 
            padding: '20px',
            paddingRight: '20px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', 
            backgroundColor: '#fff', 
          }}>
            <Table striped style={{ textAlign: 'center', borderCollapse: 'collapse' }}>
              <Table.Header style={{ 
                  backgroundColor : "#95BAEA",
                  color: 'black'
                }}>
                <Table.Row>
                  {data[0] && Object.keys(data[0]).map((header) => (
                    <Table.HeaderCell key={header} style={{ border: '1px solid #ddd', padding: '8px' }}>
                      {header}
                    </Table.HeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {currentRows.map((row, rowIndex) => (
                  <Table.Row key={rowIndex} style={{ backgroundColor: rowIndex % 2 === 0 ? '#f9f9f9' : 'white' }}>
                    {Object.entries(row).map(([col, value], colIndex) => (
                      <Table.Cell key={colIndex} style={{ border: '1px solid #ddd', padding: '8px' }}>
                        <input value={value} onChange={(e) => handleEdit(rowIndex, col, e.target.value)} style={{ textAlign: 'center', border: 'none', backgroundColor: 'transparent' }} />
                      </Table.Cell>
                    ))}
                    <Table.Cell style={{ border: '1px solid #ddd', padding: '8px' }}>
                      <Button onClick={() => handleDelete(rowIndex)} style={{ borderRadius: '50%', backgroundColor: 'red', color: 'white' }}>
                        <UilTrashAlt />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            {/* Espace après le tableau */}
             
          </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '5px' }}>
          {/* Bouton précédent */}
          <Button
            circular
            icon
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            style={{ 
              backgroundColor: '#f0f0f0', 
              border: '1px solid #ccc', 
              borderRadius: '10px',
              cursor: 'pointer'
              }}
          >
            <UilArrowLeft />
          </Button>

          {/* Premières pages */}
          {currentPage > 4 && (
            <>
              {Array.from({ length: 2 }, (_, index) => (
                  <Button
                    key={index}
                    circular
                    primary={currentPage === index + 1}
                    onClick={() => paginate(index + 1)}
                    style={{
                      backgroundColor: currentPage === index + 1 ? '#007bff' : '#f0f0f0',
                      color: currentPage === index + 1 ? 'white' : 'black',
                      border: '1px solid #ccc',
                      borderRadius: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    {index + 1}
                  </Button>
              ))}
                <Button
                  circular
                  primary={currentPage === totalPages }
                  style={{
                    backgroundColor:  '#f0f0f0',
                    color:  'black',
                    border: '1px solid #ccc',
                    borderRadius: '10px'
                  }}
                >
                  ...
                </Button>
            </>
          )}

          {/* Pages autour de la page actuelle */}
          {Array.from({ length: 5 }, (_, index) => {
            const page = currentPage - 2 + index;
            return (page > 0 && page <= totalPages) && (
            <Button
              key={page}
              circular
              primary={currentPage === page}
              onClick={() => paginate(page)}
              style={{
                backgroundColor: currentPage === page ? '#007bff' : '#f0f0f0',
                color: currentPage === page ? 'white' : 'black',
                border: '1px solid #ccc',
                borderRadius: '10px',
                cursor: 'pointer'
              }}
            >
              {page}
            </Button>
            );
          })}

          {/* Ellipse et dernière page si nécessaire */}
          {currentPage < totalPages - 3 && (
            <>
              <Button
                circular
                primary={currentPage === totalPages }
                style={{
                  backgroundColor: '#f0f0f0',
                  color:  'black',
                  border: '1px solid #ccc',
                  borderRadius: '10px'
                }}
              >
                ...
              </Button>

              <Button
                circular
                primary={currentPage === totalPages}
                onClick={() => paginate(totalPages)}
                style={{ 
                  backgroundColor: currentPage === totalPages ? '#007bff' : '#f0f0f0',
                  color: currentPage === totalPages ? 'white' : 'black',
                  border: '1px solid #ccc', 
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
              >{totalPages}
              </Button>
            </>
          )}

          {/* Bouton suivant */}
          <Button
            circular
            icon
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
            style={{ 
              backgroundColor: '#f0f0f0', 
              border: '1px solid #ccc', 
              borderRadius: '10px',
              cursor: 'pointer'
            }}
          >
            <UilArrowRight />
          </Button>
        </div>
      </>
      )}
    </div>
  );
}

export default CSV;
