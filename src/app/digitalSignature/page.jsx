"use client";
import LeftSection from "@/components/LeftSection";
import React, { useRef, useState, useEffect } from "react";

const SignatureCanvas = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const preventDefaultTouch = (e) => e.preventDefault();
    canvas.addEventListener("touchstart", preventDefaultTouch, {
      passive: false,
    });
    canvas.addEventListener("touchmove", preventDefaultTouch, {
      passive: false,
    });
    canvas.addEventListener("touchend", preventDefaultTouch, {
      passive: false,
    });

    return () => {
      canvas.removeEventListener("touchstart", preventDefaultTouch);
      canvas.removeEventListener("touchmove", preventDefaultTouch);
      canvas.removeEventListener("touchend", preventDefaultTouch);
    };
  }, []);

  const startDrawing = (e) => {
    e.preventDefault();
    const { x, y } = e.type.includes("touch")
      ? handleTouchEvents(e)
      : handleMouseEvents(e);
    setPaths((prevPaths) => [...prevPaths, [{ x, y }]]);
    setDrawing(true);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!drawing) return;
    const { x, y } = e.type.includes("touch")
      ? handleTouchEvents(e)
      : handleMouseEvents(e);
    setPaths((prevPaths) => {
      const updatedPaths = [...prevPaths];
      updatedPaths[updatedPaths.length - 1].push({ x, y });
      redrawCanvas(updatedPaths);
      return updatedPaths;
    });
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const redrawCanvas = (paths) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#000"; // Set the stroke color to black

    paths.forEach((path) => {
      if (path.length < 2) return;

      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length - 2; i++) {
        const xc = (path[i].x + path[i + 1].x) / 2;
        const yc = (path[i].y + path[i + 1].y) / 2;
        ctx.quadraticCurveTo(path[i].x, path[i].y, xc, yc);
      }
      ctx.quadraticCurveTo(
        path[path.length - 2].x,
        path[path.length - 2].y,
        path[path.length - 1].x,
        path[path.length - 1].y
      );
      ctx.stroke();
    });
  };

  const downloadSignature = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "signature.png";
    link.click();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setPaths([]);
  };

  const handleMouseEvents = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    return { x, y };
  };

  const handleTouchEvents = (e) => {
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    const x = (touch.clientX - rect.left) * scaleX;
    const y = (touch.clientY - rect.top) * scaleY;
    return { x, y };
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent md:flex-row">
      <LeftSection
        title="Welcome to the Digital Signature Tool!"
        description="This Tool allows you to create your digital signature and export it as
          a PNG file."
      />
      <div className="flex-1 flex justify-center items-center p-4 md:p-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-full w-full">
          <canvas
            ref={canvasRef}
            width={800}
            height={500}
            className="border-2 border-black w-full h-auto touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          <div className="mt-4 flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
            <button
              onClick={downloadSignature}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 w-full md:w-auto"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Download Signature
            </button>
            <button
              onClick={clearCanvas}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300 w-full md:w-auto"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Clear Canvas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureCanvas;
