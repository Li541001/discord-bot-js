import { getApiData,setApiData } from "./fetch"

class English{
    constructor (data){
        this.data = data
    }
     get data(){
        const objectData = this.data.english
        const key = Object.keys(objectData)
        const value = Object.values(objectData)
        let data = "單字表\n"
        key.forEach((item,index)=>{
            data += `${item} ${value[index]} \n`
        })
        return data
     }
}

export const handleDisplay=async()=>{
    const apiData = await getApiData()
    const english = new English(apiData)
    const data = english.data()
    return data
}