


  let turn = "Player1";
  let board = new Array(6);

    for (let i=0; i < 6; i++){              //create 2D array
    
        board[i] = [];
    
    }

    for (let i = 0; i < 6; i++) {           //Initialize it all to 0
    for (let j = 0; j < 7; j++) { 
  
        board[i][j] = 0; 
    } 
    } 

    
    console.log(board);

    function Win(checkval){

    DisplayUpdate();

    if(checkval == 1){
    
    setTimeout(alert,200,"Congrats! Player 1 has won the game!");   //setTimeout is required so that the DisplayUpdate() has enough
    console.log("Congrats! Player 1 has won the game!");            //time to fully execute before displaying the 'won' message.
                                                                    //without it, the 'won' message shows too quickly, and fails to
    } else {                                                        //display the winning move, which is confusing for the players.
    
    setTimeout(alert,200,"Congrats! Player 2 has won the game!");
    console.log("Congrats! Player 2 has won the game!");
    
    }

    
    }

    function Reset(){
    
    
    turn = "Player1";

    for (let i = 0; i < 6; i++) {           //Initialize it all to 0
    for (let j = 0; j < 7; j++) { 
  
        board[i][j] = 0; 
    } 
    } 

     document.getElementById("turn_sel").innerHTML = "Player 1's Turn!";
     document.getElementById("turn_sel").style.color = "red";

    console.log(board);

    DisplayUpdate();
    
    }

    function Runtime(input){

    let spot_c = input;
    let spot_r = 0;

    
     if(turn == "Player1"){

            if(board[0][spot_c] != 0){                                                           //check for spot available
            
                alert("Spot not available, choose another position!");
                console.log("Spot not available, choose another position!");
               
                return;

            }

            for(let i = 5; i > 0; i--){
            
                if(i == 0){
                
                    spot_r = 0;
                    break;
                
                } else {
                

                    if (board[i][spot_c] == 0){
                    
                    spot_r = i;
                    break;
                    
                    }
                  
                }
            
            }

            board[spot_r][spot_c] = 1;

     }
     if(turn == "Player2"){

            if(board[0][spot_c] != 0){                                                           //check for spot available
            
                alert("Spot not available, choose another position!");
                console.log("Spot not available, choose another position!");
                return;

            }

            for(let i = 5; i > 0; i--){
            
                if(i == 0){
                
                    spot_r = 0;
                    break;
                
                } else {
                

                    if (board[i][spot_c] == 0){
                    
                    spot_r = i;
                    break;
                    
                    }
         
                }
            
            }

            board[spot_r][spot_c] = 2;
     }
    
    
    DisplayUpdate();
    CheckWin(spot_r,spot_c);   
    

    if(turn == "Player1"){                                                                      //iterate turns
    
        turn = "Player2";
        document.getElementById("turn_sel").innerHTML = "Player 2's Turn!";
        document.getElementById("turn_sel").style.color = "orange";

    
    } else {
    
        turn = "Player1";
        document.getElementById("turn_sel").innerHTML = "Player 1's Turn!";
        document.getElementById("turn_sel").style.color = "red";
    
    }

      //recurse on update (waiting spot)
    
    }


    function CheckWin(spot_r,spot_c){

    let checkval = board[spot_r][spot_c];
    let winBalance = 0;

    //### Horizontal

        for (let i = 0; i < 7; i++){
        
            if( board[spot_r][i] == checkval){
            
                winBalance++;
            
            } else {
            
                winBalance = 0;
            
            }

            if (winBalance == 4){
            
                Win(checkval);
            
            }
        
        }

        
        winBalance = 0;

    //### Vertical

        for (let i = 0; i < 6; i++){
        
            if( board[i][spot_c] == checkval){
            
                winBalance++;
            
            } else {
            
                winBalance = 0;
            
            }

            if (winBalance == 4){
            
                Win(checkval);
            
            }
        
        }
        
        

        //### SouthEast Diag    --      NorthWest Diag
        
        winBalance = 0;
        let f_col = spot_c;
        let f_row = spot_r;

        if(f_col >= f_row){     //find topleft of diag
        
        f_col = f_col - f_row;
        f_row = 0;
        
        } else {
        
        f_row = f_row - f_col;
        f_col = 0;
        
        }

        
        while(f_col <= 6 && f_row <= 5){    //traverse and count down diag sequence
        
            if (board[f_row][f_col] == checkval){
            
            winBalance++;

            if (winBalance == 4){
            
                Win(checkval);
            
            }

            } else {
            
            winBalance = 0;
            
            }

            f_row++;
            f_col++;

        }

        
        //### NorthEast Diag    --      SouthWest Diag



        winBalance = 0;
        f_col = spot_c;
        f_row = spot_r;

        
        while(true){    //find topright of diag
        
            if(f_col == 6){
            
            break;

            }
            if(f_row == 0){
            
            break;
            
            }

            f_col++;
            f_row--;
        
        
        }
    
        
        while(f_col >= 0 && f_row <= 5){    //traverse and count down diag sequence
        
            if (board[f_row][f_col] == checkval){
            
            winBalance++;

            if (winBalance == 4){
            
                Win(checkval);
            
            }

            } else {
            
            winBalance = 0;
            
            }

            f_row++;
            f_col--;

        }
        

        //### Tie

        if(
            board[0][0] != 0 &&
            board[0][1] != 0 &&
            board[0][2] != 0 &&
            board[0][3] != 0 &&
            board[0][4] != 0 &&
            board[0][5] != 0 &&
            board[0][6] != 0     
        ) {
        
            console.log("Game Ends in a Tie!");
            setTimeout(alert,200,"Game Ends in a Tie!");
            
        }
    
    }


    function DisplayUpdate(){   //refeshes position of ALL peices (Not very efficent, but with a table this small it does not matter)
                                
    
        for (let i = 0; i < 6; i++) {           
        for (let j = 0; j < 7; j++) { 

  
        if (board[i][j] == 0){
        
            
            document.getElementById("thetable").rows[i+1].cells[j].firstElementChild.style.opacity = 0;
        
            } 
        else if (board[i][j] == 1){
        
            document.getElementById("thetable").rows[i+1].cells[j].firstElementChild.src = "redp.png";
            document.getElementById("thetable").rows[i+1].cells[j].firstElementChild.style.opacity = 100;
      
        
        } else {
        
            document.getElementById("thetable").rows[i+1].cells[j].firstElementChild.src = "orangep.png";
            document.getElementById("thetable").rows[i+1].cells[j].firstElementChild.style.opacity = 100;
        
        }
    } 
    } 
    }

    
    DisplayUpdate();
    
