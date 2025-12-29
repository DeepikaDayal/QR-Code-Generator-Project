import React, { useState } from 'react';
import {QRCodeCanvas} from 'qrcode.react';

function App() {
  const [text, setText] = useState('');
  const [qrValue, setQrValue] = useState('');

  const generateQR = () => {
    if (text.trim()) {
      setQrValue(text);
    }
  };

  const downloadQR = () => {
    const canvas = document.getElementById('qr-code');
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qr-code.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">QR Code Generator</h1>
        
        <div className="mb-4">
          <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-2">
            Enter text or URL:
          </label>
          <input
            id="text-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g., https://example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <button
          onClick={generateQR}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
        >
          Generate QR Code
        </button>
        
        {qrValue && (
          <div className="text-center">
            <QRCodeCanvas
              id="qr-code"
              value={qrValue}
              size={200}
              level="H"
              includeMargin={true}
              className="mx-auto mb-4"
            />
            <button
              onClick={downloadQR}
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Download QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;