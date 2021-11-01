import { getSession } from 'next-auth/client'

export const UpdateProfilePage = () => {
	return <><div>
        hello 
        </div></>
}

export default UpdateProfilePage

export async function getServerSideProps(context) {
	const session = await getSession(context)
    console.log('session', session)
	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false, //will not be cached client search engine
			},
		}
	}
    return {
        props: {
            session,
        },
    }
}
