import React, { useState, useEffect } from 'react';
import uploadImg from '../ressources/file.png';
import './middle.css';

const optionLabels = {
  option1: [''],
  option2: ['Card Access Number', 'Date Of Birth', 'Date Of Expiry', 'First Name', 'Issuing State Code', 'Name', 'Personal Number', 'Place Of Birth', 'Last Name'],
  option3: ['Address', 'Authority', 'Date Of Birth', 'Date Of Expiry', 'Date Of Issue', 'Document Class Code', 'Document Number', 'Given Names', 'Issuing State Code', 'Full Name', 'Personal Number','Place Of Birth','Sex','Last Name'],
  option4: ['DL Class','Date Of Birth','Document Number','First Issue Date','First Name','Issuing State Code','Full Name','Personal Number','Place Of Birth','Place Of Issue','Last Name'],
};

const labelToOcrMapping1 = {
  'Card Access Number': 'cardAccessNumber',
  'Date Of Birth': 'dateOfBirth',
  'Date Of Expiry': 'dateOfExpiry',
  'First Name': 'givenNames',
  'Issuing State Code': 'issuingStateCode',
  'Name': 'name',
  'Personal Number': 'personalNumber',
  'Place Of Birth': 'placeOfBirth',
  'Last Name': 'surname',
};
const labelToOcrMapping2 = {
  'Address': 'address',
  'Authority': 'authority',
  'Date Of Birth': 'dateOfBirth',
  'Date Of Expiry': 'dateOfExpiry',
  'Date Of Issue': 'dateOfIssue',
  'Document Class Code': 'documentClassCode',
  'Document Number': 'documentNumber',
  'Given Names': 'givenNames',
  'Issuing State Code': 'issuingStateCode',
  'Full Name': 'name',
  'Personal Number': 'personalNumber',
  'Place Of Birth': 'placeOfBirth',
  'Sex': 'sex',
  'Last Name': 'surname',
};
const labelToOcrMapping3 = {
  'DL Class': 'dLClass',
  'Date Of Birth': 'dateOfBirth',
  'Document Number': 'documentNumber',
  'First Issue Date': 'firstIssueDate',
  'First Name': 'givenNames',
  'Issuing State Code': 'issuingStateCode',
  'Full Name': 'name',
  'Personal Number': 'personalNumber',
  'Place Of Birth': 'placeOfBirth',
  'Place Of Issue': 'placeOfIssue',
  'Last Name': 'surname',
};


function Mid() {
  const [selectedOption, setSelectedOption] = useState('');
  const [setImageURL] = useState('');
  const [labels, setLabels] = useState(optionLabels.option2);
  const [labelData, setLabelData] = useState(Array(labels.length).fill(''));
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedName, setSelectedName] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [ocrData, setOcrData] = useState(null);

  useEffect(() => {
    const fetchApiResponse = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/upload/');
        const data = await response.json();
        setApiResponse(data);

        if (data && data.defaultOption) {
          setSelectedOption(data.defaultOption);
          setLabels(optionLabels[data.defaultOption]);

          if (data[data.defaultOption] && data[data.defaultOption].ocr) {
            const ocrData = data[data.defaultOption].ocr;
            const initialLabelData = labels.map((label) => ocrData[label] || '');
            setLabelData(initialLabelData);
          } else {
            setLabelData(Array(labels.length).fill(''));
          }
        }
      } catch (error) {
        console.error('Error fetching API response:', error);
      }
    };

    fetchApiResponse();
  }, [labels]);

  const handleOptionChange = (event) => {
    const selected = event.target.value;
    setSelectedOption(selected);
    setLabels(optionLabels[selected]);

    if (apiResponse && apiResponse.data && apiResponse.data.ocr) {
      const ocrData = apiResponse.data.ocr;
      const initialLabelData = labels.map((label) => ocrData[label] || '');
      setLabelData(initialLabelData);
    } else {
      setLabelData(Array(labels.length).fill(''));
    }
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedName(file.name);
  };
  

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);

      try {
        const response = await fetch('http://localhost:8000/api/upload/', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Upload successful. Result:', result);

          if (result.api_response.data.ocr) {
            const ocrData = result.api_response.data.ocr;
            setOcrData(ocrData);
            console.log("OCR Data:", ocrData);
          }
        } else {
          console.error('Error uploading the image. Status:', response.status);
        }
      } catch (error) {
        console.error('Error uploading the image:', error);
      }
    } else {
      console.warn('Please select an image before uploading.');
    }
  };
  const handleClearInputs = () => {
    setOcrData(null); // Clear OCR data
    const initialLabelData = Array(labels.length).fill('');
    setLabelData(initialLabelData); // Clear input values
  };
  
  return (
    <>
      <div className="mid">
        <div className="parent">
          <div className="file-upload">
            <img src={uploadImg} alt="upload" />
            <h3>{selectedName || 'Click box to upload'}</h3>
            <p>Maximum file size 10mb</p>
            <input type="file" onChange={handleFileChange} />
          </div>

          <div className="bcontainer">
            <button onClick={handleUpload} className='sbutton'>
              <span>
                <h4>Upload</h4>
              </span>
              <i></i>
            </button>
          </div>
        </div>

        <div className="container">
        <form action="" className="form">
  <select
    className="select-option"
    onChange={(e) => handleOptionChange(e)}
    value={selectedOption}
  >
     <option value="option1">Chose an option</option>
    <option value="option2">Identity Card</option>
    <option value="option3">Passport</option>
    <option value="option4">Driving License</option>
  </select>

  {selectedOption !== '' && selectedOption !== 'option1' &&(
    <>
      {labels.map((label, index) => {
        const selectedMapping =
          selectedOption === 'option2'
            ? labelToOcrMapping1
            : selectedOption === 'option3'
            ? labelToOcrMapping2
            : labelToOcrMapping3;

        return (
          <div key={index} className="form__column">
            <label htmlFor={label} className="form__label">
              {label}
            </label>
            <input
              type="text"
              placeholder=""
              value={
                ocrData && selectedMapping[label]
                  ? ocrData[selectedMapping[label]]
                  : ''
              }
              onChange={(e) => handleLabelDataChange(index, e.target.value)}
              className="form__input"
            />
          </div>
        );
      })}

      <button onClick={handleUpload} className="bbutton">
        <span>
          <h4>Clear</h4>
        </span>
        <i></i>
      </button>
    </>
  )}
</form>

</div>

      </div>
      <div className='footer'>
        <p>Nous respectons votre vie privée.</p>
        <p>Cette application ne conserve pas vos informations personnelles.</p>
        <p>  </p>
      </div>
    </>
  );
}

export default Mid;
