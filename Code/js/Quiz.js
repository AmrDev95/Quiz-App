 export class Quiz{
    constructor(arrayOfQues){
        this.arrayOfQues = arrayOfQues;
        this.numQues= arrayOfQues.length;
        document.getElementById("totalAmount").innerHTML = this.numQues
     this.currentElement = document.getElementById("current")
     this.questionsElemt = document.getElementById("question")
     this.rowAnswerELement = document.getElementById("rowAnswer")

     this.score =0;
     this.currentQues =0;

     this.nextBtn = document.getElementById("next")
     this.tryBtn = document.getElementById("tryBtn")

     this.nextBtn.addEventListener("click",this.checkAnswer.bind(this))

     this.showQuestion()
    }
    checkAnswer(){
let correctAnswer = this.arrayOfQues[this.currentQues].correct_answer;
let allAnswers = Array.from(document.getElementsByName("answers"));

let userAnswer = allAnswers.filter(elem=>elem.checked)[0].value;
console.log(userAnswer)
if(userAnswer == correctAnswer)
{
    $("#Correct").fadeIn(700,()=>{
        $("#Correct").hide()
    })
    this.score++;
}else{
    $("#inCorrect").fadeIn(700,()=>{
        $("#inCorrect").hide()
    })
}
this.currentQues++

if(this.currentQues >= this.numQues)
{
    this.finish();

    this.tryBtn.addEventListener("click",function(){
        location.reload();
    })
}else{
    this.showQuestion();
}


    }

    finish(){
$("#quiz").fadeOut(700,()=>{
    $("#finish").fadeIn(500,()=>{
        $("#score").html(this.score)
    })
})
    }

    showQuestion(){
this.currentElement.innerHTML = this.currentQues+1;
this.questionsElemt.innerHTML = this.arrayOfQues[this.currentQues].question;

let allAnswers = [this.arrayOfQues[this.currentQues].correct_answer,...this.arrayOfQues[this.currentQues].incorrect_answers]


allAnswers = this.shuffle(allAnswers)

let cartona=''
for(let i=0 ; i<allAnswers.length ; i++){
    cartona +=`
    <div class="form-check">
    <input type="radio" name="answers" value="${allAnswers[i]}" class="form-check-input" />
    <label class="form-check-label">${allAnswers[i]}</label>
</div>


    `
}

this.rowAnswerELement.innerHTML= cartona;




}



 shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }


}
