import Register from '../components/auth/register'
import { getSession } from 'next-auth/client'

const RegisterPage = () => {
	return <Register />
}

export default RegisterPage

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
