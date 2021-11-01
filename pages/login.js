import Login from '../components/auth/login'
import { getSession } from 'next-auth/client'

const LoginPage = () => {
	return <Login />
}

export default LoginPage

export async function getServerSideProps(context) {
	const session = await getSession(context)
	if (session) {
		return {
			redirect: {
				destination: '/',
				permanent: false, //only push user to login page once
			},
		}
	}
	return {
		props: {},
	}
}
