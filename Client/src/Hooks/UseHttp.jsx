import axios from "axios"

const useHttp = () => {
    const prefixUrl = 'http://localhost:1000/api/'

    const update = async (url, obj, refetch) => {
        try {

            console.log(obj)
            const res = await axios.put(`${prefixUrl}${url}`, obj)
            refetch()

        }
        catch (error) {
            console.log(error)
        }
    }

    const add = async (url, obj, refetch) => {
        try {

            const res = await axios.post(`${prefixUrl}${url}`, obj)
            refetch()
        }
        catch (error) {
            console.log(error)
        }
    }

    const deleteObj = async (url, refetch) => {
        try {
            const res = await axios.delete(`${prefixUrl}${url}`)
            refetch()
        }
        catch (error) {
            console.log(error)
        }
    }
    return { update, add, deleteObj }
}

export default useHttp
