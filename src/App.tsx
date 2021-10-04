import React,{FC, useEffect, useState} from 'react';
import { getNextPosition, installSteps, objTekPosition, randomInteger, size_matrix, startPosition } from './Api'

import "./App.css"

interface TabloGameProps{
  count:number;
  start:number;
  end:number;
  userEnd:number;
  getUserEnd:(serPosition:number)=>void
}
 
const TabloGame:FC<TabloGameProps>=(props:TabloGameProps)=>{
const [kletki,setKletki] = useState( [...Array(props.count).map((el)=>({start:false,end:false}))])

 

return (<div className="tablo" >
              <div className="tablo__game" >
                {
                  kletki.map((el,index)=><div className="tablo__kletka" key={index} onClick={()=>{props.getUserEnd(index+1)}}>
                    <LogoTable position={index+1} start={props.start} end={props.end} userEnd={props.userEnd}/>
                  </div>)
                }
              </div>
          </div>)
}

interface getLogoElProps{
  position:number;
  start:number;
  userEnd:number;
  end:number;
}


const LogoTable:FC<getLogoElProps> = ({ position,start, end , userEnd }) => {
return<>
      {start===position && <div className="tablo__logo tablo__logo-start"></div>}
      { !!userEnd && end!==userEnd && end===position && <div className="tablo__logo tablo__logo-end">*</div>}
      { !!userEnd && end!==userEnd && userEnd===position && <div className="tablo__logo tablo__logo-false-end">&#128078;</div>}
      { !!userEnd && end===userEnd && end===position && <div className="tablo__logo tablo__logo-viktory">&#128077;</div>}
    </>
}





interface Step{
  znak:string
}






const  App:FC =()=>{
  const [steps,setSteps] = useState<Step[]>(installSteps(10))
  const [status,setStatus] = useState<boolean>(false)

  const [start,setStart] = useState<number>(0)
  const [end,setEnd] = useState<number>(0)
  const [userEnd,setUserEnd] = useState<number>(0)

  useEffect(()=>{
    console.log(userEnd)
  },[userEnd])

  useEffect(()=>{
      startPosition.col = randomInteger(1,3);
      startPosition.row = randomInteger(1,3);
      //setTimeout(()=>{setStart(randomInteger(1,9))},2000)       //1

      console.log(startPosition.row,startPosition.col)    

      setTimeout(()=>{setStart( startPosition.col + size_matrix*( startPosition.row - 1 ) )},2000)       //1
  },[])

  useEffect(()=>{   
      if (start!==0){
        console.log("start",start)                           //2 
        setTimeout(()=>{setStatus(true)},2000)
      }
    }
   ,[start])

  useEffect(() => {                                             //3  
    if (status && steps.every(step=>step.znak==="")){
      setSteps(installSteps(10))
    }
  }, [status])

  useEffect(()=>{                                               //4
    if (status && steps.every(step=>step.znak==="")){

      let tekPosition:objTekPosition = startPosition 
      

        for(let i=0;i<steps.length;i++){
          setTimeout(()=>{
            tekPosition =  getNextPosition(tekPosition)
            console.log('tekPosition',tekPosition)
            if (i===steps.length-1){
              console.log("end",(tekPosition.row-1)*size_matrix+tekPosition.col)
              setEnd((tekPosition.row-1)*size_matrix+tekPosition.col)
            }

            steps[i].znak = String(tekPosition.val)
            
            setSteps([...steps])
          },(i+1)*1000) 
        }
        
    }
    else if (status && steps.every(step=>step.znak!=="")){
      setTimeout(()=>{ setStatus(false)},1000) 
    }

  },[steps])

  const getUserEnd = (userPosition:number)=>{
    setUserEnd(userPosition)
  }

  //const setStart = ()=>{const randmTabloPos = randomInteger(1,10)}
      

    

  return (
    <div className="main-conteiner" >
      <TabloGame count={size_matrix*size_matrix} start={start} end={end} getUserEnd={getUserEnd} userEnd={userEnd}/>
       <div className="steps">
          { 
            steps.map((step,index)=>(
              < Step_  znak={step.znak} id={index} />
            ))
          }
       </div>
      

    </div>
  );
}

//const onClickHandler = ()=>{setStatus(true)}
/*
<div className="btns">
        <button disabled={status} className="btns-start" onClick={onClickHandler}>
          Запустить
        </button>
      </div>
*/ 
 

interface propsStep{
  znak:string;
  id:number;
}

function Step({znak,id}:propsStep) {
  
  const arr:string[] = ['steps__strelka-left','steps__strelka-right','steps__strelka-up','steps__strelka-bottom']

  const znak_:number = Number(znak)-1

  
  return( 
    <div className="steps__step" style={{backgroundColor:znak?"green":""}} key={id}>
        
        {znak && <div className={`steps__logo ${arr[znak_]}`} ></div>}        
    </div>  
  )
}
const Step_ = React.memo(Step)

export default App;
