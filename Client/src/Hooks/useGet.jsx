import useAxios from 'axios-hooks'
const useGet=(url)=>{

    const [{data,loading,error},refetch]=useAxios(
            `http://localhost:1000/api/${url}`
    )
    return {data,loading, refetch}
}

export default useGet