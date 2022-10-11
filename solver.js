var ans=[]
var raw=[]



//generates random sudoku and stores in above declared ans variable 
function generate(){    
    let n=Math.floor(10+15*Math.random())
    let sudoku=[]
    for(let i=0;i<9;i++){
        let x=new Array()
        for (let j = 0; j < 9; j++) {
            x.push(Number(0))              
        }
        sudoku.push(x)
    }
    let row=Math.floor(8*Math.random())
    let col=Math.floor(8*Math.random())
    sudoku[row].splice(col,1,1+Math.floor(8*Math.random()))
    raw=new Array()
    for(let i=0;i<9;i++){
        let x=new Array()
        for(let j=0;j<9;j++){
            x.push(0)
        }
        raw.push(x)
    }

    if(solver(sudoku)){
        ans=sudoku
        for (let k = 0; k < n; k++) {
            let x=Math.floor(81*Math.random())
            document.getElementsByTagName("input")[x].value=sudoku[Math.floor(x/9)][x%9]
            raw[Math.floor(x/9)].splice(x%9,1,sudoku[Math.floor(x/9)][x%9])
        }
    }
}

//resets the sudoku to original raw one
function reset(){
    let k=0
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if(raw[i][j]!=0){
                document.getElementsByTagName("input")[k].value=raw[i][j]                
            }
            else{
                document.getElementsByTagName("input")[k].value=""         
            }
            k++
        }
    }
}

//refreshes the sudoku with a new one
function refresh(){
    for (let index = 0; index < 81; index++) {
        document.getElementsByTagName("input")[index].value=""
    }
    generate()
}
//checks if the provided answer if correct or not
function check(){
    let k=0
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if((document.getElementsByTagName("input")[k].value)!=ans[i][j]){
                alert("Your solution was not valid, Don't give up champ, Click ok to try a new sudoku challenge!!")
                refresh()
                return
            }
            k++
        }
    }
    alert("Congrats on Solving the sudoku, refresh and solve a new challenge")
}

// reveals answer on the screen by rendering the values of ans array
function show(){
    let k=0
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            document.getElementsByTagName("input")[k].value=sudoku[i][j]
            k++
        }
    }
}

//gets the values from html and renders sudoku solution after processing(by calling solver function)
function solve(){
    let temp=[]
    temp=document.getElementsByTagName("input")
    let sudoku=[]
    let k=0
    for(let i=0;i<9;i++){
        let x=[]
        for (let j = 0; j < 9; j++) {
            x.push(Number(temp[k].value))
            k++                        
        }
        sudoku.push(x)
    }
    raw=new Array()
    for (let i = 0; i < 9; i++) {
        let x=new Array()
        for (let j = 0; j < 9; j++) {
            x.push(sudoku[i][j])
        }
        raw.push(x)
    }
    if(solver(sudoku)){
        ans=sudoku
        let k=0
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                document.getElementsByTagName("input")[k].value=sudoku[i][j]
                k++
            }
        }
    }
    else{
        alert("No valid solution found for given values")
    }
}

//checks if a number k can be placed at given row and column position
function isValid(row,col,arr,k) {
    for(let i=0;i<9;i++){
        if(arr[i][col]==k || arr[row][i]==k){
            return false
        }
    }
    for(let i=3*Math.floor(row/3);i<3+3*Math.floor(row/3);i++){
        for(let j=3*Math.floor(col/3);j<3+3*Math.floor(col/3);j++){
            if(arr[i][j]==k){
                return false
            }
        }
    }
    return true
}

//solves any valid sudoku matrix
function solver(arr) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if(arr[row][col]!=0 && row==8 && col==8){
                return true
            }
            if(arr[row][col]!=0){
                continue
            }
            for(let k=0;k<10;k++){
                if(isValid(row,col,arr,k)){
                    arr[row].splice(col,1,k)
                    if(solver(arr)){
                        return true
                    }  
                    arr[row].splice(col,1,0)
                }
            }
            return false
        }
    }
    return false
}
