function TicTacToe(placeholder, grid_size, callback) {

      this.placeholder = placeholder;

      this.paint(grid_size);

      this.callback = callback;
      


      // Save player scores

      this.scores = {

            X: 0,

            O: 0
      };


      this.marks = {

            X: "X",       // Player 1  mark

            O: "O",       // Player 2 mark
            
            count: 0      // Number of moves made by player
      };    


            return this;

      }


TicTacToe.prototype.paint = function(grid_size) {

      var self = this;



// Get number of columns, considering board as N x N board (3 x 3)

      self.grid_size = grid_size;

      var html = '<table id  = "tic-tac-toe" align = "center">';

      for(var i = 0;  i < grid_size; i++) {

            html += '<tr>';

            for(var j  = 0; j < grid_size; j++) {

                  html += '<td></td>';

            }     

            html += '</tr>';

      }


      html += '</table>';


      self.placeholder.innerHTML = html;


      // Find all columns from the board
      self.columns = self.placeholder.getElementsByTagName("td");


      for(i = 0; i < this.columns.length; i++) {

            self.columns[i].addEventListener("click", markHandler);


            }

            function markHandler(e) {

                  self.mark(e.target);

            }

      };
      

TicTacToe.prototype.mark = function(column) {

      if(column.innerHTML) {

            return;

      }


      // Count the move
      this.marks.count++;


      var currentMark = this.marks.count % 2 === 1 ? this.marks.X : this.marks.O;


      // Fill the column with mark
      column.innerHTML = currentMark;

      column.classList.add(currentMark);




      // Check if this player "X" or "O" won!
      if(this.didWin(currentMark)) {

            // Increment the player score
            if(this.marks.count % 2 === 1) {

                  this.scores.X++;

                        }

                  else {

                        this.scores.O++;

                        }

            
            
            // Send current mark and score

            this.callback(currentMark, this.scores);

            

                  } 

                  else if(this.marks.count === this.columns.length) { 

                        this.callback("draw");

                  }

      };


      
TicTacToe.prototype.didWin = function(mark) {

      // Take count of columns
      var grid_size = this.grid_size;


      var horizontal_count,

            vertical_count,

            right_to_left_count = 0,

            left_to_right_count = 0;



      // LOOP 1
      for(var i = 0; i < grid_size; i++) {

            horizontal_count = vertical_count = 0;


            for(var j = 0; j < grid_size; j++) {

                    // i * grid_size + j ===> "0,1,2", "3,4,5", "6,7,8"
                  if(this.columns[i * grid_size + j].innerHTML == mark) {

                        horizontal_count++;

            }

             // j * grid_size + i ===> "0,3,6", "1,4,7", "2,5,8"
            if(this.columns[j * grid_size + i].innerHTML == mark) {

                  vertical_count++;

            }      

      }     

            if(horizontal_count == grid_size || vertical_count == grid_size) {

                  return true;

                  }

                  // i * grid_size + i ===> "0,4,8"
            if(this.columns[i * grid_size + i].innerHTML == mark) {

                  right_to_left_count++;

                  }


                  // (grid_size - 1) * (i+1) ===> "2,4,6"
            if(this.columns[(grid_size - 1)  * (i + 1)].innerHTML == mark) { 

                  left_to_right_count++;

                  }


            } // end of loop 1


            if(right_to_left_count == grid_size || left_to_right_count == grid_size) {

                  return true;

                  }

                  return false;

      };



TicTacToe.prototype.empty = function() { 

      for(var i = 0; i < this.columns.length; i++) {


            this.columns[i].innerHTML = '';

            this.columns[i].classList.remove(this.marks.X);

            this.columns[i].classList.remove(this.marks.O);

                  }


            // Reset the count 
            this.marks.count = 0;
      };



TicTacToe.prototype.reset = function() { 

      this.empty();

      this.scores = {

            X: 0,

            O: 0

            };
      };



var placeholder = document.getElementById("placeholder");

var tictactoe = new TicTacToe(placeholder, 3, onResult);


function onResult(result, scores) {

      if(result == "draw") {

            alert("It is a draw !");

            } 

      else {
            
            alert(result + " has won");

            updateScores(scores.X, scores.O);      // invoke the function

            }

            tictactoe.empty();

      }


function updateScores(X, O) {

      document.querySelector("#scoreboard #player1").innerHTML = X;

      document.querySelector("#scoreboard #player2").innerHTML = O;      


      }     


function restart(grid_size) {

      tictactoe.reset();

      updateScores(0, 0);

      if(grid_size) {

            tictactoe.paint(grid_size);

            }

      }







































