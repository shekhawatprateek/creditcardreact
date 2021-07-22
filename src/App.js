// Note :- ant-design and sweetalert2 is only used for icons and alerts not for CSS

import { useState } from "react";
import "./App.css";
import { DeleteOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

function App() {
  // States for individual inputs
  const [Adata, setAdata] = useState("");
  const [Bdata, setBdata] = useState("");
  const [Cdata, setCdata] = useState("");
  const [Ddata, setDdata] = useState("");

  // state for data showing in list
  const [fullData, setfullData] = useState([]);

  // Adding data to be displayed in list
  var full = Adata + Bdata + Cdata + Ddata;
  // console.log(fullData);

  // this function execute when user enter number manually
  const dataInsert = (e) => {
    // console.log(e.target.value);
    var target = e.target;
    var maxLength = parseInt(target.attributes["maxlength"].value, 10);
    // console.log(maxLength);
    var myLength = target.value.length;
    if (myLength >= maxLength) {
      var next = target;
      while ((next = next.nextElementSibling)) {
        if (next == null) break;
        if (next.tagName.toLowerCase() === "input") {
          next.focus();
          break;
        }
      }
    }
    // Move to previous field if current field empty
    else if (myLength === 0) {
      var previous = target;
      while ((previous = previous.previousElementSibling)) {
        if (previous == null) break;
        if (previous.tagName.toLowerCase() === "input") {
          previous.focus();
          break;
        }
      }
    }
  };

  // this function executes when user copy/paste the number
  const dataPaste = (e) => {
    // fetch data from Clipboard
    const copiedText = e.clipboardData.getData("text/plain");
    // console.log(copiedText.length);
    if (copiedText.length === 16) {
      const copiedforA = copiedText.slice(0, 4);
      const copiedforB = copiedText.slice(4, 8);
      const copiedforC = copiedText.slice(8, 12);
      const copiedforD = copiedText.slice(12, 16);
      // console.log(copiedforA, copiedforB, copiedforC, copiedforD);
      setAdata(copiedforA);
      setBdata(copiedforB);
      setCdata(copiedforC);
      setDdata(copiedforD);

      // focus on last input field after paste data
      const next = e.target.nextElementSibling;
      next.parentNode.querySelector(":last-of-type").focus();
    } else {
      // alert("Please Enter 16 Digit Code");
      Swal.fire("Please Enter 16 Digit Code");
    }
  };

  // Add Card Number to list on pressing Submit
  const addNumber = (e) => {
    e.preventDefault();
    console.log("submitted");
    setfullData([...fullData, full]);
    setAdata("");
    setBdata("");
    setCdata("");
    setDdata("");
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Added Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // Delete Card Number from list on pressing delete
  const deleteNumber = (deleted) => {
    const filtered = fullData.filter((val) => {
      return val !== deleted;
    });
    setfullData([...filtered]);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Deleted",
      showConfirmButton: false,
      timer: 1500,
    });
    // console.log(filtered);
  };

  return (
    <div className="container" onKeyDown={dataInsert} onPaste={dataPaste}>
      <div className="credit__card">
        <div className="container__heading">
          <h1>Credit Card</h1>
        </div>
        <div className="container__inputs">
          <input
            value={Adata}
            onChange={(e) => setAdata(e.target.value)}
            type="text"
            maxLength="4"
          />
          <input
            value={Bdata}
            onChange={(e) => setBdata(e.target.value)}
            type="text"
            maxLength="4"
          />
          <input
            value={Cdata}
            onChange={(e) => setCdata(e.target.value)}
            type="text"
            maxLength="4"
          />
          <input
            value={Ddata}
            onChange={(e) => setDdata(e.target.value)}
            type="text"
            maxLength="4"
          />
        </div>

        <div className="container__button">
          <button
            type="button"
            disabled={full.length !== 16}
            onClick={addNumber}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="container__list">
        <ul>
          {fullData.map((x) => (
            <div className="ind__list">
              <li key={`key`}>{`${x}`}</li>
              <DeleteOutlined
                style={{ fontSize: "28px", color: "#000", alignSelf: "center" }}
                onClick={() => deleteNumber(`${x}`)}
              />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
