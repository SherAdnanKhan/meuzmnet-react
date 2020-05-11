import React, { useState, useEffect, Fragment } from 'react';
import { getCurrentUser } from '../actions/authActions';
import { useSelector, useDispatch } from "react-redux"
import { getArt, newArt } from "../actions/artSelectionActions";


const ArtSelection = () => {
  const dispatch = useDispatch();
  const userName = getCurrentUser()?.username;
  const [selectedArt, setSelectedArt] = useState("");
  const [selectedSubArt, setSelectedSubArt] = useState("");
  const [selectedArtName, setSelectedArtName] = useState("");
  const [selectSubArtName, setSubArtName] = useState("");
  const [clickMainArt, setClickMain] = useState(0);
  const [name, setName] = useState("");
  const [subName, setSubName] = useState("");
  const [subArtRadio,setSubArtRadio] = useState(false);
  const [mainArtRadio,setMainArtRadio] = useState(false)
  // const [subArt, setSubArr] = useState({ name: "", parent_id: null });
  const allArts = useSelector(({ artSelections }) => artSelections.artName);

  useEffect(() => {
    dispatch(getArt());

  }, [dispatch]);

  

  function MainArtClick(e, id) {
    e.preventDefault();
    setClickMain(id);
    setName("");
    setSubName("");
  }
  function HandleNext(e){
    e.preventDefault();
    let value = selectedArtName.length > 0
    ? {name: selectedArtName} 
    : selectSubArtName.length > 0
    ? {name: selectSubArtName, parent_id:clickMainArt} 
    : subArtRadio 
    ? {name: subName, parent_id:clickMainArt} 
    :  mainArtRadio 
    ? {name} 
    : {};
    if(Object.keys(value).length === 0){
      alert("Please select on radio button")
    }else {
      dispatch(newArt(value))
    }
   
  }

  return (
    <div className="art-selection">
      <div className="art-selection-header">
        <p>What is your art?</p>
        <p>{userName}</p>
        <p>Whatever you are passionate about, Good at,Simply love doing,that is your art that makes you an artist Select a art category a sub-art or add a new one</p>
      </div>
      <div className="art-selection-table">
        {allArts && allArts.map((art, i) => (
          <Fragment key={i}>
            <div onClick={(e) => MainArtClick(e, art.id)} onDoubleClick={(e) => MainArtClick(e, null)}
              className="art-selection-table-element"
              key={art.id}>
              <hr />
              <input
                type="radio"
                name="artName"
                checked={art.id === selectedArt ? true : false}
                onChange={() => {
                  setSelectedArt(art.id);
                  setSelectedArtName(art.name);
                  setSelectedSubArt("");
                  setSubArtName("")
                  setSubArtRadio(false);
                  setMainArtRadio(false)
                }}
              />
              <label>{art.name}</label>
            </div>
            <div>
            {art.children?.map((subart, j) => (
              <div
                key={j}
                style={{ display: clickMainArt === subart.parent_id ? "block" : "none" }}
                className="art-selection-table-sub-element">
                <input
                  type="radio"
                  name="sub artName"
                  checked={subart.id === selectedSubArt ? true : false}
                  onChange={() => {
                    setSelectedSubArt(subart.id);
                    setSubArtName(subart.name)
                    setSelectedArt("");
                    setSelectedArtName("");
                    setSubArtRadio(false);
                    setMainArtRadio(false)
                  }}
                />
                <label>{subart.name}</label>
              </div>
            ))}
         <div className="art-selection-table-sub-element" style={{display: art.id === clickMainArt ? "block" : "none"}} >
          <input
            type="radio"
            name="artsubRadio"
            checked={subArtRadio}
            onChange={(e) => {
              setSubArtRadio(!subArtRadio);
              setSelectedArt("");
              setSelectedArtName("");
              setSelectedSubArt("");
              setSubArtName("")
              setMainArtRadio(false)
            }}
          />
          <input
            style={{ backgroundColor: "black", color: "white", border: "0px" }}
            type="text"
            name="enterArt"
            value={subName}
            placeholder="Enter Art"
            onChange={
              (e) => {
                setName("");
                setSubName(e.target.value);
              }}
              />
              </div>

            </div>
          </Fragment>
        ))}
        <div className="art-selection-table-element" >
          <hr />
          <input
            type="radio"
            name="artName"
            checked={mainArtRadio}
            onChange={() =>
               {
                 setMainArtRadio(!mainArtRadio);
                 setSelectedArt("");
                 setSelectedArtName("");
                 setSelectedSubArt("");
                 setSubArtName("");
                 setSubArtRadio(false);
                 
                } }
          />
          <input
            style={{ backgroundColor: "black", color: "white", border: "0px" }}
            type="text"
            name="enterArt"
            value={name}
            placeholder="Enter Art"
            onChange={
              (e) => {
                setSubName("");
                setName(e.target.value);
              }}
          />
        </div>
      </div>
      <div className="art-selection-nextBtn">
        <button disabled={!selectedArtName.length > 0 &&  !selectSubArtName.length > 0 && subArtRadio && mainArtRadio} 
        onClick= { (e) => HandleNext(e)}>Next</button>

       
      </div>
    </div>
  )
}
export default ArtSelection;

