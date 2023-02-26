import dotenv from 'dotenv'

dotenv.config()

export const getApiData = async () => {
    const response = await fetch(process.env.JSONSTORE_GET_URL)
    const database = await response.json()
    const data = database
    return data
}

export const setApiData = async (data) => {
    await fetch(process.env.JSONSTORE_PUT_URL, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}




