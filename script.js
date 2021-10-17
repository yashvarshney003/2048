console.log("script js impoted");
var score = 0 ;
var max_div = 0;
var last_state =  new Array(4); 
var stack = [];
var grid =  document.querySelectorAll('.cell');// imported all div cell having class name cell.It is array of div
// this object maintain value to color
var game_status1 = document.getElementById("game_status");
var color_map = {
	0:"rgb(205,193,180)",
	2:"#EEE4DA",
	4: "#EEE1C9",
	8: "#F3B27A",
	16: "#F69664",
	32: "#F77C5F",
	64: "#F75F3B",
	128: "#EDD073",
	256: "#5c094f",
	512: "#ff3747e",
	1024: "#1652b5",
	2048: "#c652b5"
	}
var  box = new Array(4); // 
var empty =  [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]; // Using this array we successfully insert 2 radomly available spaces
const num_of_cell = 15 ;// total number of cell in a game
let current_cell = 0 ; // temporary variable


// Added event listener to the main document(window)
document.addEventListener('keydown', logKey);

// Call  the move function accordingly to the key pressed.
function logKey(e) {
	switch(e.keyCode){
		case 39:  right();
				break; 
		case 37: left();
			break;
		case 38: up();
			break;
		case 40 : down();
			break;
		default:
			//.log("wrong key pressed");
	}
}

// storing div reference in the box variable
for(let i  = 0 ;i<=3;i++) 
 {
	 	box[i] = [];
		 last_state[i] = [];
	 	for(let j = 0 ; j<=3;j++)
	   		{
			grid[current_cell].innerText = 0;
			box[i].push(grid[current_cell]);
			change_state(i,j);
			current_cell += 1;
	   		}
		}
// generate first 2
 place_2();
 console.log(empty);
//  //.log(empty);


// function to generate 2 at r&&om avilable space
function place_2()
 {
	let final_range  = empty.length;  // find the length of epmty array
	let x1 ; // row 
	let y1 ; // col
	let place = Math.floor(Math.random() * final_range );// random index
	x1 = parseInt(empty[place]/4); // will give row at which we will insert 2
	y1 = empty[place] % 4; ; // will give col
	
	box[x1][y1].innerText = 2 ;
	//console.log("tash");
	change_state(x1, y1); // placing 2
	//empty.splice(empty.indexOf(empty[place]),1);
	//console.log(empty); // replacing the index which get filled
	
}
function right() 
 {
	// console.log("right called");
	if(game_status())
	{
	save_last_status();
	let changed = false;
	 for(let i = 0;i<4;i++)
	  {
	
		   let range = 3 ;
	
		  for(let j = 2;j>=0;j--)
		   {
			 
			   
			   let current_column =  j;
			   let change =  false;
			   if(parseInt(box[i][j].innerText)!=0)
			   {
			   while(current_column < range)
			   {
				   
				   if (  parseInt(box[i][current_column + 1].innerText) != 0 && (parseInt(box[i][current_column + 1].innerText) == parseInt(box[i][current_column].innerText)))
				      {
					  
					   changed =  true;
					   
					   box[i][current_column + 1].innerText = 2 * parseInt(box[i][current_column + 1].innerText) ;
					   update_score(2 * parseInt(box[i][current_column].innerText));
					   box[i][current_column].innerText =  0;

					   change_state(i,current_column);
					   change_state(i,current_column+1);

					   range-=1; 
					   break ;
					  }
				   if (parseInt(box[i][current_column + 1].innerText)=== 0)
				    {
					   changed = true;
					   box[i][current_column + 1].innerText = parseInt(box[i][current_column].innerText);
					   box[i][current_column].innerText = 0 ;
					   change_state(i, current_column);
					   change_state(i, current_column + 1);
					}
					  current_column+=1;
			   }
			}
			}
		   }
		
		update_empty(box);
	if (changed )
	 {
		 	place_2();
	 }
	}
	  
	 
	
}


 function left () 
 {
	 //console.log("left");
	if(game_status())
	{
	 save_last_status();
	 let changed = false;
	 for (let i = 0; i < 4; i++) {
		 //	let i = 0; 
		 let range = 0;
		 
		 //console.log("right called1");
		 for (let j = 1; j <4; j++) {
			 //console.log("right called2");

			 let current_column = j;
			 let change = false;
			 if (parseInt(box[i][j].innerText) != 0) {
				 while (current_column > range) {

					 if (parseInt(box[i][current_column - 1].innerText) != 0 && (parseInt(box[i][current_column - 1].innerText) == parseInt(box[i][current_column].innerText))) {
						 //console.log("right called4");
						 changed = true;
						 box[i][current_column - 1].innerText = 2 * parseInt(box[i][current_column-1].innerText);
						 update_score(2 * parseInt(box[i][current_column].innerText));
						 box[i][current_column].innerText = 0;
						 change_state(i, current_column);
						 change_state(i, current_column -1);

						 range += 1;
						 break;
					 }
					 if (parseInt(box[i][current_column - 1].innerText) === 0) {
						 changed = true;
						 box[i][current_column - 1].innerText = parseInt(box[i][current_column].innerText);
						 box[i][current_column].innerText = 0;
						 change_state(i, current_column);
						 change_state(i, current_column - 1);
					 }
					 current_column -= 1;
				 }
			 }
		 }
	 }

	 update_empty(box);
	 if (changed) {
		 place_2();
	 }
	}

 }
 function up ()
 { 	

	 //console.log("yashup");
if(game_status()){
	 save_last_status();
	 let changed = false;
	 for (let j = 0; j < 4; j++) {
		 //	let i = 0; 
		 let range = 0;
		 //console.log("right called1");
		 for (let i = 1; i < 4; i++) {
			 //console.log("right called2");

			 let current_row = i;
			 let change = false;
			 if (parseInt(box[i][j].innerText) != 0) {
				 while (current_row > range) {

					 if (parseInt(box[current_row-1][j].innerText) != 0 && (parseInt(box[current_row-1][j].innerText) == parseInt(box[current_row][j].innerText))) {
						 //console.log("right called4");
						 changed = true;
						 box[current_row-1][j].innerText = 2 * parseInt(box[current_row-1][j].innerText);
						 update_score(2 * parseInt(box[current_row][j].innerText));
						 box[current_row][j].innerText = 0;
						 change_state(current_row,j);
						 change_state(current_row-1,j);

						 range += 1;
						 break;
					 }
					 if (parseInt(box[current_row - 1][j].innerText) === 0) {
						 changed = true;
						 box[current_row-1][j].innerText = parseInt(box[current_row ][j].innerText);
						 box[current_row][j].innerText = 0;
						 change_state(current_row,j);
						 change_state(current_row - 1, j);
					 }
					 current_row-= 1;
				 }
			 }
		 }
	 }

	 update_empty(box);
	 if (changed) {
		 place_2();
	 }
	}
 }
 function down() 
 {
	 //console.log("yashup");

//
if(game_status())
{
save_last_status();
	 let changed = false;
	 for (let j = 0; j <4; j++) {
		 //	let i = 0; 
		 let range = 3;
		 //console.log("right called1");
		 for (let i = 2; i >=0 ; i--) {
			 //console.log("right called2");

			 let current_row = i;
			 let change = false;
			 if (parseInt(box[i][j].innerText) != 0) {
				 while (current_row < range) {

					 if (parseInt(box[current_row +1][j].innerText) != 0 && (parseInt(box[current_row +1][j].innerText) == parseInt(box[current_row][j].innerText))) {
						 //console.log("right called4");
						 changed = true;
						 box[current_row +1][j].innerText = 2 * parseInt(box[current_row ][j].innerText);
						 update_score(2*parseInt(box[current_row][j].innerText));
						 box[current_row][j].innerText = 0;
						 change_state(current_row, j);
						 change_state(current_row + 1, j);

						 range -= 1;
						 break;
					 }
					 if (parseInt(box[current_row+ 1][j].innerText) === 0) {
						 changed = true;
						 box[current_row + 1][j].innerText = parseInt(box[current_row][j].innerText);
						 box[current_row][j].innerText = 0;
						 change_state(current_row, j);
						 change_state(current_row + 1, j);
					 }
					 current_row += 1;
				 }
			 }
		 }
	 }

	 update_empty(box);
	 if (changed) {
		 
		 place_2();
	 }
	}
	//console.log("yashdown");
 }


function update_empty(arr)
 {
	// console.log(empty);
	 for(let j = 0 ;j<4;j++){	
	 for (let i = 0; i < 4; i++) {
		//.log(j*4+i);
		if (parseInt(arr[j][i].innerText) != 0) {
			if (empty.includes((j * 4) + i)) {
				empty.splice(empty.indexOf((j * 4) + i), 1);
			}

		}
		else {
			if (!empty.includes((j * 4) + i)) {
				empty.push((j * 4) + i);
			}

		}
	}

 }
}
// this function change background color of div
function change_state(i,j)

{ 
	//console.log("yash");
	const event1 = new Event("change");
	box[i][j].addEventListener('change', (e) => {
		
	
		box[i][j].style.backgroundColor  = color_map[parseInt(box[i][j].innerText)];
		
	});
	box[i][j].dispatchEvent(event1);
	
// box[i][j].style.backgroundColor = color_map[parseInt(box[i][j].innerText)];
	
}
function update_score(num)
{
	score =  score + num;
	let scoretext  = document.getElementById("score");
	//console.log(score.innerText + "\+" + num);
	
scoretext.innerText = score;

	//console.log(score.innerText);
}



function game_status()
 {

//console.log("here")

for(let i = 0; i<4; i++)
 {
for(let j = 0 ;j<4;j++)
{
	if (parseInt(box[i][j].innerText)==2048)
	{
	game_status1.style.display ="block";
	game_status1.innerText ="You Win";
	return true;
	}
else 
 {
	
				  if(parseInt(box[i][j].innerText)==0) 
				   { //console.log("so");
					   return true;
				   }
				   if(i-1>0)
				    {
					   if (parseInt(box[i][j].innerText) == parseInt(box[i-1][j].innerText)) 
					   {
						   //console.log("so");
						   return true;
					   }

					}
					if(j-1>0)
					{
						if (parseInt(box[i][j-1].innerText) == parseInt(box[i][j].innerText)) {
							//console.log("so");
								return true;
						}

					}
					if(i+1<4)
					 {
						if (parseInt(box[i+1][j].innerText) == parseInt(box[i][j].innerText)) {
							///console.log("so");
							return true;
						}

					 }
					 if(j+1<4)
					 {
						 if (parseInt(box[i][j+1].innerText) == parseInt(box[i][j].innerText)) {
							 //console.log("so");
							  return true;
						 }

					 }
				  
		
 
 }
}
}
game_status1.style.display = "block";
game_status1.innerText = "You Loose";
console.log("you fail");
 return false;
}




function save_last_status() 
{ 	
	if(stack.length>10)
	 {
		let garbage =  stack.shift();
	 }
	 let ele = {"configuration":last_state,
	"score":score};
	stack.push(ele);
	last_state = new Array(4);
	for(let i = 0;i<4;i++) 
	{
		last_state[i] = [];
	   for(let  j = 0;j<4;j++) 
	    {
			last_state[i].push(parseInt(box[i][j].innerText));
		}
	}
}



function undo()
{
	
	game_status1.style.display = "none";
	if(stack.length>0){
	for (let i = 0; i < 4; i++) {
		
		for (let j = 0; j < 4; j++) {
			box[i][j].innerText =  last_state[i][j];
			change_state(i,j);
			
		}
	}
		let popped_element = stack.pop();
	last_state =  popped_element.configuration;
	let change = popped_element.score;
		update_score(-1*(score-change));

}
}

