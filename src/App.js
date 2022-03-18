
import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const URL = 'http://localhost/ostoslista/';




function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);
  const [amount, setAmount] = useState("");


  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setItems(response.data);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error);


      });
  }, []);

  function save(e) {
    e.preventDefault();

    const json = JSON.stringify({ description: item, amount: amount });
    axios.post(URL + 'add.php', json, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        setItems(items => [...items, response.data]);
        setItem('');
        setAmount(items => [...items, response.data]);
        setAmount("");
      }).catch(error => {
        alert(error.response ? error.response.data.error : error);
      })
  }

  function remove(id) {
    const json = JSON.stringify({ id: id })
    axios.post(URL + 'delete.php', json, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        const newListWithoutRemoved = items.filter((item) => item.id !== id);
        setItems(newListWithoutRemoved);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error);
      });
  }

  return (
    <div className='container'>
      <form onSubmit={save} >
        <h1>Ostoslista</h1>
        <label htmlFor="">Täydennä ostoslistaa!</label>
        <input value={item} placeholder="Lisää uusi tuote" onChange={e => setItem(e.target.value)} />
        <input value={amount} placeholder="Lisää määrä" onChange={e => setAmount(e.target.value)} />
        <button>Tallenna</button>
      </form>

      <ol>
        {items?.map(item => (
          <li key={item.id}>{item.description} {item.amount}
            <a className='delete' onClick={() => remove(item.id)} href='#'> Delete</a></li>
        ))}
      </ol>
    </div>
  );
}

export default App;