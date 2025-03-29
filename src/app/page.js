"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/providers";
import Dropzone from "@/components/dropzone";
import StylePresetButton from "@/components/style-preset-button";
import { downloadImage } from "@/lib/utils";
import { RAZORPAY_CONFIG } from "@/config/razorpay";

/**
 * Home page component with the Ghibli Image Recreator UI
 */
export default function Home() {
  const { toast } = useToast();
  
  // Refs for gradient cards
  const cardsRef = useRef([]);
  
  // State for image handling
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  
  // State for prompt and processing
  const [prompt, setPrompt] = useState("Transform this image into Studio Ghibli art style with vibrant colors, whimsical elements, and dreamlike quality.");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activePreset, setActivePreset] = useState(null);
  const [showPromptMessage, setShowPromptMessage] = useState(false);
  
  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  // Handle mouse move for gradient cards
  useEffect(() => {
    const handleMouseMove = (e, card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };
    
    const cards = cardsRef.current;
    cards.forEach(card => {
      if (card) {
        card.addEventListener("mousemove", (e) => handleMouseMove(e, card));
      }
    });
    
    return () => {
      cards.forEach(card => {
        if (card) {
          card.removeEventListener("mousemove", (e) => handleMouseMove(e, card));
        }
      });
    };
  }, []);
  
  // Add a card to the refs
  const addCardRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };
  
  /**
   * Handle file upload
   */
  const handleFileDrop = useCallback((files) => {
    console.log('Files dropped:', files);
    
    // Check if adding more files would exceed the limit
    if (images.length + files.length > 3) {
      toast({
        title: "Maximum limit reached",
        message: "You can only upload up to 3 images at a time",
        type: "error"
      });
      return;
    }
    
    // Convert FileList to Array and filter for valid files
    const validFiles = Array.from(files).filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      
      if (!isValidType) {
        toast({
          title: "Invalid file type",
          message: "Please upload only PNG, JPG, or JPEG files",
          type: "error"
        });
      }
      
      if (!isValidSize) {
        toast({
          title: "File too large",
          message: "Please upload files smaller than 5MB",
          type: "error"
        });
      }
      
      return isValidType && isValidSize;
    });

    // Process valid files
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log('FileReader loaded, preview data:', reader.result ? 'Data available' : 'No data');
        setPreviews(prev => [...prev, reader.result]);
        setImages(prev => [...prev, file]);
      };
      reader.onerror = (error) => {
        console.error('FileReader error:', error);
        toast({
          title: "Error loading image",
          message: "There was a problem reading your file",
          type: "error"
        });
      };
      reader.readAsDataURL(file);
    });
    
    toast({
      title: "Images uploaded",
      message: `${validFiles.length} image(s) ready for transformation`,
      type: "success"
    });
  }, [images.length, toast]);
  
  /**
   * Remove an image
   */
  const handleRemoveImage = useCallback((index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  }, []);
  
  /**
   * Reset all state
   */
  const handleReset = useCallback(() => {
    setImages([]);
    setPreviews([]);
    setGeneratedImages([]);
    setPrompt("Transform this image into Studio Ghibli art style with vibrant colors, whimsical elements, and dreamlike quality.");
    setActivePreset(null);
  }, []);
  
  /**
   * Handle style preset selection
   */
  const handlePresetClick = useCallback((preset) => {
    setActivePreset(preset);
    
    switch (preset) {
      case "howls":
        setPrompt("Transform this image in the style of Howl's Moving Castle with warm colors, fantastical architecture, and a sense of wonder.");
        break;
      case "spirited":
        setPrompt("Transform this image in the style of Spirited Away with mystical elements, ethereal lighting, and supernatural characters.");
        break;
      case "totoro":
        setPrompt("Transform this image in the style of My Neighbor Totoro with lush forests, gentle creatures, and a peaceful countryside atmosphere.");
        break;
      default:
        break;
    }
  }, []);
  
  /**
   * Handle prompt textarea click
   */
  const handlePromptClick = useCallback(() => {
    setShowPromptMessage(true);
    
    // Hide the message after 3 seconds
    setTimeout(() => {
      setShowPromptMessage(false);
    }, 3000);
  }, []);
  
  /**
   * Handle confirmation and start generation
   */
  const handleConfirmGenerate = useCallback(() => {
    setShowAlert(false);
    setIsGenerating(true);
    console.log('Starting image generation process...');
    console.log('Email being used:', email);
    console.log('Image files:', images);
    
    // Process each image sequentially
    const processImages = async () => {
      for (let i = 0; i < images.length; i++) {
        try {
          // Create FormData for each image
          const formData = new FormData();
          formData.append('email', email);
          formData.append('photo', images[i]);
          
          // Log FormData for current image
          console.log(`Processing image ${i + 1}/${images.length}:`, {
            email: email,
            photoName: images[i].name,
            photoType: images[i].type,
            photoSize: `${(images[i].size / 1024).toFixed(2)} KB`
          });
          
          // Make the API request for current image
          const response = await fetch('/api/proxy-upload', {
            method: 'POST',
            body: formData,
          });
          
          console.log(`Response status for image ${i + 1}:`, response.status);
          console.log(`Response headers for image ${i + 1}:`, Object.fromEntries([...response.headers]));
          
          const responseClone = response.clone();
          
          if (!response.ok) {
            console.error(`Server returned error status for image ${i + 1}:`, response.status);
            const errorText = await response.text();
            console.error(`Error response body for image ${i + 1}:`, errorText);
            throw new Error(`Server error for image ${i + 1}: ${response.status} ${response.statusText}`);
          }
          
          const data = await response.json().catch(async (e) => {
            console.error(`Error parsing JSON response for image ${i + 1}:`, e);
            const text = await responseClone.text();
            console.log(`Raw response text for image ${i + 1}:`, text);
            throw new Error(`Invalid JSON response for image ${i + 1}`);
          });
          
          console.log(`API Response data for image ${i + 1}:`, data);
          
          // If this is the last image, show success message
          if (i === images.length - 1) {
            setIsGenerating(false);
            toast({
              title: "Request submitted",
              message: `Your ${images.length} Ghibli-style artwork(s) will be sent to your email within 10-60 minutes`,
              type: "success"
            });
          }
          
          // Add a small delay between requests to prevent rate limiting
          if (i < images.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
          
        } catch (error) {
          console.error(`Error processing image ${i + 1}:`, error);
          console.error('Error details:', error.message);
          console.error('Error stack:', error.stack);
          
          setIsGenerating(false);
          
          toast({
            title: "Request failed",
            message: `There was an error processing image ${i + 1}: ${error.message}. Please try again.`,
            type: "error"
          });
          break; // Stop processing remaining images if there's an error
        }
      }
    };
    
    // Start processing images
    processImages();
  }, [images, email, toast]);
  
  /**
   * Handle Razorpay payment
   */
  const handlePayment = useCallback(async () => {
    if (!images.length || !email) {
      toast({
        title: "Missing Information",
        message: "Please upload at least one image and provide your email address",
        type: "error"
      });
      return;
    }

    try {
      // Calculate total amount based on new pricing
      const totalAmount = images.length === 1 ? 49 :
                         images.length === 2 ? 69 :
                         79;

      // Create order
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalAmount * 100, // Convert to paise (multiply by 100)
          currency: 'INR'
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await orderResponse.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Ghibli Image Generator",
        description: `Premium Image Generation Service - ${images.length} image(s)`,
        order_id: orderData.id,
        prefill: {
          email: email,
        },
        theme: {
          color: "#000000"
        },
        handler: function (response) {
          setIsPaymentComplete(true);
          handleConfirmGenerate();
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal closed');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        message: "Failed to initialize payment. Please try again.",
        type: "error"
      });
    }
  }, [images, email, handleConfirmGenerate, toast]);
  
  /**
   * Handle image generation
   */
  const handleGenerate = useCallback(() => {
    if (!images.length) return;
    setShowAlert(true);
  }, [images.length]);
  
  /**
   * Handle image download
   */
  const handleDownload = useCallback(async () => {
    if (!generatedImages.length) return;
    
    setIsDownloading(true);
    
    try {
      await downloadImage(generatedImages[0], "ghibli-artwork.jpg");
      
      toast({
        title: "Download successful",
        message: "Your artwork has been saved to your device",
        type: "success"
      });
    } catch (error) {
      toast({
        title: "Download failed",
        message: error.message,
        type: "error"
      });
    } finally {
      setIsDownloading(false);
    }
  }, [generatedImages, toast]);
  
  // Icons for the UI
  const icons = {
    howls: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    spirited: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    totoro: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    generate: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    download: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
  };
  
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background gradient effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-indigo-500/3 blur-[130px] rounded-full transform -translate-x-1/4 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-blue-500/3 blur-[130px] rounded-full transform translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-purple-500/3 blur-[110px] rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      {/* Buy Me a Coffee Button */}
      <a 
        href="https://buymeacoffee.com/gauravMawari" 
            target="_blank"
            rel="noopener noreferrer"
        className="fixed top-4 right-4 z-50 glass-card flex items-center gap-2 px-3 py-2 rounded-full hover:scale-105 transition-all duration-300 shadow-lg border border-yellow-400/20"
        title="Buy Me a Coffee"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-yellow-400">
          <path d="M7.5 10.5C7.5 10.5 8.25 9.75 12 9.75C15.75 9.75 16.5 10.5 16.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.5 7.5V6C16.5 4.75736 15.4926 3.75 14.25 3.75H9.75C8.50736 3.75 7.5 4.75736 7.5 6V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 15.75V17.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14.25 17.25H9.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19.5 17.25V15C19.5 12.75 16.5 10.5 16.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4.5 17.25V15C4.5 12.75 7.5 10.5 7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19.5 15C19.5 15 19.5 18 17.25 18.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4.5 15C4.5 15 4.5 18 6.75 18.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7.5 17.25H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-xs font-medium text-yellow-300">Buy me a coffee</span>
      </a>
      
      <div className="relative container mx-auto max-w-6xl px-4 py-16">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20 rounded-lg blur opacity-30"></div>
            <h1 className="relative text-4xl md:text-5xl font-bold mb-3 gradient-text tracking-tight">
              Ghibli Image Generator
            </h1>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-base">
            Transform your photos into magical Studio Ghibli-inspired artwork using ChatGPT 4.5 for free
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-10 max-w-3xl mx-auto">
          <div className="space-y-8">
            {/* Upload Section */}
            <div ref={addCardRef} className="glass-card card-gradient-hover p-6 relative">
              <h2 className="text-xl font-semibold mb-4 text-white/90">Upload Images</h2>
              <Dropzone onFileDrop={handleFileDrop} />
              <div className="mt-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <div className="relative aspect-square glass-input rounded-xl overflow-hidden">
                        <img 
                          src={preview} 
                          alt={`Preview ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500/80 hover:bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          title="Remove image"
                        >
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 truncate">
                        {images[index].name}
                      </p>
                    </div>
                  ))}
                </div>
                {images.length > 0 && images.length < 3 && (
                  <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/20 relative overflow-hidden group">
                    {/* Animated border gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/20 to-green-500/0 animate-gradient-x"></div>
                    {/* Moving gradient border */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/0 via-green-500/40 to-green-500/0 animate-gradient-border border-2 border-transparent"></div>
                    
                    <div className="flex items-center justify-between relative">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium text-green-400">
                          {images.length === 1 
                            ? "Add one more image for just ₹20 more!"
                            : "Add one more image for just ₹10 more!"}
                        </span>
                      </div>
                      <span className="text-2xl font-bold text-green-400 animate-price-pulse">
                        {images.length === 1 ? "+₹20" : "+₹10"}
                      </span>
                    </div>
                  </div>
                )}
                <div className="mt-4 space-y-2">
                  {images.length > 0 && (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Original price ({images.length} × ₹49)</span>
                        <span className="text-white">₹{images.length * 49}</span>
                      </div>
                      {images.length > 1 && (
                        <div className="flex items-center justify-between text-sm text-green-400">
                          <span>Special discount</span>
                          <span>-₹{(images.length * 49) - (images.length === 2 ? 69 : 79)}</span>
                        </div>
                      )}
                      {images.length > 1 && (
                        <div className="flex items-center justify-between text-sm text-amber-400">
                          <span>Special offer</span>
                          <span>
                            {images.length === 2 
                              ? "Get 2 images for ₹69" 
                              : "Get 3 images for ₹79"}
                          </span>
                        </div>
                      )}
                      {images.length > 1 && (
                        <div className="flex items-center justify-between text-sm text-green-400">
                          <span>Price per image</span>
                          <span>
                            {images.length === 2 
                              ? "₹34.50 per image" 
                              : "₹26.33 per image"}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-base font-medium pt-2 border-t border-gray-700">
                        <span className="text-white">Total price</span>
                        <span className="text-white">
                          {images.length === 1 ? '₹49' : 
                           images.length === 2 ? '₹69' : 
                           '₹79'}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Customization Section */}
            {images.length > 0 && (
              <div ref={addCardRef} className="glass-card card-gradient-hover p-8 relative">
                <h2 className="text-xl font-semibold mb-6 text-white/90">Customization Prompt</h2>
                <div className="relative">
                  <Textarea 
                    value={prompt}
                    readOnly
                    placeholder="Describe how you want to transform the image..."
                    className="mb-2 cursor-not-allowed opacity-90"
                    onClick={handlePromptClick}
                  />
                  {showPromptMessage && (
                    <div className="absolute left-0 right-0 -bottom-10 bg-zinc-800/90 backdrop-blur-md text-white py-2 px-3 rounded-lg text-sm border border-white/10 shadow-md z-10 transition-opacity">
                      <p className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Custom prompt editing will be available soon
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Email Input */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email to receive the generated image"
                    className="glass-input w-full px-4 py-3 rounded-xl text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200"
                    required
                  />
                </div>
                
                <h3 className="text-sm font-medium text-gray-400 mb-4 mt-8">Style Presets</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  <StylePresetButton 
                    active={activePreset === "howls"}
                    label="Howl's Castle"
                    icon={icons.howls}
                    onClick={() => handlePresetClick("howls")}
                  />
                  <StylePresetButton 
                    active={activePreset === "spirited"}
                    label="Spirited Away"
                    icon={icons.spirited}
                    onClick={() => handlePresetClick("spirited")}
                  />
                  <StylePresetButton 
                    active={activePreset === "totoro"}
                    label="Totoro"
                    icon={icons.totoro}
                    onClick={() => handlePresetClick("totoro")}
                  />
                </div>
                
                <div className="mt-8">
                  <Button 
                    variant="gradient" 
                    onClick={handlePayment}
                    disabled={isGenerating || !images.length || !email}
                    className="w-full"
                  >
                    {isGenerating ? 'Processing...' : 'Generate Ghibli Art'}
                  </Button>
                  {!email.trim() && images.length > 0 && (
                    <p className="text-xs text-amber-400 mt-2 text-center">
                      Please enter your email to generate artwork
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Alert Dialog */}
        {showAlert && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="glass-card p-8 max-w-md w-full mx-4 relative">
              <h3 className="text-xl font-semibold mb-4 text-white/90">Processing Your Request</h3>
              <p className="text-gray-400 mb-6">
                We are currently facing high volume of images including spam images. Please check your mail and follow the steps to get your image under 15 mins.
              </p>
              <div className="flex justify-end">
                <Button 
                  variant="gradient" 
                  onClick={handlePayment}
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Processing...' : 'Proceed to Payment'}
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Gallery Section */}
        <section className="mt-16 mb-12">
          <div className="text-center mb-10">
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20 rounded-lg blur opacity-30"></div>
              <h2 className="relative text-2xl font-bold text-gradient-purple-blue">Gallery</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto auto-rows-[200px] auto-flow-dense">
            {/* Row 1 */}
            <div className="group relative rounded-xl overflow-hidden glass-card row-span-2">
              <img
                src="/gallery/1.jpeg"
                alt="Ghibli Artwork 1"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-sm font-medium">Featured Artwork</h3>
                  <p className="text-gray-300 text-xs mt-1">Transformed by AI</p>
                </div>
              </div>
            </div>

            <div className="group relative rounded-xl overflow-hidden glass-card">
              <img
                src="/gallery/2.jpeg"
                alt="Ghibli Artwork 2"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-sm font-medium">Ghibli Artwork 2</h3>
                  <p className="text-gray-300 text-xs mt-1">Transformed by AI</p>
                </div>
              </div>
            </div>

            <div className="group relative rounded-xl overflow-hidden glass-card row-span-2">
              <img
                src="/gallery/3.jpeg"
                alt="Ghibli Artwork 3"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-sm font-medium">Ghibli Artwork 3</h3>
                  <p className="text-gray-300 text-xs mt-1">Transformed by AI</p>
                </div>
              </div>
            </div>

            <div className="group relative rounded-xl overflow-hidden glass-card">
              <img
                src="/gallery/4.jpeg"
                alt="Ghibli Artwork 4"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-sm font-medium">Ghibli Artwork 4</h3>
                  <p className="text-gray-300 text-xs mt-1">Transformed by AI</p>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="group relative rounded-xl overflow-hidden glass-card">
              <img
                src="/gallery/5.jpeg"
                alt="Ghibli Artwork 5"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-sm font-medium">Ghibli Artwork 5</h3>
                  <p className="text-gray-300 text-xs mt-1">Transformed by AI</p>
                </div>
              </div>
            </div>

            <div className="group relative rounded-xl overflow-hidden glass-card row-span-2">
              <img
                src="/gallery/6.jpeg"
                alt="Ghibli Artwork 6"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-sm font-medium">Ghibli Artwork 6</h3>
                  <p className="text-gray-300 text-xs mt-1">Transformed by AI</p>
                </div>
              </div>
            </div>

            <div className="group relative rounded-xl overflow-hidden glass-card">
              <img
                src="/gallery/7.jpeg"
                alt="Ghibli Artwork 7"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-sm font-medium">Ghibli Artwork 7</h3>
                  <p className="text-gray-300 text-xs mt-1">Transformed by AI</p>
                </div>
              </div>
            </div>

            <div className="group relative rounded-xl overflow-hidden glass-card row-span-2">
              <img
                src="/gallery/8.png"
                alt="Ghibli Artwork 8"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-sm font-medium">Ghibli Artwork 8</h3>
                  <p className="text-gray-300 text-xs mt-1">Transformed by AI</p>
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="group relative rounded-xl overflow-hidden glass-card">
              <img
                src="/gallery/9.png"
                alt="Ghibli Artwork 9"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-sm font-medium">Ghibli Artwork 9</h3>
                  <p className="text-gray-300 text-xs mt-1">Transformed by AI</p>
                </div>
              </div>
            </div>

            <div className="group relative rounded-xl overflow-hidden glass-card row-span-2">
              <img
                src="/gallery/10.png"
                alt="Ghibli Artwork 10"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-sm font-medium">Ghibli Artwork 10</h3>
                  <p className="text-gray-300 text-xs mt-1">Transformed by AI</p>
                </div>
              </div>
            </div>

            <div className="group relative rounded-xl overflow-hidden glass-card">
              <img
                src="/gallery/11.png"
                alt="Ghibli Artwork 11"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-sm font-medium">Ghibli Artwork 11</h3>
                  <p className="text-gray-300 text-xs mt-1">Transformed by AI</p>
                </div>
              </div>
            </div>

            <div className="group relative rounded-xl overflow-hidden glass-card row-span-2">
              <img
                src="/gallery/12.png"
                alt="Ghibli Artwork 12"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-sm font-medium">Ghibli Artwork 12</h3>
                  <p className="text-gray-300 text-xs mt-1">Transformed by AI</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="mt-16 mb-12">
          <div className="text-center mb-10">
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20 rounded-lg blur opacity-30"></div>
              <h2 className="relative text-2xl font-bold text-gradient-purple-blue">How It Works</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div ref={addCardRef} className="glass-card card-gradient-hover p-6 relative transition-all duration-300 hover:translate-y-[-2px]">
              <div className="bg-indigo-500/5 w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-indigo-500/10">
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold mb-2 text-white/90">1. Upload</h3>
              <p className="text-gray-400 text-sm">
                Upload any image from your device. We support PNG, JPG, and JPEG formats up to 5MB.
              </p>
            </div>
            
            <div ref={addCardRef} className="glass-card card-gradient-hover p-6 relative transition-all duration-300 hover:translate-y-[-2px]">
              <div className="bg-blue-500/5 w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-blue-500/10">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold mb-2 text-white/90">2. Transform</h3>
              <p className="text-gray-400 text-sm">
                Our AI analyzes your image and transforms it into Ghibli-style artwork using advanced machine learning.
              </p>
            </div>
            
            <div ref={addCardRef} className="glass-card card-gradient-hover p-6 relative transition-all duration-300 hover:translate-y-[-2px]">
              <div className="bg-green-500/5 w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-green-500/10">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="text-base font-semibold mb-2 text-white/90">3. Receive</h3>
              <p className="text-gray-400 text-sm">
                Your transformed artwork will be sent to your email within 10-60 minutes.
              </p>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm pt-10 border-t border-white/5">
          <p>© 2025 Ghibli Image Generator. All rights reserved.</p>
          <p className="mt-2">Powered by Next.js, Tailwind CSS, and OpenAI</p>
          <p className="mt-2">Made with <span className="text-red-500">❤️</span> by Team Raga</p>
          
          {/* Policy Links */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a href="/terms" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/shipping" className="hover:text-white transition-colors">Shipping Policy</a>
            <a href="/contact" className="hover:text-white transition-colors">Contact Us</a>
            <a href="/refund" className="hover:text-white transition-colors">Cancellation & Refund</a>
          </div>
        </footer>
      </div>
    </main>
  );
}