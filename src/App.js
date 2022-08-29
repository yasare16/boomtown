import {  useEffect, useState } from 'react';
import DataTable from './DataTable/DataTable';
import './DataTable/DataTable.css';

//App begins here
function App() {
  const url = 'https://idme-interview.herokuapp.com'
  const [purchases, setPurchases] = useState()
  const [loading, setLoading] = useState(true)

  
  useEffect(() => {
    const fetchPurchases = async () => {
      const payload = await fetch(url)
        .then(response => response.json())
        .catch(response => console.error(response.status, response.text))
      setPurchases(payload)
    }
    fetchPurchases()
    setLoading(false)
  }, [])
  
  if (loading)
    return (
      <div style={
        {
          height: '100vh',
          paddingBlockStart: '50%',
          textAlign: 'center'
        }}>
        Loading...
      </div>
  )
  
  return (
    
    <div className="App">
      <header className="App-header">
        
      </header>
      <main className="App-main">
        <div className="content container">
          <h1>Purchases</h1>
          <DataTable data={purchases} />
        </div>
      </main>
    </div>
    
  )
}

export default App;
