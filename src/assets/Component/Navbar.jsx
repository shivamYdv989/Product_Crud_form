import React from 'react'

const Navbar = (props) => {
  //console.log(props.a)
  const {updateData, data,brand}= props
  return (
    <nav>
      <h2>Shivam</h2>
      <div class="text1">
        <h4 class="text">About {brand} </h4>
        <h4 class="text">Contact</h4>
        <h4 class="text">Services</h4>
        <h4 class="text">Yours</h4>
      </div>
      {/* <button onClick={()=>updateData(data+1)} >increment</button> */}
    </nav>
  )
}
export default Navbar