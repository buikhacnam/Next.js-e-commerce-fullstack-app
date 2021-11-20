module.exports = {
  reactStrictMode: true,
  env : {
    DB_LOCAL_URL: 'mongodb://localhost:27017/next-cruise',
    DB_URL: 'mongodb+srv://dopestuff:mrbui123456@cluster0.qcbff.mongodb.net/next-cruise?retryWrites=true&w=majority',

    NEXTAUTH_URL:'https://example.com',
    JWT_SECRET: 'secret',
    // please fill in your own 
    STRIPE_API_KEY: 'pk_test_51JwZtUE1XgUA6OuDxwSPrx067SYqWiSQ765UOntTg371nK4PS1vl6VANArb5rwFqbu4Qr54F3t7xgJ7Uv8LpEC5W00XVFlP8KU',
    STRIPE_SECRET_KEY: 'sk_test_51JwZtUE1XgUA6OuD6B83xgGVsWsd99j76nlGcpKjOBmjm1E8DrHUpH7At9aa0zCpcdvUQFCRe0ZSIzf3y9d9KRu400pCc3fLG0',
    STRIPE_WEBHOOK_SECRET: 'whsec_kMR2Lc2gBPi4s3MsYpDib56TPZXp91s4',

    CLOUDINARY_CLOUD_NAME: 'dvo4lwa00',
    CLOUDINARY_API_KEY: '921846829174442',
    CLOUDINARY_API_SECRET: 'Ib0HCwlbvJ6FKlSDvq0EKQdgylE',

    SMTP_HOST: 'smtp.mailtrap.io',
    SMTP_PORT: 2525,
    SMTP_USER: 'c7eec27db82fb2',
    SMTP_PASSWORD: 'afb0e870561748',
    SMTP_FROM_NAME: 'Next Cruise',
    SMTP_FROM_EMAIL: 'noreply@next-cruise.com',
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}
