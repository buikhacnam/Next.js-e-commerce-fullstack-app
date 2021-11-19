module.exports = {
    reactStrictMode: true,
    env : {
      DB_LOCAL_URL: 'mongodb://localhost:27017/next-cruise',
      DB_URL: '',
  
      NEXTAUTH_URL:'',
      JWT_SECRET: 'secret',
      STRIPE_API_KEY: '',
      STRIPE_SECRET_KEY: '',
      STRIPE_WEBHOOK_SECRET: '',
  
      CLOUDINARY_CLOUD_NAME: '',
      CLOUDINARY_API_KEY: '',
      CLOUDINARY_API_SECRET: '',
  
      SMTP_HOST: '',
      SMTP_PORT: 2525,
      SMTP_USER: '',
      SMTP_PASSWORD: '',
      SMTP_FROM_NAME: 'e',
      SMTP_FROM_EMAIL: '',
    },
    images: {
      domains: ['res.cloudinary.com'],
    },
  }
  