/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      process.env.GOOGLE_IMAGE_DOMAIN,
      process.env.GIGHUB_IMAGE_DOMAIN,
      process.env.CLOUDINARY_IMAGE_DOMAIN,
      process.env.UPLOADTHING_IMAGE_DOMAIN,
    ],
  },
};

module.exports = nextConfig;
