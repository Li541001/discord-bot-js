import { getApiData,setApiData } from "./fetch.js"

class Database{
  construct (userId){
    this.userId = userId                       //string
    this.originData = this.apiData()           //api object
    this.data = this.englishData()             //english object
    this.contrastData = this.contrastData()    //bool
  }
  async apiData (){
    const datas = await getApiData()
    return datas
  }
  englishData(){
    const datas = this.originData.english
    return datas
  }
  contrastData(){
    const sameId = false
    const keys = Object.keys(this.data)
    keys.forEach((item,index)=>{
      if(item == this.userId){
        sameId = true
      }
    })
    return sameId
  }
  getData(){
    return this.data
  }
  setData(data){
    this.data = data
  }
  updateData(){
    this.originData.english = this.data
    setApiData(this.originData)
  }
}

  class UserDataManage{
    construct(data)
    displayUserData()//回傳displayText
    addUserData()
    createData()
    removeUserData()
  }
  class Handler{
    construct(userId,word,database){
      this.userId = userId
      this.word = word
      this.database = database //class
    }
    handleAddWord()
    handleRemoveWord()
    handleDisplayWord()
  }
  
  
  const handleEnglish=(userId,word)=>{
    let displayText = ""
    const database = new Database (userId)
    const handle = new Handler(userId,word,database)
    //...
    database.updateData()
    return displayText
  }
  //get資料
  //判斷有無資料
  //處理（UserDataManage class）
  //set資料
  //return 引出內容



// class English{
//     constructor (data,displayUserID,word){
//         this.data = data
//         this.displayUserID = displayUserID
//         this.word = word
//     }
//     getData(){
//         const userID = this.displayUserID
//         const key = Object.keys(this.data.english[userID])
//         const value = Object.values(this.data.english[userID])
//         const text = "```"
//         let data = "```單字表\n"
//         key.forEach((item,index)=>{
//             data += `${index+1}. ${item} ${value[index]} \n`
//         })
//         data += text
//         return data
//     }

//     contrastUser(){
//         let sameID = false
//         const keys = Object.keys(this.data.english)
//         keys.forEach((item,index)=>{
//             if(item == this.displayUserID){
//                 sameID = true
//             }
//         })
//         if(sameID == false){
//             return false
//         }else{
//             return true
//         }
//     }

//     createUserData(){
//         let value = ""
//         let key = ""
//         let status = false
//         for(let i=0;i<this.word.length;i++){
//             if(this.word[i] == " "){
//                 status = true
//                 continue
//             }
//             if(status == false){
//                 key += this.word[i]
//             }else{
//                 value += this.word[i]
//             }
//         }
//         const userID = this.displayUserID
//         const dataObj = {...this.data.english,[userID]:{
//             [key]:value
//         }}
//         this.data.english = dataObj
//         setApiData(this.data)
//     }

//     addUserData(){        
//     let value = ""
//     let key = ""
//     let status = false
//     for(let i=0;i<this.word.length;i++){
//         if(this.word[i] == " "){
//             status = true
//             continue
//         }
//         if(status == false){
//             key += this.word[i]
//         }else{
//             value += this.word[i]
//         }
//     }
//     const userID = this.displayUserID
//     const dataObj = {...this.data.english[userID],[key]:value}
//     this.data.english[userID] = dataObj
//     setApiData(this.data)}



// }

// export const handleDisplay=async(displayUserID,word)=>{
//     const apiData = await getApiData()
//     const english = new English(apiData,displayUserID,word)
//     const sameID = english.contrastUser()
//     let printData = ""
//     if(displayUserID != null && sameID == true){
//         printData = english.getData()
//     }else if(displayUserID != null && sameID == false){
//         printData = "您沒有資料"
//     }
//     if(word != null && sameID == true){
//         english.addUserData()
//         printData = "添加成功"
//     }else if(word != null && sameID == false){
//         english.createUserData()
//         printData = "創建成功"
//     }
//     console.log("compete")
//     return printData
// }