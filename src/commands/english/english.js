import { getApiData,setApiData } from "./fetch.js"

class Database{
  constructor (userId){
    this.userId = userId       //string
    this.originData = {}     //api object 
    this.data =  {}       //english object
    this.isHaveData = false  //bool
  }
  async initData(){
    await this.apiData()
    this.contrastData()
  }
  async apiData (){
    const datas = await getApiData()
    const englishData = datas.english
    this.originData = datas
    this.data = englishData
  }
  contrastData(){
    let sameId = false
    const keys = Object.keys(this.data)
    keys.forEach((item,index)=>{
      if(item == this.userId){
        sameId = true
      }
    })
    this.isHaveData = sameId
  }

  updateData(){
    this.originData.english = this.data
    setApiData(this.originData)
  }
}

  class UserDataManage{
    constructor(userId,word,data){
      this.userId = userId
      this.word = word
      this.data = data
    }

    displayUserData(){
      
      const id = this.userId
      const key = Object.keys(this.data[id])
      const value = Object.values(this.data[id])
      const text = "```"
      let data = "```單字表:\n"
      key.forEach((item,index)=>{ 
          data += `${index+1}. ${item}   >>>   ${value[index]} \n`
      })
      data += text
      
      return data
    }//回傳displayText
    addUserData(){}
    createData(){}
    removeUserData(){}
  }
  class Handler{
    constructor(userId,addWord,removeWord,database){
      this.userId = userId
      this.addWord = addWord
      this.removeWord = removeWord
      this.database = database //class
    }
    handleAddWord(){}
    handleRemoveWord(){}
    async handleDisplayWord (){
      
      await this.database.initData()
      if(this.database.isHaveData){
        const data = this.database.data
        const manage = new UserDataManage(this.userId,null,data) 
        const displayText = manage.displayUserData()
        return displayText
      }else{
        return "你還沒有建立資料"
      }
    }
  }
  
  
  export const handleEnglish=async(addWord,removeWord ,userId,display)=>{
    let displayText = ""
    const database = new Database(userId)
    const handle = new Handler(userId,addWord,removeWord,database)
    
    if(addWord != null){
      displayText = handle.handleAddWord()
    }
    if(removeWord != null){
      displayText = handle.handleRemoveWord()
    }
    if(display == true){
      displayText = await handle.handleDisplayWord()
    }
    
    // database.updateData()
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