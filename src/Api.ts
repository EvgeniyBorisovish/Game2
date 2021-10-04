export function installSteps(count:number){
    return JSON.parse(JSON.stringify( Array(count).fill({znak:""})))
  }

  export function randomInteger(min:number, max:number) {
  
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  
  }


export let startPosition:objTekPosition = {row:0,col:0,val:0};

export const size_matrix = 3

export interface objTekPosition{
  row:number;
  col:number;
  val:number;
}
  export function getNextPosition(tekPosition:objTekPosition){
    tekPosition = JSON.parse( JSON.stringify(tekPosition) )
    let pos = null
    while (true){
  
       pos =  randomInteger(1,4)
       
      if (pos===1){
        if (tekPosition.col-1===0){ continue }
          tekPosition.col=tekPosition.col-1
          break
      }  
      else  if (pos===2){
        if (tekPosition.col+1>size_matrix){ continue }
          tekPosition.col+=1
          break
      }
      else  if (pos===3){
        if (tekPosition.row-1===0){ continue }  
        tekPosition.row-=1 
        break
       }
       else  if (pos===4){
        if (tekPosition.row+1>size_matrix){ continue }  
        tekPosition.row+=1 
        break
       }
    
  }
  tekPosition.val = pos
  
  return JSON.parse(JSON.stringify(tekPosition) )
  
  }