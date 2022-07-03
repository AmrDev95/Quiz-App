"use strict";
import { Progress } from './progress.js';


export class setting{
    constructor(){
        this.animals = document.getElementById('animals');
        this.videoGames = document.getElementById('videoGames');
        this.sports = document.getElementById('sports');
        this.science = document.getElementById('science');
        this.history = document.getElementById('history');
        this.generalKnowledge = document.getElementById('generalKnowledge');
        this.easy = document.getElementById('easy');
        this.medium = document.getElementById('medium');
        this.hard = document.getElementById('hard');
        document.addEventListener('click', this.getCategory.bind(this));
        document.addEventListener('click', this.getDifficulty.bind(this));
        this.nOfQuestions = document.getElementById('nOfQuestions');
        this.startButton = document.getElementById('startButton');
        this.startButton.addEventListener('click', this.fetchQuiz.bind(this));
    }

    getCategory(e){
       if(e.target == this.animals){
        this.categoryElement = 27;
        this.animals.classList.add('bg-theme');
        this.sports.classList.remove('bg-theme');
        this.science.classList.remove('bg-theme');
        this.history.classList.remove('bg-theme');
        this.videoGames.classList.remove('bg-theme');
        this.generalKnowledge.classList.remove('bg-theme');
        this.animals.classList.add('text-white');
        this.sports.classList.remove('text-white');
        this.science.classList.remove('text-white');
        this.history.classList.remove('text-white');
        this.videoGames.classList.remove('text-white');
        this.generalKnowledge.classList.remove('text-white');
       }

       else if(e.target==this.videoGames){
        this.categoryElement = 15;
        this.animals.classList.remove('bg-theme');
        this.sports.classList.remove('bg-theme');
        this.science.classList.remove('bg-theme');
        this.history.classList.remove('bg-theme');
        this.videoGames.classList.add('bg-theme');
        this.generalKnowledge.classList.remove('bg-theme');
        this.animals.classList.remove('text-white');
        this.sports.classList.remove('text-white');
        this.science.classList.remove('text-white');
        this.history.classList.remove('text-white');
        this.videoGames.classList.add('text-white');
        this.generalKnowledge.classList.remove('text-white');
       }

       else if(e.target==this.sports){
        this.categoryElement = 21;
        this.animals.classList.remove('bg-theme');
        this.sports.classList.add('bg-theme');
        this.science.classList.remove('bg-theme');
        this.history.classList.remove('bg-theme');
        this.videoGames.classList.remove('bg-theme');
        this.generalKnowledge.classList.remove('bg-theme');
        this.animals.classList.remove('text-white');
        this.sports.classList.add('text-white');
        this.science.classList.remove('text-white');
        this.history.classList.remove('text-white');
        this.videoGames.classList.remove('text-white');
        this.generalKnowledge.classList.remove('text-white');
       }

       else if(e.target==this.science){
        this.categoryElement = 18;
        this.animals.classList.remove('bg-theme');
        this.sports.classList.remove('bg-theme');
        this.science.classList.add('bg-theme');
        this.history.classList.remove('bg-theme');
        this.videoGames.classList.remove('bg-theme');
        this.generalKnowledge.classList.remove('bg-theme');
        this.animals.classList.remove('text-white');
        this.sports.classList.remove('text-white');
        this.science.classList.add('text-white');
        this.history.classList.remove('text-white');
        this.videoGames.classList.remove('text-white');
        this.generalKnowledge.classList.remove('text-white');
       }

       else if(e.target==this.history){
        this.categoryElement = 23;
        this.animals.classList.remove('bg-theme');
        this.sports.classList.remove('bg-theme');
        this.science.classList.remove('bg-theme');
        this.history.classList.add('bg-theme');
        this.videoGames.classList.remove('bg-theme');
        this.generalKnowledge.classList.remove('bg-theme');
        this.animals.classList.remove('text-white');
        this.sports.classList.remove('text-white');
        this.science.classList.remove('text-white');
        this.history.classList.add('text-white');
        this.videoGames.classList.remove('text-white');
        this.generalKnowledge.classList.remove('text-white');
       }

       else if(e.target==this.generalKnowledge){
        this.categoryElement = 9;
        this.animals.classList.remove('bg-theme');
        this.sports.classList.remove('bg-theme');
        this.science.classList.remove('bg-theme');
        this.history.classList.remove('bg-theme');
        this.videoGames.classList.remove('bg-theme');
        this.generalKnowledge.classList.add('bg-theme');
        this.animals.classList.remove('text-white');
        this.sports.classList.remove('text-white');
        this.science.classList.remove('text-white');
        this.history.classList.remove('text-white');
        this.videoGames.classList.remove('text-white');
        this.generalKnowledge.classList.add('text-white');
       }
    }

    getDifficulty(e){
        if(e.target == this.easy){
            this.difficultyElement = 'easy';
            this.easy.classList.add('bg-theme');
            this.medium.classList.remove('bg-theme');
            this.hard.classList.remove('bg-theme');
            this.easy.classList.add('text-white');
            this.medium.classList.remove('text-white');
            this.hard.classList.remove('text-white');
        }

        else if(e.target == this.medium){
            this.difficultyElement = 'medium';
            this.easy.classList.remove('bg-theme');
            this.medium.classList.add('bg-theme');
            this.hard.classList.remove('bg-theme');
            this.easy.classList.remove('text-white');
            this.medium.classList.add('text-white');
            this.hard.classList.remove('text-white');
        }

        else if(e.target == this.hard){
            this.difficultyElement = 'hard';
            this.easy.classList.remove('bg-theme');
            this.medium.classList.remove('bg-theme');
            this.hard.classList.add('bg-theme');
            this.easy.classList.remove('text-white');
            this.medium.classList.remove('text-white');
            this.hard.classList.add('text-white');
        }
    }

    async fetchQuiz(){
        let quizRequest = await fetch(`https://opentdb.com/api.php?amount=${this.nOfQuestions.value}&category=${this.categoryElement}&difficulty=${this.difficultyElement}`);
        let quiz = await quizRequest.json();

        if(quiz.results.length>0){
            $("#quizSetup").fadeOut(500, ()=>{
                $('#startQuizCounter').fadeIn(500, ()=>{
                    let counter = document.getElementById('startCount');
                    console.log(quiz.results);
                    new Progress(false, 'circle', 200,'', 3000, counter, 'startQuizCounter', 'startQuiz', quiz.results);
                });
            });
        }
    }
}
