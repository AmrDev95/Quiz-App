import {Quiz} from'./Quiz.js'
export class Settings{
    constructor(){
       this.categoryElement = document.getElementById("category");
       this.difficultyElement  =document.getElementsByName("difficulty");
       this.NumberElement  = document.getElementById("numOfQuestions")
       this.startBtn = document.getElementById("startBtn");
       this.startBtn.addEventListener("click",this.getData.bind(this))
    }

  async  getData(){
    if(this.NumberElement.value >= 0 && this.NumberElement.value !='')
    {
        let categoryElement =  this.categoryElement.value;
        let NumberElement = this.NumberElement.value;
        let difficulty = [...this.difficultyElement].filter((elem)=>{
            return elem.checked ==true
        })[0].value;
        // console.log(difficulty)
        let apiUrl =`https://opentdb.com/api.php?amount=${NumberElement}&category=${categoryElement}&difficulty=${difficulty}`
      let myResults = await this.fetApi(apiUrl)
      console.log(myResults)
      $('#formAlert').fadeOut(1000)
      $('#setting').fadeOut(1000,()=>{
        $('#quiz').fadeIn(1000)
      })
new Quiz(myResults)
    }
    else{
        $('#formAlert').fadeIn(1000)
    }

    }


  async  fetApi(url){
let responseData =  await fetch(url)
let myResult = await responseData.json()
// console.log(myResult.results)
return myResult.results
    }
}
