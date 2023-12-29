// App.js

import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const optionLabels = {
  option1: ['First Name','Last Name', 'Birth date', 'Address', 'CIN'],
  option2: ['Full Name', 'Designation', 'Organization', 'Phone Number','Email','Website'],
  option3: ['Card Number', "Expiration date", 'CVV', 'Full Name'],
};

function App() {
  const [selectedOption, setSelectedOption] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [labels, setLabels] = useState(optionLabels.option1);
  const [labelData, setLabelData] = useState(Array(labels.length).fill(''));

  const handleOptionChange = (event) => {
    const selected = event.target.value;
    setSelectedOption(selected);
    setLabels(optionLabels[selected]);
    setLabelData(Array(optionLabels[selected].length).fill(''));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLabelDataChange = (index, value) => {
    const updatedData = [...labelData];
    updatedData[index] = value;
    setLabelData(updatedData);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Image Uploader</h1>
      </div>

      <div className="content">
        <div class="file-upload">
          <button class="file-upload-btn" type="button" >Submit</button>

          <div class="image-upload-wrap">
            <input class="file-upload-input" type='file' onChange={(e) => handleImageChange(e)} accept="image/*" />
            <div class="drag-text">
              <h3>Drag and drop a file or select add Image</h3>
              {imageURL && (
        <div className="image-preview">
          <img src={imageURL} alt="Uploaded" />
        </div>
      )}
            </div>
          </div>
          <div class="file-upload-content">
            <img class="file-upload-image" src="#" alt="your image" />
            <div class="image-title-wrap">
              <button type="button"  class="remove-image">Remove <span class="image-title">Uploaded Image</span></button>
            </div>
          </div>
        </div>

        <div class="container">
          <form action="" class="form">
            <select onChange={(e) => handleOptionChange(e)} value={selectedOption}>
              <option value="">Select Option</option>
              <option value="option1">CIN</option>
              <option value="option2">BUSINESS CARD</option>
              <option value="option3">VISA</option>
            </select>

            {labels.map((label, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder={label}
                  value={labelData[index]}
                  onChange={(e) => handleLabelDataChange(index, e.target.value)}
                  class="form__input"
                />
                <label for={label} class="form__label">{label}</label>
              </div>
            ))}
          </form>
        </div>
      </div>

      
    </div>
  );
}

export default App;
