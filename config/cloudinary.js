import { v2 as cloudinary } from 'cloudinary';

  // Configuration
    cloudinary.config({ 
        cloud_name: 'dcf3gocyy', 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    console.log("Cloudinary configured successfully",process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET  );
    
export default cloudinary;