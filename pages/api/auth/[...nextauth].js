import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import User from '../../../models/user'
import dbConnect from '../../../config/dbConnect'

export default NextAuth({
	session: {
		jwt: true,
	},
    jwt: {
        secret: process.env.JWT_SECRET,
    },
	providers: [
		Providers.Credentials({
			async authorize(credentials) {
				dbConnect()
				const { email, password } = credentials
				// check if email and password are entered
				if (!email || !password) {
					throw new Error('Email and password are required')
				}
				// check if user exists
				const user = await User.findOne({ email }).select('+password')
				if (!user) {
					throw new Error('User not found')
				}
				// check if password is correct
				if (!(await user.comparePassword(password))) {
					throw new Error('Invalid password')
				}
				return Promise.resolve(user)
			},
		}),
	],
	callbacks: {
		jwt: async (token, user) => {
			// token is the JWT
			// user is the user object return from authorize above
			if (user) {
				// assign token to user
				token.user = user
			}
			// return the token
			return Promise.resolve(token)
		},
		session: async (session, user) => {
			// session is the session object
			// user is the token returned from jwt

			// assign user(token returned from above) to session
			session.user = user
			// return the session
			return Promise.resolve(session)
		},
	},
})
