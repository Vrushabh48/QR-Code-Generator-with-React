import { useState, useRef } from "react";
import QRCode from "react-qr-code";
import * as htmlToImage from "html-to-image";
import '../index.css'


function QrCodeGenerator() {
  const [url, setUrl] = useState("");
  const [qrIsVisible, setQrIsVisible] = useState(false);

  const handleQrCodeGenerator = () => {
    if (!url) {
      return;
    }

    setQrIsVisible(true);
  };

  const qrCodeRef = useRef(null);

  const downloadQRCode = () => {
    htmlToImage
      .toPng(qrCodeRef.current)
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "qr-code.png";
        link.click();
      })
      .catch(function (error) {
        console.error("Error generating QR code:", error);
      });
  };

  return (
    <div className=" pt-28 pl-96 pr-96 text-center">
      <h1 className="text-3xl font-bold p-4">QR Code Generator</h1>
      <div className="p-6 items-center" ref={qrCodeRef}>
        <div className="pl-40 flex gap-5">
          <input
          className="p-2 border-2"
            type="text"
            placeholder="Enter a URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        
          <button className="rounded-lg bg-slate-700 p-2 hover:bg-slate-500 text-white" onClick={handleQrCodeGenerator}>Generate QR Code</button>
        </div>

        {qrIsVisible && (
          <div className="p-7">
            <div className="pl-40">
              <QRCode value={url} size={300} />
            </div>
            <div className="pt-8 pb-4">
            <button className="bg-slate-700 rounded-lg hover:bg-slate-500 text-white p-2" onClick={downloadQRCode}>Download QR Code</button>
            </div>
          </div>
        )}
        <h3 className="pt-5 text-2xl font-semibold">Made by Vrushabh Patil</h3>
      </div>
    </div>
  );
}

export default QrCodeGenerator;