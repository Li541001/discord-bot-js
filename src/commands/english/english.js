import { getApiData,setApiData } from "./fetch.js"

class English{
    constructor (data,displayUserID,word){
        this.data = data
        this.displayUserID = displayUserID
        this.word = word
    }
    getData(){
        const userID = this.displayUserID
        const key = Object.keys(this.data.english[userID])
        const value = Object.values(this.data.english[userID])
        const text = "```"
        let data = "```單字表\n"
        key.forEach((item,index)=>{
            data += `${index+1}. ${item} ${value[index]} \n`
        })
        data += text
        return data
    }

    contrastUser(){
        let sameID = false
        const keys = Object.keys(this.data.english)
        keys.forEach((item,index)=>{
            if(item == this.displayUserID){
                sameID = true
            }
        })
        if(sameID == false){
            return false
        }else{
            return true
        }
    }

    createUserData(){
        let value = ""
        let key = ""
        let status = false
        for(let i=0;i<this.word.length;i++){
            if(this.word[i] == " "){
                status = true
                continue
            }
            if(status == false){
                key += this.word[i]
            }else{
                value += this.word[i]
            }
        }
        const userID = this.displayUserID
        const dataObj = {...this.data.english,[userID]:{
            [key]:value
        }}
        this.data.english = dataObj
        setApiData(this.data)
    }

    addUserData(){        
    let value = ""
    let key = ""
    let status = false
    for(let i=0;i<this.word.length;i++){
        if(this.word[i] == " "){
            status = true
            continue
        }
        if(status == false){
            key += this.word[i]
        }else{
            value += this.word[i]
        }
    }
    const userID = this.displayUserID
    const dataObj = {...this.data.english[userID],[key]:value}
    this.data.english[userID] = dataObj
    setApiData(this.data)}



}

export const handleDisplay=async(displayUserID,word)=>{
    const apiData = await getApiData()
    const english = new English(apiData,displayUserID,word)
    const sameID = english.contrastUser()
    let printData = ""
    if(displayUserID != null && sameID == true){
        printData = english.getData()
    }else if(displayUserID != null && sameID == false){
        printData = "您沒有資料"
    }
    if(word != null && sameID == true){
        english.addUserData()
        printData = "添加成功"
    }else if(word != null && sameID == false){
        english.createUserData()
        printData = "創建成功"
    }
    console.log("compete")
    return printData
}