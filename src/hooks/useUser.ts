
import { UserIProps } from '@/types/users'
import { useState } from 'react';
import toast from 'react-hot-toast';


const useUser = () => {
	const [loading, setLoading] = useState(false)
	const [userData, setUserData] = useState([])


	const getAllUsers = async () => {
		setLoading(true)
		try {
			const res = await fetch('/api/user/get-all-users', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (res.status === 200) {
				setLoading(false)
				res.json().then((data: any) => {
					setUserData(data.payload)
				})

			} else {
				console.log('GET request failed');
				setLoading(false)
			}

		} catch (error) {
			console.log("create user", error)
			setLoading(false)
		}
	}

	const createUser = async (data: UserIProps, actionFun?: () => void) => {
		if (data.firstName.length < 1) {
			toast.error('firstName can not be empty')
		}
		if (data.lastName.length < 1) {
			toast.error('lastName can not be empty')
		}
		if (data.email.length < 1) {
			toast.error('email can not be empty')
		}
		if (data.address.length < 1) {
			toast.error('address can not be empty')
		}
		setLoading(true)
		const res = await fetch('/api/user/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ data: data }),
		});

		res.json().then((data: any) => {
			if (data.status === 201) {
				toast.success(data.message)
				setLoading(false)
				actionFun !== undefined ? actionFun() : null
			}
			if (data.status === 500 && data.message.name == "SequelizeValidationError") {
				toast.error(data.message.errors[0].message)
				setLoading(false)
			}
		})
		setLoading(false)
	}

	const editUser = async (data: UserIProps, id: string, actionFun?: () => void) => {
		if (data.firstName.length < 1) {
			toast.error('firstName can not be empty')
		}
		if (data.lastName.length < 1) {
			toast.error('lastName can not be empty')
		}
		if (data.email.length < 1) {
			toast.error('email can not be empty')
		}
		if (data.address.length < 1) {
			toast.error('address can not be empty')
		}
		setLoading(true)
		const res = await fetch(`/api/user/edit-user/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ data: data }),
		});

		res.json().then((data: any) => {
			if (data.status === 201) {
				toast.success(data.message)
				setLoading(false)
				getAllUsers()
				actionFun !== undefined ? actionFun() : null
			}
			if (data.status === 500 && data.message.name == "SequelizeValidationError") {
				toast.error(data.message.errors[0].message)
				setLoading(false)
			}
		})
		setLoading(false)
	}

	const deleteUser = async (id: string, actionFun?: () => void) => {
		setLoading(true)
		const res = await fetch(`/api/user/delete-user/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		res.json().then((data: any) => {
			if (data.status === 201) {
				toast.success(data.message)
				setLoading(false)
				getAllUsers()
				actionFun !== undefined ? actionFun() : null
			}
			if (data.status === 500 && data.message.name == "SequelizeValidationError") {
				toast.error(data.message.errors[0].message)
				setLoading(false)
			}
		})
		setLoading(false)
	}



	return {
		createUser,
		getAllUsers,
		editUser,
		deleteUser,
		userLoading: loading,
		userTableData: userData,
	}
}

export default useUser 