
import { GameIProps, GameConfigIProps } from '@/types/game'
import { useState } from 'react';
import toast from 'react-hot-toast';


const useGame = () => {
    const [loading, setLoading] = useState(false)
    const [gameData, setGameData] = useState([])

    const getAllGames = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/game/get-all-games', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) {
                setLoading(false)
                res.json().then((data: any) => {
                    setGameData(data.payload)
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

    const getGamesByCategory = async (category: string) => {
        setLoading(true)
        try {
            const res = await fetch(`/api/game/get-game-by-category/${category}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) {
                setLoading(false)
                res.json().then((data: any) => {
                    setGameData(data.payload)
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
    const getGamesByDateRange = async (data: object) => {
        setLoading(true)
        try {
            const res = await fetch(`/api/game/get-game-by-date-range`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: data }),
            });

            if (res.status === 200) {
                setLoading(false)
                res.json().then((data: any) => {
                    setGameData(data.payload)
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

    const createGame = async (data: GameIProps, actionFun?: () => void) => {
        setLoading(true)
        const res = await fetch('/api/game/create', {
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

    const editGame = async (data: GameIProps, id: any, actionFun?: () => void) => {
        setLoading(true)
        const res = await fetch(`/api/game/edit-game/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: data }),
        });

        res?.json().then((data: any) => {
            if (data.status === 201) {
                toast.success(data.message)
                setLoading(false)
                getAllGames()
                actionFun !== undefined ? actionFun() : null
            }
            if (data.status === 500 && data.message.name == "SequelizeValidationError") {
                toast.error(data.message.errors[0].message)
                setLoading(false)
            }
        })
        setLoading(false)
    }

    const deleteGame = async (id: any, actionFun?: () => void) => {
        setLoading(true)
        const res = await fetch(`/api/game/delete-game/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        res?.json().then((data: any) => {
            if (data.status === 201) {
                toast.success(data.message)
                setLoading(false)
                getAllGames()
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
        createGame,
        getAllGames,
        editGame,
        deleteGame,
        getGamesByCategory,
        getGamesByDateRange,
        gameLoading: loading,
        gameTableData: gameData,
    }
}

export default useGame