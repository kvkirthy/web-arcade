import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'wade-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.sass']
})
export class DiceComponent implements OnInit {

  @Input() draw: string = '';
  @Output() rollResult = new EventEmitter<number>();   

  selectedDiceSideCssClass: string = '';

  constructor() { }

  ngOnInit(): void {
    if(this.draw){
      this.showOnDice(+this.draw);
    } else {
      this.rollDice();
    }
  }

  // show the given number (draw parameter) on the dice
  showOnDice(draw: number){
    // the css class img-x show appropriate side on the dice.
    switch (draw) {
      case 1: {
        this.selectedDiceSideCssClass = 'img-1';
        break;
      }
      case 2: {
        this.selectedDiceSideCssClass = 'img-2';
        break;
      }
      case 3: {
        this.selectedDiceSideCssClass = 'img-3';
        break;
      }
      case 4: {
        this.selectedDiceSideCssClass = 'img-4';
        break;
      }
      case 5: {
        this.selectedDiceSideCssClass = 'img-5';
        break;
      }
      case 6: {
        this.selectedDiceSideCssClass = 'img-6';
        break;
      }
      default: {
        break;
      }
    }
  }
  
  // generate a random number between 1 and 6 and set on the dice
  rollDice(){
    let i = 0;
    
    // run the provided function 25 times depicting a rollowing dice
    const interval = setInterval(() => {
      
      // random number generator for numbers between 1 and 6
      let randomDraw = Math.round((Math.random()*5) + 1);
      this.showOnDice(randomDraw);
      
      // After 25, clear the interval so that the dice doesn't roll next time. 
      if(i > 25) {
        clearInterval(interval);
        this.rollResult.emit(randomDraw);
      } 
      
      i += 1;

    }, 100);
  }

}
