import React, { useEffect, useState } from "react"
function App() {
  let data = localStorage.getItem('products');
  const [action, setAction] = useState('')
  const [editid, setEditid] = useState('')
  const [title, setTitle] = useState('');
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [sellingPrice, setSellPrice] = useState('')
  const saveProduct = (e) => {
    e.preventDefault();
    data = data ?? [];
    if (data.findIndex(product => product.title === title) < 0) {
      data = [...data, { title: title, qty: quantity, cp: price, sp: sellingPrice }];
      localStorage.setItem('products', JSON.stringify(data));
      resetForm();
    }
    else {
      alert('Product already exists');
    }
  },
    resetForm = () => {
      setPrice('');
      setTitle('');
      setQuantity('');
      setSellPrice('');
    },

    updateProduct = id => {
      data[id].title = title;
      data[id].qty = quantity;
      data[id].cp = price;
      data[id].sp = sellingPrice;
      localStorage.setItem('products', JSON.stringify(data));
      setAction('data updated')
      setEditid('')
      resetForm()
  },
    previewUpdate = i => {
      setPrice( data[i].cp);
      setTitle(data[i].title);
      setQuantity(data[i].qty);
      setSellPrice(data[i].sp);    
      setAction('edit')
      setEditid(i)
    },
    deleteProduct = i => {
      if (confirm('Are you sure you want to delete this product?')) {
        data.splice(i, 1);
        localStorage.setItem('products', JSON.stringify(data));
        setAction('deleted')
      }
    },
    clearData = () => {
      if (data && confirm('Are you sure you want to clear all data?')) {
        localStorage.removeItem('products');
      }
    };
  const btnCancel = () => resetForm();
  data = JSON.parse(localStorage.getItem('products'));
  return (
    <>
      <div id="container">
        <h2>MANAGE PRODUCTS</h2>
          <div class="form-group">
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} id="title" name="product" placeholder="Product name..." required />
          </div>
          <div class="row">
            <div class="form-group">
              <input type="number" value={quantity}  onChange={(e) => setQuantity(e.target.value)} step=".01" min="0" id="qty" placeholder="Quantity..." required />
            </div>
            <div class="form-group">
              <input type="number" value={price}  onChange={(e) => setPrice(e.target.value)} step=".01" min="0" id="cp" placeholder="Cost Price..." required />
            </div>
            <div class="form-group">
              <input type="number" value={sellingPrice} onChange={(e) => setSellPrice(e.target.value)} step=".01" min="0" id="sp" placeholder="Selling Price.." required />
            </div>
          </div>
          <div style={{textAlign:'end'}}>
          <button onClick={() => btnCancel()} style={{marginRight:'10px'}}>Cancel</button>
          <button onClick={(e) =>action==='edit'?updateProduct(editid):saveProduct(e)} style={{background:'dodgerblue', color:'#fff'}}>{action==='edit'?'Update':'Save'}</button>
          </div>
        <div id="output">
          <h2>PRODUCTS LIST</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>QTY</th>
              <th>COST</th>
              <th>RATE</th>
              <th>ACTION</th>
            </tr>
          </thead>
           {data != null && data.length > 0 ? data.map((item, i) => {
            return (
              <tr>
                <td>{++i}</td>
                <td>{item.title.toUpperCase()}</td>
                <td>{item.qty}</td>
                <td>{parseFloat(item.cp).toFixed(2)}</td>
                <td>{parseFloat(item.sp).toFixed(2)}</td>
                <td style={{textAlign:"center"}}>
                  <button type="button" onClick={()=>previewUpdate(--i)} style={{background:'green', color:'#fff', marginRight:'10px'}}>Edit</button>
                  <button type="button" onClick={()=>deleteProduct(--i)} style={{background:'red', color:'#fff'}}>Delete</button>
                </td>
              </tr>)
          }) : <tr>
            <td colspan="7"><h1 style={{ background: '#f1f1f1', color: '#f00', textAlign: 'center', padding: '40px' }}>No data to show</h1></td>
          </tr>}
        </table>
      </div>
    </>
  )
}

export default App
