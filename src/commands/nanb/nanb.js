import { setApiData, getApiData } from "./fetch.js";

class Nanb {
  constructor(start, ans, guess, data, user) {
    this.start = start;
    this.ans = ans;
    this.guess = guess;
    this.data = data;
    this.user = user;
    this.ab = { a: Number, b: Number };
    this.printResult = "";
  }

  get result() {
    return this.printResult;
  }

  clear = () => {
    this.setAB(true);
    this.setNum(true);
    this.setAns(true);
    this.setTimes(true);
    this.setStart(true);
  };

  setStart = (end = false) => {
    if (end == false) {
      this.data.start = !this.data.start;
    } else {
      this.data.start = false;
    }
  };

  setAns = (clear = false) => {
    if (clear == true) {
      this.data.ans = null;
    } else {
      this.data.ans = this.ans;
    }
  };

  setNum = (clear = false) => {
    if (clear == true) {
      this.data.num = [];
    } else {
      const numList = this.data.num;
      numList.push(this.guess);
      this.data.num = numList;
    }
  };

  setAB = (clear = false) => {
    if (clear == true) {
      this.data.ab = [];
    } else {
      const numList = this.data.ab;
      numList.push(this.ab);
      this.data.ab = numList;
    }
  };

  setTimes = (end = false) => {
    if (!end) {
      this.data.times += 1;
    } else {
      this.data.times = 0;
    }
  };

  handleStart = () => {
    if (this.data.start != this.start) {
      this.setStart();
    } else {
      return "warning: 已經開始";
    }
  };

  handleAnswer = () => {
    if (this.data.start && this.data.ans != null) {
      return "已經設定過答案了";
    } else if (this.data.start && this.data.ans == null) {
      this.setAns();
    } else {
      this.setAns(true);
      return "warning: 還沒開始";
    }
  };

  handleGuess = () => {
    if (this.data.start) {
      if (this.data.ans != null) {
        this.setTimes();
        this.setNum();
        this.compare();
      } else {
        return "warning: 未設定答案";
      }
    } else {
      this.setNum(true);
      return "warning: 還沒開始";
    }
  };

  handleStatus=()=>{
    let startStatus,ansStatus,resultStatus
    this.start? startStatus = "開始":startStatus = "結束"
    if(this.ans != null){
      ansStatus = "已設定"
    }
    else{
      ansStatus = "未設定"
    }
    resultStatus = `遊戲狀態:\n    遊戲開始: ${startStatus}\n    答案設定: ${ansStatus}\n    答題次數: ${this.data.num.length}`
    return resultStatus
  }

  compare = () => {
    let a = 0;
    let b = 0;
    const ans = this.data.ans.toString();
    const guess = this.guess.toString();
    for (let i = 0; i < 4; i++) {
      if (ans[i] == guess[i]) {
        a += 1;
      }
      for (let j = 0; j < 4; j++) {
        if (ans[i] == guess[j]) {
          b += 1;
        }
      }
    }
    b = b - a;
    this.ab = { a: a, b: b };
    this.setAB();
    if (a == 4) {
      this.print(true);
      this.clear();
    } else {
      this.print();
    }
  };
  print = (win = false) => {
    let result = "";
    const text = "`";
    for (let i = 0; i < this.data.num.length; i++) {
      result += ` ${this.data.num[i]} > ${this.data.ab[i].a}A ${this.data.ab[i].b}B\n`;
    }
    if (!win) {
      result += `\n \n          次數: ${this.data.times}\n          答題者:${this.user}`;
    } else {
      result += `\n \n          次數: ${this.data.times}\n          獲勝者:${this.user}\nend-----------------------------------------------`;
    }
    this.printResult = text + text + text + result + text + text + text;
  };
  setting = async () => {
    await setApiData(this.data);
    console.log("SET");
  };
}

const stringToInt = (start) => {
  if (start == "start") {
    start = 1;
  } else if (start == "restart") {
    start = 2;
  }
  else if(start == "status"){
    start = 3;
  }
  else {
    start = null;
  }
  return start;
};

export const playNanb = async (start, answer, guessnum, user) => {
  const data = await getApiData();
  const startBool = stringToInt(start);
  const playGame = new Nanb(startBool, answer, guessnum, data, user);
  let gameStatus
  let error = null;
  if(startBool == 3){
    gameStatus = playGame.handleStatus()
  }
  if (startBool == 2) {
    playGame.clear();
  } else if (startBool != null) {
    error = playGame.handleStart();
  }
  if (answer != null) {
    error = playGame.handleAnswer();
  }
  if (guessnum != null) {
    error = playGame.handleGuess();
  }
  await playGame.setting();
  return { error: error, result: playGame.result,gameStatus:gameStatus };
};

export const response = (playResult, startbool, number) => {
  const content = playResult.result.toString();
  let printText = "";
  if (content == "" && playResult.error == null) {
    if (startbool != null) {
      if (startbool == "start") {
        printText = `遊戲開始~~\n`;
      } else if (startbool == "restart") {
        printText = `結束遊戲~~\n`;
      } else if(startbool == "status"){
        printText = playResult.gameStatus
      }
    }
    if (number != null) {
      printText += `設定好了!!\n`;
    }
  } else if (content != "") {
    printText = content;
  } else {
    printText = playResult.error;
  }

  return printText;
};
