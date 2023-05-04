import {useState} from 'react';
import {connect} from 'react-redux';
import {add, remove, update} from "./redux/actions";
import './App.css';

const mapStateToProps = (state) => ({items: state.reducer.items});

const mapDispatchToProps = {
  add,
  remove,
  update,
};

function App({items, add, remove, update}) {
  const [text, setText] = useState("");
  const [modalVis, setModalVis] = useState(false);
  const [updateText, setUpdateText] = useState("");
  const [ind, setIndex] = useState(-1);
  const [err, setErr] = useState(false);
  const [modErr, setModErr] = useState(false);

  const openModal = (i) => {
    setModalVis(true)
    setIndex(i)
  }

  const listItems = items.map((item, i) => {
    return <ToDoList key={i} value={item} del={() => remove(i)} upd={() => openModal(i) } />;
  });

  const updateChange = (changeText) => {
    if (updateText.trim() === ""){
      setModErr(true)
    }
    else{
      update(ind, changeText);
      setModalVis(false);
      setUpdateText("")
      setModErr(false)
    }
  }

 const insertItem = () => {
  if (text.trim() === ""){
    setErr(true)
  }else{
    add(text)
    setText("")
    setErr(false)
  }
 }

  return (
    <div className="App">
      <h1>To-Do List w/Redux</h1><br/>
      {err && <h4>Enter something before submitting</h4>}
      <input
        id="input"
        name="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
        type="text"
        placeholder="Enter to-do Item"
      />
      <button onClick={insertItem}>Enter</button>
      <div>{listItems}</div>
      {modalVis && <UpdateModal visible={() => setModalVis(false)} value={updateText} ochandler={(e) => setUpdateText(e.target.value)} updater={() => updateChange(updateText)} errors={modErr}/>} 
    </div>
  );
}

function ToDoList({value, del, upd}){
  return(
    <div className="todo-item">
      <p>{value}</p>
      <div className="button-container">
        <button className="delete-button" onClick={del}>X</button>
        <button className="edit-button" onClick={upd}>Edit</button>
      </div>
    </div>
  )
}

function UpdateModal({visible, updater, value, ochandler, errors }){
  return(
    <div className="modal">
      <div className="modal-content">
        <h3>Update Item</h3>
        {errors && <h4>Enter something before submitting</h4>}
        <input type="text" name="text" placeholder='Update Text' value={value} onChange={ochandler} />
        <div className="button-container">
          <button className="update-button" onClick={updater}>Update</button>
          <button className="cancel-button" onClick={visible}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App);