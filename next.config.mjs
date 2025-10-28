import withPWA from 'next-pwa';

const isProd = process.env.NODE_ENV === 'production';

const config = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
  },
  transpilePackages: ['@uploadthing/react'],
};

export default withPWA({
  dest: 'public',
  disable: !isProd,
})(config);
