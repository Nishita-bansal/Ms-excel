const $ = require("jquery");


$(document).ready(function(){
    
  let db;
  let lsc; //last call cell
  
  $(".cell").on("click" , function(){
      console.log(this);
      let rowId = Number($(this).attr("rowid")) + 1;
      let colId = Number($(this).attr("colid"));
      let address = String.fromCharCode(65+colId) + rowId;
      console.log(address);
      $("#address").val(address);//#addrees id uthai h dome m (element m se) (input m se)(addrees m se)
    })

    $(".cell").on("blur" , function(){
      lsc = this;
      let rowId = Number($(this).attr("rowid"));
      let colId = Number($(this).attr("colid"));
      let cellObject = db[rowId][colId];
      let value = $(this).html();
      // console.log(value);
      cellObject.value = value;
      console.log(db);
    })
    
    $("#formula").on("blur" , function(){
      let formula = $(this).val();
      let value = solvedFormula(formula);  


      let rowId = Number($(lsc).attr("rowid"));
      let colId = Number($(lsc).attr("colId"));
      let cellObject = db[rowId][colId];

      //if(cellObject.formula !=formula){
        //console.log("Inside solve");
        cellObject.value = value;
        cellObject.formula = formula;
        // let value = solveFormula(formula , cellObject);
       // cellObject.value = value+"";
        //ui update
        $(lsc).html(value);
      })

    function solvedFormula(formula){
      // formula = "(A1 + A2 )";
      let fcomponents = formula.split(" ");
      for(let i=0; i<fcomponents.length ; i++){
        let fcomp = fcomponents[i];
        if( fcomp[0] >= "A" && fcomp[0] <= "Z" ){
          let {rowId , colId} = getRowIdColIdFromAddress(fcomp);
          let cellObject = db[rowId][colId];
          let value = cellObject.value;
          formula = formula.replace(fcomp , value);

        }
      }
      // formula = (10 + 20);  yha hame formula mil chuka
      let value = eval(formula);
      return value;
    }

    function getRowIdColIdFromAddress(address){
    let colId = address.charCodeAt(0)-1;
    let rowId = Number(address.substring(1)-1);
    return { rowId : rowId , colId : colId }
  }

    function init(){
        db = [];
        visitedCells = [];
        for (let i = 0; i < 100; i++) {
          let row = [];
          for (let j = 0; j < 26; j++) {
            //i ==> j
            let name = String.fromCharCode(65 + j) + (i + 1);
            let cellObject = {
              name: name,
              value: "" ,
              formula:"" ,

              children:[]
            }
            row.push(cellObject);
          }
          db.push(row);
        }
        console.log(db);
          // db initialize
    }
    init();
})