import { Progress } from "./progress.js";


export class Quiz {
    constructor(questionsArray){
        this.toFilter;
        this.correctAnswers=0;
        this.counter = 1;
        this.questionIndex = 0;
        document.getElementById('remainder').innerHTML = `Q${this.counter}`;
        this.questionsArray = questionsArray;
        this.numberOfQuestions = questionsArray.length;
        this.currentQuestion = this.counter/this.numberOfQuestions;
        this.displayQuestion(this.questionIndex);
        this.question = document.getElementById('question');
        this.submitButton = document.getElementById('submitButton');
        this.submitButton.addEventListener('click', this.nextQuestion.bind(this));
    }


    displayQuestion(index){
        this.createProgress();
        this.setInterval();
        document.getElementById('remainder').innerHTML = `Q${this.counter}`;
        document.getElementById('question').innerHTML = this.questionsArray[index].question;
        let answersArray = [this.questionsArray[index].correct_answer, ...this.questionsArray[index].incorrect_answers];
        // console.log(answersArray);
        answersArray = this.shuffle(answersArray);
        // console.log(answersArray);
        let displayAnswers = document.getElementById('MCQDiv');
        let container ='';
        for(let i= 0; i<answersArray.length; i++){
            container +=`
            <div class="form-check">
            <input type="radio" name="answers" value="${answersArray[i]}" class="form-check-input" checked/>
            <label class="form-check-label">${answersArray[i]}</label>
        </div>
            `;
        }
        displayAnswers.innerHTML = container;
        this.toFilter = Array.from(document.getElementsByName("answers"));
    }

    createProgress(){
        new Progress(true, 'noofQuestions', 100, this.counter/this.numberOfQuestions);
        this.x = new Progress(false, 'timerProgress', 100,'', 30000, document.getElementById('questionTimer'), '', '');
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


      nextQuestion(){
        this.counter++;
        this.x.del = true;
        new Progress(false, 'timerProgress', 100,'', 30000, document.getElementById('questionTimer'), '', '', '', true);
        let userAnswer = this.toFilter.filter(elem=>elem.checked)[0].value;
        if(userAnswer == this.questionsArray[this.questionIndex].correct_answer){
            this.questionIndex++;
            this.correctAnswers++;
            if(this.counter > this.questionsArray.length){
                $('#startQuiz').fadeOut(500, ()=>{
                    $('#rightDiv').fadeIn(500,()=>{
                        $('#rightDiv').fadeOut(500,()=>{
                            $('#resultsSection').fadeIn(500);
                            console.log(this.correctAnswers);
                        })
                    })
                });
            }

            else{
                $('#startQuiz').fadeOut(500, ()=>{
                    $('#rightDiv').fadeIn(500,()=>{
                        $('#rightDiv').fadeOut(500, ()=>{
                            $('#startQuiz').fadeIn(500, ()=>{
                                this.displayQuestion(this.questionIndex);
                            });
                        })
                    })
                });
            }
        }

        else{
            this.questionIndex++;
            if(this.counter > this.questionsArray.length){
                $('#startQuiz').fadeOut(500, ()=>{
                    $('#wrongDiv').fadeIn(500,()=>{
                        $('#wrongDiv').fadeOut(500, ()=>{
                            $('#resultsSection').fadeIn(500);
                            console.log(this.correctAnswers);
                        })
                    })
                });
            }

            else{
                $('#startQuiz').fadeOut(500,()=>{
                    $('#wrongDiv').fadeIn(500,()=>{
                        $('#wrongDiv').fadeOut(500,()=>{
                            $('#startQuiz').fadeIn(500, ()=>{
                                this.displayQuestion(this.questionIndex);
                            });
                        })
                    })
                });
            }
            // check if questions are done
            
        }
      }


      setInterval(){
        let timeLeft = document.getElementById('questionTimer');
        let y = setInterval(() => {
            if(timeLeft.innerHTML == 0){
                clearInterval(y);
                this.nextQuestion();
            }
        }, 1000);
        }
      


}