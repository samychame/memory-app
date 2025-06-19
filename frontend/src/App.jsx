import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  //UI mode(embed or extract)
  const [mode, setMode] = useState('embed');
  //Uploaded audio file
  const [file, setFile] = useState(null);
  //Secret text to embed
  const [text, setText] = useState('');
  //Decoded message extracted from stego file 
  const [decodedMessage, setDecodedMessage] = useState('');
  //URL of stego audio file
  const [embedResult, setEmbedResult] = useState(null);
  //Loading state
  const [loading, setLoading] = useState(false);

  //Handler for when user uploads an audio file
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setEmbedResult(null);
    setDecodedMessage('');
  };

//Handler for when user uploads text file, reads the file and stores its content
  const handleTextFileChange = (e) => {
    const textFile = e.target.files[0];
    if (!textFile) return;
    //Read text file
    const reader = new FileReader();
    reader.onload = () => setText(reader.result);
    reader.readAsText(textFile);
  };

  //Called when the user clicks the embed button, validates user input and calls API encode
  const handleEmbed = async () => {
    //If either file is not uploaded then retun alert
    if (!file || !text) return alert('Please upload both an audio file and a text file.');
    setLoading(true);
    //Create new form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', text);

    try {
      //Call API encode endpoint
      const response = await axios.post('http://localhost:8080/api/encode', formData, {
        responseType: 'blob',
      });
      //Create blob from response
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      //Set embed result as the URL response
      setEmbedResult(url);
    } catch (error) {
      alert('Encoding failed.');
    } finally {
      setLoading(false);
    }
  };

//Called when the user clicks the extract button, validates user input and calls API decode
  const handleExtract = async () => {
    //If file is not uploaded then return alert
    if (!file) return alert('Please upload a stego audio file.');
    setLoading(true);
    //Create new form data
    const formData = new FormData();
    formData.append('file', file);

    try {
      //Call API decode endpoint
      const response = await axios.post('http://localhost:8080/api/decode', formData);
      //Set decoded message as the API response
      setDecodedMessage(response.data);
    } catch (error) {
      alert('Decoding failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1 className="title">CipherStegX</h1>
      <p className="subtitle">
        <b>Disguise your words inside sound</b>. CipherStegX lets you hide messages in audio files and extract them later using advanced encryption and steganography techniques, making secure communication simple and seamless.
      </p>

      {/* Mode selection buttons */}
      <div className="tabs">
        <button className={`tab ${mode === 'embed' ? 'active' : ''}`} onClick={() => setMode('embed')} disabled={loading}>
          Embed
        </button>
        <button className={`tab ${mode === 'extract' ? 'active' : ''}`} onClick={() => setMode('extract')} disabled={loading}>
          Extract
        </button>
      </div>

      {/* Audio file input form */}
      <div className="form-section">
        <label className="label">Choose MP3/WAV file:</label>
        <input
          className="input"
          type="file"
          accept=".mp3,.wav"
          onChange={handleFileChange}
          disabled={loading}
        />
      </div>

      {/*If embed mode then enable the text file input form*/}
      {mode === 'embed' && (
        <>
          <div className="form-section">
            <label className="label">Choose secret text file:</label>
            <input
              className="input"
              type="file"
              accept=".txt"
              onChange={handleTextFileChange}
              disabled={loading}
            />
          </div>

          <button className="action-btn" onClick={handleEmbed} disabled={loading}>
            {loading ? 'Processing…' : 'Embed'}
          </button>

          {embedResult && (
            <div className="form-section">
              <label className="label">Output File:</label>
              <button
                className="download-btn"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = embedResult;
                  link.download = 'stego_output.' + file.name.split('.').pop();
                  link.click();
                }}
              >
                Download File
              </button>
            </div>
          )}
        </>
      )}

      {/*If extract mode then enable text box to show decoded message*/}
      {mode === 'extract' && (
        <>
          <button className="action-btn" onClick={handleExtract} disabled={loading}>
            {loading ? 'Processing…' : 'Extract'}
          </button>
          <div className="form-section">
            <label className="label">Extracted Text:</label>
            <textarea
              className="textarea"
              value={decodedMessage}
              readOnly
              rows={4}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
