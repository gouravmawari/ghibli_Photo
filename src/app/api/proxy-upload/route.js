import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Get the form data from the request
    const formData = await request.formData();
    
    console.log('Proxy received request');
    console.log('FormData email:', formData.get('email'));
    console.log('FormData photo name:', formData.get('photo')?.name);

    // Forward the request to the actual API
    const response = await fetch('http://34.131.82.124:3000/api/photos/upload', {
      method: 'POST',
      body: formData,
      // Server-side requests are not subject to browser CORS restrictions
    });

    console.log('Proxy received response with status:', response.status);
    
    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
      console.log('Proxy received JSON response:', data);
    } else {
      // If not JSON, get the response as text
      data = await response.text();
      console.log('Proxy received text response:', data);
      // Return the raw text response with proper status
      return new NextResponse(data, {
        status: response.status,
        headers: {
          'Content-Type': contentType || 'text/plain',
        },
      });
    }

    // Return the JSON response with proper status
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy error:', error.message);
    // Return error response
    return NextResponse.json(
      { error: 'Error in proxy: ' + error.message },
      { status: 500 }
    );
  }
} 