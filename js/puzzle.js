 'use strict';
let puzzle_chunks = 12;
let puzzle_startx;
let puzzle_starty;
let puzzle_coord_x;
let puzzle_coord_y; 
let blocks_coordinates = [];
const notification = document.getElementById('notification');
let puzzle_empties = document.querySelectorAll('.col');
let puzzle_fills = document.querySelectorAll('.chunk_puzzle');
let current_fill;
let current_fill_id; 
const cells = document.getElementsByClassName('col');
const rows = document.getElementsByClassName('row');
const congrat_puzzle_button = document.getElementById('congrat_puzzle_button');
const images = document.getElementsByTagName('img');
let current_id;
let chunks_coordinate = [[0,0], [0,0], [0,0], [0,0], [-31.9, 0], [-32, 0], [0, -27], [-33.5, 0], [0, 0], [0, -24], [-34.8, 0], [0, -24]]
const full_container = document.getElementById('full_container');
const left_chunks = document.getElementById('left_chunks');
const right_chunks = document.getElementById('right_chunks');
// put image to back if incorrect action
function returnPuzzleImage(){
    current_fill.classList.remove('dragged_image');
    notification.innerText = '다시 시도해보세요!';
    setTimeout('cleanNotification()', 2000);
}
// clean notification
function cleanNotification(){
    notification.innerText = '';
}
// game over if correct image
function checkFinish(){
    if(puzzle_chunks == 0){
        notification.innerText = '완성하였습니다! 다음 단계로 넘어가세요';
        fadeIn(congrat_puzzle_button);  
        document.getElementById("slice_0_0").style.opacity = 0;
        document.getElementById("slice_0_1").style.opacity = 0;
        document.getElementById("slice_0_2").style.opacity = 0;
        document.getElementById("slice_0_3").style.opacity = 0;
        document.getElementById("slice_1_0").style.opacity = 0;
        document.getElementById("slice_1_1").style.opacity = 0;
        document.getElementById("slice_1_2").style.opacity = 0;
        document.getElementById("slice_1_3").style.opacity = 0;
        document.getElementById("slice_2_0").style.opacity = 0;
        document.getElementById("slice_2_1").style.opacity = 0;
        document.getElementById("slice_2_2").style.opacity = 0;
        document.getElementById("slice_2_3").style.opacity = 0;
        document.getElementById("outline").src = "../images/puz.jpg";
    }
    else{
        notification.innerText = '';
    }
}
// change game outline on different devices
function adjustGameLayout(){
    let width = document.getElementById('outline').width;
    let height = (655*width/1102)/3;
    for(let i=0; i<rows.length; i++){
        rows[i].style.height = height + 'px';
    }
}
// show congrats and so on
function fadeIn(el) {  
    var opacity = 0.01 ;
    el.style.opacity = 0;  
    el.style.display = 'block';  
    var timer = setInterval(function() {    
        if(opacity >= 1) {      
            clearInterval(timer);    
        }    
        el.style.opacity = opacity;     
        opacity += opacity * 0.1;   
    }, 10);  
}
// events
const dragstart = function(event) {
    current_fill = event.target;
    current_fill.classList.add('draggable_chunk'); 
    current_fill_id = event.target.id;        
    event.dataTransfer.setData('text', current_fill_id);
    notification.innerText = '';
};
const dragover = function(event) {
    event.preventDefault();
}
const drop = function(event) {
    event.preventDefault();
    let imageId = event.dataTransfer.getData('text');
    if(event.target.classList.contains(current_fill_id)){
        event.target.appendChild(document.getElementById(imageId));
        current_fill.classList.remove('draggable_chunk'); 
        --puzzle_chunks;
        checkFinish();
    }
    else{
        if(event.target.classList.contains('col')){
            notification.innerText = '다시 시도해보세요!';
        }
        current_fill.classList.remove('draggable_chunk'); 
        return false;
    }      
};
full_container.addEventListener('dragover',dragover);
full_container.addEventListener('drop',drop);
Array.from(images).forEach((element) => {
    element.addEventListener('dragstart',dragstart);
});
puzzle_fills.forEach(puzzle_fill => {
puzzle_fill.addEventListener('touchstart', touchStart);
puzzle_fill.addEventListener('touchmove',touchMove);
puzzle_fill.addEventListener('touchend', touchEnd);
});
window.onload = function() {      
    adjustGameLayout();
}
window.addEventListener('orientationchange', function() {
    adjustGameLayout();
}, false);

window.addEventListener('resize', function() {
    adjustGameLayout();
}, false);
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