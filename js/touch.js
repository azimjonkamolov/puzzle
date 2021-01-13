// touch events functions
function touchStart(event){
if(event.target.parentNode.classList.contains('col')){
return false;	
}
let touchobj = event.changedTouches[0] 
puzzle_startx = parseInt(touchobj.clientX);
puzzle_starty = parseInt(touchobj.clientY);
current_fill = event.target;
current_fill_id = current_fill.getAttribute('id');
current_fill.style.top =   puzzle_startx +   'px';
current_fill.style.left = puzzle_starty +  'px';
let coordinates = current_fill.getBoundingClientRect();
puzzle_coord_x = coordinates.top;
puzzle_coord_y = coordinates.left;
    for (let i=0; i<puzzle_empties.length; i++){
        let c = puzzle_empties[i].getBoundingClientRect();
        let block_coordinate_x = c.left;
        let block_coordinate_y = c.top;
        let coor_to_check = [block_coordinate_x, block_coordinate_y ];
        blocks_coordinates.push(coor_to_check);
        coor_to_check = [];
    }
  event.preventDefault();
} 
function touchMove(event){
if(event.target.parentNode.classList.contains('col')){
return false;	
}
    let width_chunk = current_fill.width/2;
    let height_chunk = current_fill.height/2;
    let touchobj = event.changedTouches[0];
    let dist_horizontal = parseInt(touchobj.clientX) - puzzle_startx ;
    let dist_vertical = parseInt(touchobj.clientY) - puzzle_starty; 
    current_fill.classList.add('dragged_image');
    if(window.innerHeight > window.innerWidth){      
      current_fill.style.left =   dist_horizontal + width_chunk*4 + 'px';
      current_fill.style.top = dist_vertical + height_chunk*4 +  'px';  
    }
    else{     	
      current_fill.style.left =   dist_horizontal + width_chunk*4 + 'px';
      current_fill.style.top = dist_vertical + height_chunk +  'px';        
  }
  event.preventDefault();
}
function touchEnd(event){
if(event.target.parentNode.classList.contains('col')){
return false;	
}
let coordinates = current_fill.getBoundingClientRect();
puzzle_coord_x = coordinates.top;
puzzle_coord_y = coordinates.left; 
    for (let i=0; i<blocks_coordinates.length; i++){ 
         let position_x = Math.abs(puzzle_coord_x - blocks_coordinates[i][1]);
         let position_y = Math.abs(puzzle_coord_y - blocks_coordinates[i][0]);
        if(position_x<50 && position_y<50){
            if(cells[i].classList){
                if(cells[i].classList.contains(current_fill_id)){     
                    current_fill.classList.remove('chunk_puzzle');
                    current_fill.classList.remove('dragged_image');
                    cells[i].appendChild(current_fill);  
                    --puzzle_chunks;
                    checkFinish();
                    current_fill.style.top = chunks_coordinate[i][0] + '%';
                    current_fill.style.left = chunks_coordinate[i][1] + '%'; 
              }
            }
            else{
                returnPuzzleImage();          
            } 
        }
        else{
            returnPuzzleImage();
        }
    } //for-end
    let touchobj = event.changedTouches[0];        
    event.preventDefault();
}