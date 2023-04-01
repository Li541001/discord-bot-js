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
    database
  ) {
    this.userId = userId;
    this.addWord = addWord;
    this.removeWord = removeWord;
    this.markWord = markWord;
    this.cancelMarkWord = cancelMarkWord;
    this.cleanType = cleanType;
    this.wordAmount = wordAmount;
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
      const exam = new Exam(this.userId, this.wordAmount, this.userAnsewr,data);
      
      const displayText = exam.getRandomWord();
      
      return displayText;
    } else {
      return "你還沒有建立資料";
    }
  }
}

class Exam {
  //開始考試(設定單字數量、顯示考試單字)、結束考試(比對答案、顯示結果)
  constructor(userId, wordAmount, userAnsewr, data) {
    this.userId = userId;
    this.wordAmount = wordAmount;
    this.userAnsewr = userAnsewr;
    this.data = data;
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
  displaySubjectWord() {}
  compareAnswer() {}
}

export const handleEnglish = async (
  addWord,
  removeWord,
  markWord,
  cancelMarkWord,
  userId,
  display,
  clean,
  wordAmount
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

  database.updateData();
  return displayText;
};
//get資料
//判斷有無資料
//處理（UserDataManage class）
//set資料
//return 引出內容
