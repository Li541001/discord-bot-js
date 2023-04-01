import { getApiData, setApiData } from "./fetch.js";

class Database {
  constructor(userId) {
    this.userId = userId; //string
    this.originData = {}; //api object
    this.data = {}; //english object
    this.isHaveData = false; //bool
  }
  async initData() {
    await this.apiData();
    this.contrastData();
  }
  async apiData() {
    const datas = await getApiData();
    const englishData = datas.english;
    this.originData = datas;
    this.data = englishData;
  }
  contrastData() {
    let sameId = false;
    const keys = Object.keys(this.data);
    keys.forEach((item, index) => {
      if (item == this.userId) {
        sameId = true;
      }
    });
    this.isHaveData = sameId;
  }

  updateData() {
    this.originData.english = this.data;
    setApiData(this.originData);
  }
}

class UserDataManage {
  constructor(userId, word, data) {
    this.userId = userId;
    this.word = word;
    this.data = data;
  }

  displayUserData() {
    const id = this.userId;
    const key = Object.keys(this.data[id]);
    const value = Object.values(this.data[id]);
    const text = "```";

    let data = "```單字表:\n";
    key.forEach((item, index) => {
      let space = " ";
      const spaceTimes = 12 - item.length;
      for (let i = 0; i <= spaceTimes; i++) {
        space = space + " ";
      }
      data += `${index + 1}. ${item}${space}>>>        ${value[index]} \n`;
    });
    data += text;

    return data;
  } //回傳displayText
  addUserData() {
    let value = "";
    let key = "";
    let status = false;
    for (let i = 0; i < this.word.length; i++) {
      if (this.word[i] == " ") {
        status = true;
        continue;
      }
      if (status == false) {
        key += this.word[i];
      } else {
        value += this.word[i];
      }
    }
    const userID = this.userId;
    this.data[userID] = { ...this.data[userID], [key]: value };
    return "添加完成";
  }

  createData() {
    let value = "";
    let key = "";
    let status = false;
    for (let i = 0; i < this.word.length; i++) {
      if (this.word[i] == " ") {
        status = true;
        continue;
      }
      if (status == false) {
        key += this.word[i];
      } else {
        value += this.word[i];
      }
    }
    const userID = this.userId;
    this.data = {
      ...this.data,
      [userID]: {
        [key]: value,
      },
    };
    return "創建成功";
  }
  removeUserData() {
    const userData = this.data[this.userId];
    const userDataKey = Object.keys(userData);
    let status = false;
    userDataKey.forEach((item, index) => {
      if (item === this.word && item != undefined) {
        delete this.data[this.userId][item];
        status = true;
        return;
      }
    });
    if (status == false) {
      return "沒有這個單字";
    } else {
      return "刪除成功";
    }
  }
}
class CleanWordList {
  constructor(userId, data) {
    this.userId = userId;
    this.data = data;
  }
  azSort() {
    const userData = this.data[this.userId];
    const userDataKey = Object.keys(userData);
    userDataKey.sort((a, b) => {
      const firstCharA = a.charAt(0).toLowerCase();
      const firstCharB = b.charAt(0).toLowerCase();
      if (firstCharA < firstCharB) {
        return -1;
      }
      if (firstCharA > firstCharB) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });
    let cleanObj = {};
    userDataKey.forEach((item) => {
      const value = userData[item];
      cleanObj = { ...cleanObj, [item]: value };
    });
    this.data[this.userId] = cleanObj;
    return "整理完成";
  }
  toLower() {
    const userData = this.data[this.userId];
    const userDataKey = Object.keys(userData);
    let newObj = {};
    userDataKey.forEach((item, index, array) => {
      const firstChar = item.charAt(0).toLowerCase();
      let word = `${firstChar}${item.substring(1)}`;
      newObj[word] = userData[item];
    });
    this.data[this.userId] = newObj;
    return "整理完成";
  }
  toUppper() {
    const userData = this.data[this.userId];
    const userDataKey = Object.keys(userData);
    let newObj = {};
    userDataKey.forEach((item, index, array) => {
      const firstChar = item.charAt(0).toUpperCase();
      let word = `${firstChar}${item.substring(1)}`;
      newObj[word] = userData[item];
    });
    this.data[this.userId] = newObj;
    return "整理完成";
  }
}
class Handler {
  constructor(userId, addWord, removeWord, cleanType, database) {
    this.userId = userId;
    this.addWord = addWord;
    this.removeWord = removeWord;
    this.cleanType = cleanType;
    this.database = database; //class
  }
  async handleAddWord() {
    await this.database.initData();
    const data = this.database.data;
    const manage = new UserDataManage(this.userId, this.addWord, data);
    if (this.database.isHaveData) {
      const displayText = manage.addUserData();
      this.database.data = manage.data;
      return displayText;
    } else {
      const displayText = manage.createData();
      this.database.data = manage.data;
      return displayText;
    }
  }
  async handleRemoveWord() {
    await this.database.initData();
    const data = this.database.data;
    const manage = new UserDataManage(this.userId, this.removeWord, data);
    if (this.database.isHaveData) {
      const displayText = manage.removeUserData();
      this.database.data = manage.data;
      return displayText;
    } else {
      return "你還沒有建立資料";
    }
  }
  async handleDisplayWord() {
    await this.database.initData();
    if (this.database.isHaveData) {
      const data = this.database.data;
      const manage = new UserDataManage(this.userId, null, data);
      const displayText = manage.displayUserData();
      return displayText;
    } else {
      return "你還沒有建立資料";
    }
  }
  async handleTydeUp() {
    await this.database.initData();
    if (this.database.isHaveData) {
      const data = this.database.data;
      const tydeUp = new CleanWordList(this.userId, data);
      let displayText = "";
      if (this.cleanType == "1") {
        displayText = tydeUp.azSort();
      } else if (this.cleanType == "2") {
        displayText = tydeUp.toLower();
      } else {
        displayText = tydeUp.toUppper();
      }

      this.database.data = tydeUp.data;
      return displayText;
    } else {
      return "你還沒有建立資料";
    }
  }
}

class Exam {
  //開始考試(設定單字數量、顯示考試單字)、結束考試(比對答案、顯示結果)
  constructor(userId, wordAmount, userAnsewr, database) {
    this.userId = userId;
    this.wordAmount = wordAmount;
    this.userAnsewr = userAnsewr;
    this.database = database;
  }
  getRandomWord() {
    const userData = this.database[this.userId];
  }
  displaySubjectWord() {}
  compareAnswer() {}
}

export const handleEnglish = async (
  addWord,
  removeWord,
  userId,
  display,
  clean
) => {
  let displayText = "";
  const database = new Database(userId);
  const handle = new Handler(userId, addWord, removeWord, clean, database);

  if (addWord != null) {
    displayText = await handle.handleAddWord();
  }
  if (removeWord != null) {
    displayText = await handle.handleRemoveWord();
  }
  if (display == true) {
    displayText = await handle.handleDisplayWord();
  }
  if (clean != null) {
    displayText = await handle.handleTydeUp();
  }

  database.updateData();
  return displayText;
};

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
