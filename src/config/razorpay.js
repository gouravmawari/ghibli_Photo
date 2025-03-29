export const RAZORPAY_CONFIG = {
  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  amount: 100, // Amount in paise 
  currency: "INR",
  name: "Ghibli Image Generator",
  description: "Premium Image Generation Service",
  handler: function (response) {
    // Handle successful payment
    return response;
  },
  prefill: {
    name: "",
    email: "",
    contact: "",
  },
  theme: {
    color: "#000000",
  },
}; 