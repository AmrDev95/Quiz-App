"use strict";

import { Quiz } from "./Quiz.js";

export class Progress{
    constructor(isStatic, circlediv, size, numberOfQuestions, duration, counter, toFadeOut, toFadeIn, quizResults, del=false){
        this.isStatic = isStatic;
        this.circlediv = circlediv;
        this.del = del;
        this.size= size;
        if(this.isStatic==true){
            this.numberOfQuestions = numberOfQuestions;
            this.staticProgress();
        }

        else{
            this.duration= duration;
            this.counter = counter;
            this.toFadeOut = toFadeOut;
            this.toFadeIn = toFadeIn;
            this.quizResults = quizResults;
            let secondsLeft = this.duration/1000;
            this.createProgBar();
            this.SetInterval(secondsLeft);            
        }
    }

    staticProgress(){
        $(`#${this.circlediv}`).circleProgress({
            value: this.numberOfQuestions,
            size: 80,
            fill: {
                color: "rgb(30,133,254)",
            }
          });

        //   console.log(this.numberOfQuestions);
    }


        createProgBar() {
        $(`#${this.circlediv}`).circleProgress({
            value: 0,
            startAngle: 0,
            size: this.size,
            fill: {
              color: "rgb(30,133,254)",
            },
            animation:{
                duration: this.duration,
                easing: "circleProgressEasing"
            },
            animationStartValue:1
          });
        //   console.log(this.duration);
        //   console.log(this.size);
    }


    SetInterval(secondsLeft){
        this.counter.innerHTML = secondsLeft;
        let x = setInterval(() => {
            secondsLeft--;
            this.counter.innerHTML = `${secondsLeft}`;
            console.log(this.del);
            if(secondsLeft==0 || this.del == true){
                clearInterval(x);
                if(this.toFadeOut !=''){
                    $(`#${this.toFadeOut}`).fadeOut(500, ()=>{
                        $(`#${this.toFadeIn}`).fadeIn(500);
                    })
    
                    new Quiz(this.quizResults);
                }
            }

        }, 1000);
    }

}

// export class Progress{
//     constructor(circlediv, size, duration, counter, toFadeOut, toFadeIn, quizResults, numberOfQuestions){
//         this.circlediv = circlediv;
//         this.counter = counter;
//         this.numberOfQuestions = numberOfQuestions;
//         this.toFadeOut = toFadeOut;
//         this.toFadeIn = toFadeIn;
//         this.size = size;
//         this.duration = duration;
//         this.quizResults = quizResults;
//         console.log(this.duration);
//         if(counter =='' || counter == null){
//             this.staticProgress();
//         }

//         else{
//             let secondsLeft = this.duration/1000;
//             this.create = this.createProgBar();
//             this.SetInterval(secondsLeft);
//         }
//     }

//     createProgBar() {
//         $(`#${this.circlediv}`).circleProgress({
//             value: 0,
//             startAngle: 0,
//             size: this.size,
//             fill: {
//               color: "rgb(30,133,254)",
//             },
//             animation:{
//                 duration: this.duration,
//                 easing: "circleProgressEasing"
//             },
//             animationStartValue:1
//           });
//           console.log(this.duration);
//           console.log(this.size);
//     }


    // SetInterval(secondsLeft){
    //     this.counter.innerHTML = secondsLeft;
    //     let x = setInterval(() => {
    //         secondsLeft--;
    //         this.counter.innerHTML = `${secondsLeft}`;
    //         if(secondsLeft==0){
    //             clearInterval(x);
    //             $(`#${this.toFadeOut}`).fadeOut(500, ()=>{
    //                 $(`#${this.toFadeIn}`).fadeIn(500);
    //             })

    //             new Quiz(this.quizResults);
    //         }
    //     }, 1000);
    // }


//     staticProgress(){
//         $(`#${this.circlediv}`).circleProgress({
//             value: this.numberOfQuestions,
//             size: 80,
//             fill: {
//                 color: "rgb(30,133,254)",
//             }
//           });
//     }
// }