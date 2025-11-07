module.exports = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI, // MongoDB connection string
  },
  images: {
    domains: ['your-image-domain.com'], // Add any domains you want to allow for images
  },
};