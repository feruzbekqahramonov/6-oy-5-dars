import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [gend, setGend] = useState('')
  const [desc, setDesc] = useState('')
  const [nat, setNat] = useState('uzbek')

  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')))

  function getData() {
    let data = []
    if(localStorage.getItem('users')) {
      data = JSON.parse(localStorage.getItem('users'))
    }
    return data
  }

  function handleClick(e) {
    e.preventDefault()
    const obj = {
      id: Date.now(),
      name: name,
      age: age,
      gend: gend,
      nat: nat,
      desc: desc
    }
    let users = getData()
    users.push(obj)
    localStorage.setItem('users', JSON.stringify(users))
    setName('')
    setAge('')
    setGend('')
    setNat('uzbek')
    setDesc('')
  }
  function handleRadio(value) {
    setNat(value)
  }
  function handleDelete(item) {
    let isDelete = confirm('Do you really want to launch this reference?')
    if(isDelete) {
      let copied = JSON.parse(JSON.stringify(users))
      copied = copied.filter(el =>{
        return el.id != item.id
      })
      localStorage.setItem('users', JSON.stringify(copied))
      setUsers(copied)
    }
  }
  return (  
    <>

 <form className="form " >
 <div class="mb-3 cont">
    <label class="form-label" id="name">Name *</label>
    <input type="text" name="name" htmlFor="name" className="form-control" placeholder="Enter name" value={name} onChange={(e)=> {
      setName(e.target.value)
    }}/>
  </div>

  <div class="mb-3 cont">
    <label for="exampleInputEmail1" class="form-label" id="age">Age *</label>
    <input type="number" name="name" className="form-control" htmlFor="age" placeholder="Enter age" value={age} onChange={(e)=> {
      setAge(e.target.value)
    }}/>
  </div>

    <p className="genderr">Gender *</p>
  <select class="form-select cont" aria-label="Default select example" value={gend} onChange={(e) =>{
    setGend(e.target.value)
  }}>
      <option value="Male">Male</option>
      <option value="Woman">Woman</option>
  </select>

  <div className="form-check contt">
    <input type="radio" name="flexRadioDefault" className="form-check-input" id="uzbek" onChange={(e) => {handleRadio(e.target.value)}}/>
    <label className="form-check-label" for="uzbek">Uzbek</label>
  </div>
  <div className="form-check contt1">
    <input type="radio" name="flexRadioDefault" className="form-check-input" id="engilish" onChange={(e) => {handleRadio(e.target.value)}}/>
    <label className="form-check-label" htmlFor="engilish">Engilish</label>
  </div>


  <p >Description *</p>
  <div class="form-floating cont">
  <textarea class="form-control" placeholder="Enter description"  id="floatingTextarea2" value={desc} onChange={(e)=> {
    setDesc(e.target.value)
  }}></textarea>
  <label for="floatingTextarea2">Enter Description</label>
  </div>

  <button onClick={handleClick} type="button" class="btn btn-primary button">Submit</button>
 </form>

 <table class="table table-striped" >
  <thead className="table">
  <tr>
      <th scope="col">User</th>
      <th scope="col">Name</th>
      <th scope="col">Age</th>
      <th scope="col">Gender</th>
      <th scope="col">Nation</th>
      <th scope="col">Description</th>
      <th scope="col">Launch</th>
    </tr>
  </thead>
  <tbody>
   {
    users && users.map((el, index) => {
      console.log(users);
      return( 
      <tr key={index}>
        <th scope="row"><i class="fa-solid fa-user"></i></th>
        <td>{el.name}</td>
        <td>{el.age}</td>
        <td>{el.gend}</td>
        <td>{el.nat}</td>
        <td>{el.desc}</td>
        <td onClick={() => {handleDelete(el)}}><i class="fa-regular fa-trash-can"></i></td>
      </tr>)
    })
   }
  
  </tbody>
</table>
    </>
  )
}

export default App;
