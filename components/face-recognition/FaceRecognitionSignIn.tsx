'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Camera } from "lucide-react";
import dynamic from 'next/dynamic';

interface GenderDetection {
  gender: string;
  probability: number;
}

const FaceRecognitionSignIn = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isCameraRunning, setIsCameraRunning] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'failed'>('idle');

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const captureCanvasRef = useRef<HTMLCanvasElement>(null);
  const detectionInterval = useRef<NodeJS.Timeout | null>(null);
  const faceApiRef = useRef<any>(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        setIsLoading(true);
        
        // Dynamic import of face-api.js
        const faceapi = await import('@vladmandic/face-api');
        faceApiRef.current = faceapi;
        
        // Path to the model files
        const MODEL_URL = '/models';
        
        // Load models
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL);
        
        setIsModelLoaded(true);
        setError(null);
      } catch (err) {
        console.error('Error loading face detection models:', err);
        setError('Failed to load face detection models. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };

    loadModels();

    return () => {
      stopDetection();
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      if (!videoRef.current) return;
      setError(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      });

      videoRef.current.srcObject = stream;
      setIsCameraRunning(true);
      
      // Reset captured image and verification when starting camera
      setCapturedImage(null);
      setVerificationResult(null);
      setVerificationStatus('idle');
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Failed to access camera. Please check camera permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraRunning(false);
    }
  };

  const stopDetection = () => {
    if (detectionInterval.current) {
      clearInterval(detectionInterval.current);
      detectionInterval.current = null;
    }
    setIsDetecting(false);
  };

  const capturePicture = () => {
    if (!videoRef.current || !captureCanvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = captureCanvasRef.current;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the current video frame to the canvas
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to data URL
      const imageDataUrl = canvas.toDataURL('image/png');
      setCapturedImage(imageDataUrl);
      
      // Stop the camera after capturing
      stopCamera();
    }
  };

  const retakePicture = () => {
    setCapturedImage(null);
    setVerificationResult(null);
    setVerificationStatus('idle');
    startCamera();
  };

  const verifyGender = async () => {
    if (!capturedImage || !captureCanvasRef.current || !faceApiRef.current) {
      setError('No image captured or face detection models not loaded.');
      return;
    }

    try {
      setVerificationStatus('verifying');
      setError(null);
      
      const faceapi = faceApiRef.current;
      const canvas = captureCanvasRef.current;
      
      // Create an image element from the captured image
      const img = new Image();
      img.src = capturedImage;
      
      // Wait for the image to load
      await new Promise((resolve) => {
        img.onload = resolve;
      });
      
      // Detect faces with age and gender
      const detectionOptions = new faceapi.TinyFaceDetectorOptions({
        inputSize: 416,
        scoreThreshold: 0.5
      });
      
      const detections = await faceapi
        .detectAllFaces(img, detectionOptions)
        .withAgeAndGender();
      
      if (detections.length === 0) {
        setVerificationStatus('failed');
        setVerificationResult('No face detected in the image. Please retake the photo.');
        return;
      }
      
      const detection = detections[0];
      const gender = detection.gender;
      const genderProbability = detection.genderProbability;
      
      console.log('Gender Verification:', { gender, probability: genderProbability });
      
      // Draw the result on canvas
      const context = canvas.getContext('2d');
      if (context) {
        // Clear previous drawings
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Draw detection box
        const box = detection.detection.box;
        const boxColor = gender === 'female' ? 'rgba(255, 105, 180, 1)' : 'rgba(0, 120, 255, 1)';
        
        context.lineWidth = 3;
        context.strokeStyle = boxColor;
        context.beginPath();
        context.rect(box.x, box.y, box.width, box.height);
        context.stroke();
        
        // Draw gender and confidence
        context.font = '16px Arial';
        context.fillStyle = boxColor;
        context.fillText(
          `${gender} (${Math.round(genderProbability * 100)}%)`,
          box.x, box.y > 20 ? box.y - 10 : box.y + box.height + 25
        );
      }
      
      // Update verification result
      if (gender === 'female' && genderProbability > 0.8) {
        setVerificationStatus('success');
        setVerificationResult('Verification successful! You will be redirected shortly.');
        
        // Dispatch success event after a short delay
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('faceRecognitionSuccess'));
        }, 1500);
      } else {
        setVerificationStatus('failed');
        setVerificationResult(
          gender === 'female' 
            ? 'Verification failed. Confidence too low. Please retake the photo.'
            : 'Access denied. This platform is exclusively for women.'
        );
      }
    } catch (err) {
      console.error('Verification error:', err);
      setVerificationStatus('failed');
      setVerificationResult('Error during verification. Please try again.');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold mb-2">Face Recognition</h2>
          <p className="text-gray-500">Verify your identity to sign in</p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p>Loading face detection models...</p>
          </div>
        ) : error ? (
          <div className="text-center py-6">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Reload
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* Camera or Captured Image Display */}
            <div className="relative w-full aspect-video bg-gray-100 rounded-md overflow-hidden mb-4">
              {capturedImage ? (
                <>
                  <canvas 
                    ref={captureCanvasRef} 
                    className="w-full h-full object-cover"
                  />
                  {verificationStatus === 'verifying' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <Loader2 className="h-8 w-8 animate-spin text-white" />
                    </div>
                  )}
                </>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    playsInline
                    muted
                  />
                  <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 w-full h-full"
                  />
                </>
              )}
            </div>
            
            {/* Create hidden canvas for captures */}
            <canvas 
              ref={captureCanvasRef} 
              style={{ display: 'none' }}
            />

            {/* Verification Result */}
            {verificationResult && (
              <div className={`mb-4 text-center p-3 rounded-md w-full ${
                verificationStatus === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {verificationResult}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 w-full">
              {!isCameraRunning && !capturedImage && (
                <Button 
                  onClick={startCamera} 
                  className="w-full"
                  disabled={!isModelLoaded}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Start Camera
                </Button>
              )}
              
              {isCameraRunning && !capturedImage && (
                <Button 
                  onClick={capturePicture} 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Capture Photo
                </Button>
              )}
              
              {capturedImage && verificationStatus === 'idle' && (
                <div className="flex gap-2 w-full">
                  <Button 
                    onClick={retakePicture} 
                    variant="outline" 
                    className="flex-1"
                  >
                    Retake
                  </Button>
                  <Button 
                    onClick={verifyGender} 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Verify Identity
                  </Button>
                </div>
              )}
              
              {capturedImage && (verificationStatus === 'failed') && (
                <Button 
                  onClick={retakePicture} 
                  variant="outline" 
                  className="w-full"
                >
                  Retake Photo
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FaceRecognitionSignIn; 