    class Calculator{

      currentOperand='';// for holding temporary current operand data to be updated in innertext
      primarypreviousOperand='';// for holding temporary first part previous operand data (5 + 2 i.e 5 is the first part) to be updated in innertext
      operationOperand='';// for holding temporary operation operand data 
      secondarypreviousoperand='';// for holding temporary second part previous operand data (5 + 2 i.e 2 is the second part) to be updated in innertext
      currentOperandInnerTextObject=''; // for holding reference of current operand from html
      previousOperandInnerTextObject=''; // for holding reference of previous operand from html

      //this keyword can be used in class without intializing eg this.currentOperandInnerTextObject can be used without initializing
        constructor(currentOperandInnerText,previousOperandInnerText){// passes reference for current and previous operand
            this.currentOperandInnerTextObject=currentOperandInnerText;
            this.previousOperandInnerTextObject=previousOperandInnerText;
            this.clear();

        }

        clear(){//clear all major temporary data
            this.currentOperand='';
            this.primarypreviousOperand='';
            this.operationOperand='';
            this.secondarypreviousoperand='';

        }

        appendNumber(number){ // append number in current operand
            if(number==='.'&&this.currentOperand.includes('.')) return ; // so '.' is not typed twice
            this.currentOperand = this.currentOperand.toString()+ number.toString();
           
        }

        

        operation(operationsymbol){ // operation related set up
            this.secondarypreviousoperand='';
            if(this.currentOperand=='')return;//when current operation is empty
            if(this.operationOperand!==null&&this.operationOperand!==''){// when operator symbol already used (advanced stage)
               
                this.calculate();
                this.primarypreviousOperand=this.currentOperand;                
                this.currentOperand='';
                this.secondarypreviousoperand='';
                this.operationOperand=operationsymbol;
                this.updateView();
            }
            else{// when operator symbol is not used (initial stage)
            this.primarypreviousOperand=this.currentOperand;
            this.currentOperand='';
            this.operationOperand=operationsymbol;
            this.updateView();
            }
           
        }

        calculate(){ // calculate based on operand
            let symbol= this.operationOperand;
            let  result;
            this.secondarypreviousoperand='';
            
         switch (symbol) {
             case '+': result = parseFloat(this.primarypreviousOperand)+parseFloat(this.currentOperand);
                       this.secondarypreviousoperand=this.currentOperand;
                       this.currentOperand= result.toString(); 
                       break;
             case '*': result = parseFloat(this.primarypreviousOperand)*parseFloat(this.currentOperand);
                       this.secondarypreviousoperand=this.currentOperand;
                      this.currentOperand= result.toString(); 
                       break;
             case '/': result = parseFloat(this.primarypreviousOperand)/parseFloat(this.currentOperand);
                       this.secondarypreviousoperand=this.currentOperand;
                       this.currentOperand= result.toString(); 
                       break;
            case '-': result = parseFloat(this.primarypreviousOperand)-parseFloat(this.currentOperand);
                      this.secondarypreviousoperand=this.currentOperand;
                      this.currentOperand= result.toString(); 
                      break;    
            default:
                 return;
         }   
        }

        delete(){
            if(this.currentOperand!=='')//so there is something to delete
            this.currentOperand= this.currentOperand.toString().slice(0,-1);
            else
            return;
           
        }

        updateView() // update inner text of current and previous operand
        {
            this.currentOperandInnerTextObject.innerText= this.currentOperand;

            if(this.operationOperand!==null&&this.operationOperand!=='')// to display current,previous operand and operator symbol in previous operand section during advanced stages
            this.previousOperandInnerTextObject.innerText=this.primarypreviousOperand+' '+this.operationOperand+' '+this.secondarypreviousoperand;
            else// to display current,previous operand and operator symbol in previous operand section during intial stages
            this.previousOperandInnerTextObject.innerText=this.primarypreviousOperand;
            

        }

    }


    const numberButtons= document.querySelectorAll("[data-number]");//getting button elements reference as list of elements
    const operationButtons= document.querySelectorAll("[data-operation]");
    const equalButton = document.querySelector("[data-equal"); //getting single equal element refernce
    const allClearButton = document.querySelector("[data-all-clear]");
    const deleteButton = document.querySelector("[data-delete]");
    const currentOperandInnerText= document.querySelector("[data-current-operand]");
    const previousOperandInnerText= document.querySelector("[data-previous-operand]");



    const calculator = new Calculator(currentOperandInnerText,previousOperandInnerText);// passing current and previous operand reference to constructor

    //number buttons
    numberButtons.forEach(button=>{
        button.addEventListener("click",()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateView();

        });
    });

    //opertion button
    operationButtons.forEach(button=>{

        button.addEventListener("click",()=>{
          calculator.operation(button.innerText);  
    
        });

    });

    //equal button

    equalButton.addEventListener("click",()=>{

        calculator.calculate();
        calculator.updateView();
        calculator.operationOperand='';
        calculator.primarypreviousOperand='';
        

    })

    //all clear button

    allClearButton.addEventListener("click",()=>{
        calculator.clear();
        calculator.updateView();
    });

    //delete button

    deleteButton.addEventListener("click",()=>{
        calculator.delete();
        calculator.updateView();
    });