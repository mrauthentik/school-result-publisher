import { useState } from 'react'


const Section = () => {
    const [firstCa, setFirstCa] = useState<number>(0)
    const [secondCa, setSecondCa] = useState<number>(0)
    const [thirdCa, setThirdCa] = useState<number>(0)
    const [examscore, setExamScore] = useState<number>(0)
    const [noOfStudent,setnoOfStudent] = useState<number>(0)
   //  const [classAverage, setClassAverage ] = useState<number>(0)

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
      e.preventDefault()
      const newValue = 
     Number(e.target.value);
     if(newValue <=10){
        setSecondCa(newValue)
     }
       
    }
    const handlefirstCaInput = (e:React.ChangeEvent<HTMLInputElement>)=>{
       const newValue = 
       Number(e.target.value)
       if( newValue <=10){
         setFirstCa(newValue)
       }
      
      
    } 
    const thirdCaInput = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const newValue = 
        Number(e.target.value)
        if(newValue <=10){
            setThirdCa(newValue)
        }
    }
    const handleExamScoreOnChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
       const newValue =
       Number(e.target.value)
       if(newValue <= 70){
        setExamScore(newValue)
       }
    }
    const totalCa = firstCa + secondCa + thirdCa
    const totalScore = examscore + totalCa
    const classAverage = totalScore / noOfStudent
  return (
    <div>
        <form action="">
            <h2>General Class DATA</h2>
            <label htmlFor="">No of Students in Class</label>
            <input type="number"
                value={noOfStudent}
                onChange={(e)=>(setnoOfStudent(Number(e.target.value)))}
            />
            <p>Class Average : {classAverage}</p>
        </form>
       <h3>Input Scores</h3>
       <form >

        <label >First CA</label>
         <input type="number" 
            placeholder='1st CA'
            value={firstCa}
            onChange={handlefirstCaInput}
         /> <br />
         <label htmlFor="">Second CA</label>
         <input type="number"
          placeholder='2nd CA'
          value={secondCa}
          onChange={handleInputChange}
         />
         <br />
         <label htmlFor="">Third CA</label>
         <input type="number"
          placeholder='3rd CA'
          value={thirdCa}
          onChange={thirdCaInput}
         />
         <br />
         <label htmlFor="">Exam Score</label>
         <input type="number" 
            value={examscore}
            onChange={handleExamScoreOnChange}
         />
        <p>Total CA <button> {totalCa}</button></p> 
       <p>Student Total Score <button>{totalScore}</button></p>  
       </form>
    </div>
  )
}

export default Section
