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

    let data = "```js\n單字表:\n";
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
  markUserWord() {
    const userData = this.data[this.userId];
    const userDataKey = Object.keys(userData);
    let status = false;
    userDataKey.forEach((item) => {
      if (item == this.word) {
        const value = userData[item] + '"';
        delete userData[item];
        const keyName = `"${item}`;
        userData[keyName] = value;
        status = true;
      }
    });
    if (status == true) {
      this.data[this.userId] = userData;
      return "標記完成";
    } else {
      return "沒有標記這個單字";
    }
  }
  cancelMarkUserWord() {
    const userData = this.data[this.userId];
    const userDataKey = Object.keys(userData);
    let status = false;
    userDataKey.forEach((item) => {
      const keyName = item.substring(1);
      if (keyName == this.word) {
        const valuelength = userData[item].length;
        const value = userData[item].substring(0, valuelength - 1);
        delete userData[item];
        userData[keyName] = value;
        status = true;
      }
    });
    if (status == true) {
      this.data[this.userId] = userData;
      return "取消標記完成";
    } else {
      return "沒有標記這個單字";
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
      if(a.charAt(0)==`"`){
        a= a.substring(1)
      }
      if(b.charAt(0)==`"`){
        b = b.substring(1)
      }
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
  constructor(
    userId,
    addWord,
    removeWord,
    markWord,
    cancelMarkWord,
    cleanType,
    wordAmount,
    endExam,
    answerExam,
    database
  ) {
    this.userId = userId;
    this.addWord = addWord;
    this.removeWord = removeWord;
    this.markWord = markWord;
    this.cancelMarkWord = cancelMarkWord;
    this.cleanType = cleanType;
    this.wordAmount = wordAmount;
    this.endExam = endExam;
    this.answerExam = answerExam;
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
  async handleMarkWord() {
    await this.database.initData();
    if (this.database.isHaveData) {
      const data = this.database.data;
      const manage = new UserDataManage(this.userId, this.markWord, data);
      const displayText = manage.markUserWord();
      this.database.data = manage.data;
      return displayText;
    } else {
      return "你還沒有建立資料";
    }
  }
  async handleCancelMarkWord() {
    await this.database.initData();
    if (this.database.isHaveData) {
      const data = this.database.data;
      const manage = new UserDataManage(this.userId, this.cancelMarkWord, data);
      const displayText = manage.cancelMarkUserWord();
      this.database.data = manage.data;
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
  async handleStartExam(){
    await this.database.initData();
    if (this.database.isHaveData) {
      const data = this.database.data;
      const exam = new Exam(this.userId, this.wordAmount, this.answerExam,data);
      const qualify =  exam.isStart()
      if(qualify) return "有考試正在進行 請使用end指令結束考試"
      exam.getRandomWord();
      exam.storeRandomWord();
      this.database.data = exam.data;
      const displayText = exam.displaySubjectWord();
      return displayText;
    } else {
      return "你還沒有建立資料";
    }
  }
  async handleEndExam(){
    await this.database.initData();
    if(this.endExam == "2") return "oh on!"
    if (this.database.isHaveData) {
      const data = this.database.data;
      const exam = new Exam(this.userId, this.wordAmount, this.answerExam,data);
      const qualify =  exam.isStart()
      if(!qualify){
        return "目前沒有考試進行中"
      } else{
        exam.shutDownExam()
        return "考試結束"
      }
    } else {
      return "你還沒有建立資料";
    }
  }
  async handleAnswerExam(){
    await this.database.initData();
    if (this.database.isHaveData) {
      const data = this.database.data;
      const exam = new Exam(this.userId, this.wordAmount, this.answerExam,data);
      const qualify =  exam.isStart()
      if(!qualify){
        return "目前沒有考試"
      } 
      
      const displayText = exam.compareAnswer()
      exam.shutDownExam()
      return displayText


    } else {
      return "你還沒有建立資料";
    }
  }
}

class Exam {
  //開始考試(設定單字數量、顯示考試單字)、結束考試(比對答案、顯示結果)
  constructor(userId, wordAmount, userAnsewr, data) {
    this.userId = userId;
    this.wordAmount = wordAmount - 1;
    this.userAnsewr = userAnsewr;
    this.data = data;
    this.randomKey = []
    
  }
  isStart(){
    const userData = this.data.exam
    if(userData == undefined){
      return false
    }else{
      return true
    }
  }
  getRandomWord() {
    const min = 1
    const userData = this.data[this.userId]
    
    const userDataKey = Object.keys(userData)
    const max = userDataKey.length
    let randomNumList = []
    this.randomKey = []
    
    for(let i=0;i<=this.wordAmount;i++){
      const randomNum = Math.floor(Math.random()*(max-1))+min;
      if(randomNumList.includes(randomNum)){
        this.wordAmount+=1
      }else{
        randomNumList.push(randomNum)
        this.randomKey.push(userDataKey[randomNum])
      }
    }
  }
  storeRandomWord(){
    const userData = this.data[this.userId]
    let newObj = {}
    this.randomKey.forEach((item)=>{
      const value = userData[item]
      newObj[item] = value
    })
    this.data = {...this.data,"exam":newObj}
  }
  displaySubjectWord() {
    let displayText = "```js\n題目:\n";
    const text = "```"
    this.randomKey.forEach((item,index)=>{
      displayText += `${index + 1}. ${item}\n`
    })
    displayText += text
    return displayText
  }
  shutDownExam(){
    delete this.data.exam
  }
  compareAnswer() {
    const userData = this.data.exam
    const value = Object.values(userData)
    const key = Object.keys(userData)
    let answerList = []
    let temp = ""
    let finnalText = "```diff\n結果:\n"
    finnalText += `    題目                 正確答案     你的答案\n`
    let correctNum = 0
    for(let i of (this.userAnsewr+=" ")){
      if(i == " "){
        answerList.push(temp)
        temp = ""
      }else{
        temp += i
      }
    }
    value.forEach((item,index)=>{
      let space = " ";
      let space2 = " ";
      
      const spaceTimes = 12 - key[index].length;
      const spaceTimes2 = 8 - item.length;
      for (let i = 0; i <= spaceTimes; i++) {
        space = space + " ";
      }
      for (let i = 0; i <= spaceTimes2; i++) {
        space2 = space2 + " ";
      }

      if(item == answerList[index]){
        finnalText += `+${index+1}. ${key[index]}${space}>>>    ${item}${space2}${answerList[index]}\n`
        correctNum += 1
      }else{
        finnalText += `-${index+1}. ${key[index]}${space}>>>    ${item}${space2}${answerList[index]}\n`
      }
    })
    const fraction = Math.round((correctNum/key.length)*1000)/10
    finnalText += `\n\n    得分: ${fraction}\nend----------------------------------`
    finnalText += "```"
    return finnalText
  }
}

export const handleEnglish = async (
  addWord,
  removeWord,
  markWord,
  cancelMarkWord,
  userId,
  display,
  clean,
  wordAmount,
  endExam,
  answerExam
) => {
  let displayText = "";
  const database = new Database(userId);
  const handle = new Handler(
    userId,
    addWord,
    removeWord,
    markWord,
    cancelMarkWord,
    clean,
    wordAmount,
    endExam,
    answerExam,
    database
  );
  if (addWord != null) {
    displayText = await handle.handleAddWord();
  }
  if (removeWord != null) {
    displayText = await handle.handleRemoveWord();
  }
  if (markWord != null) {
    displayText = await handle.handleMarkWord();
  }
  if (cancelMarkWord != null) {
    displayText = await handle.handleCancelMarkWord();
  }
  if (display == true) {
    displayText = await handle.handleDisplayWord();
  }
  if (clean != null) {
    displayText = await handle.handleTydeUp();
  }
  if(wordAmount != null){
    displayText = await handle.handleStartExam();
  }
  if(endExam != null){
    displayText = await handle.handleEndExam();
  }
  if(answerExam != null){
    displayText = await handle.handleAnswerExam();
  }
  if(database.data != {}){
    database.updateData();
  }
  return displayText;
};
//get資料
//判斷有無資料
//處理（UserDataManage class）
//set資料
//return 引出內容
