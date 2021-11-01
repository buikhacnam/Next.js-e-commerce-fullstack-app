import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import ButtonLoader from '../../components/layout/ButtonLoader'
import { updateProfile } from '../../redux/actions/userActions'

const Profile = () => {
	const router = useRouter()
	const dispatch = useDispatch()
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [avatar, setAvatar] = useState(null)

    

	return <> 
    
    </>
}

export default Profile
