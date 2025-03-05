import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter,CardHeader, CardTitle } from "./ui/card";
import { PlusCircle, Save, Trash2, Users } from "lucide-react";


export type Student = {
 id: string;
 name: string;
 regNumber: string;
 exam: number;
 average: number
 test1: number;
 test2: number;
 test3: number;
}

export function ResultPublisher(){
    const [students,setStudents] = useState<Student[]>([])
    const [totalStudents, setTotalStudents]= useState<number>(0)
    const [currentStudent, setCurrentStudent] = useState<Omit<Student, "id" | "average">>({
        name: "",
        regNumber: "",
        test1: 0,
        test2: 0,
        test3: 0,
        exam: 0
        
    })
    const [activeTab, setActiveTab] = useState("input")

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target

        if(name === "test1" || name === "test2" || name === "test3" || name === "exam"){
           const score = Math.min(Math.max(0, Number(value)), 70 | 10)
           setCurrentStudent({...currentStudent, [name]:score})
        }else{
            setCurrentStudent({...currentStudent, [name]: value})
        }
    }

    const addStudent = ()=>{
        if(!currentStudent.name || !currentStudent.regNumber) {
            alert('Please enter student name and registration number')
            return
        }

        //Logic to calculate Student Average
        const average = (currentStudent.test1 + currentStudent.test2 + currentStudent.test3 + currentStudent.exam) / 9
        

        //Code adds student to the list
        const newStudent: Student = {
            ...currentStudent,
            id: Date.now().toString(),
            average: Number.parseFloat(average.toFixed(3))
        }

        setStudents([...students, newStudent])

        //Code REST FORM    
        setCurrentStudent({
            name: '',
            regNumber: "",
            test1: 0,
            test2: 0,
            test3: 0,
            exam: 0,
        })
    }


    //Logic to remove student
    const removeStudent = (id:string) => {
        setStudents(students.filter((student) => student.id !== id))
    }


    //Logic to calculate Class average
    const calculateClassAverage = () =>{
        if(students.length === 0) return 0
        const sum = students.reduce((acc,student) => acc + student.average, 0)
        return Number.parseFloat((sum / students.length).toFixed(2))
    }

    return(
        <div className="grid gap-6 md:grid-cols-12">
          <div className="card md:col-span-12">
            <div className="card-header pb-3">
                <div className="card-content flex items-center justify-between">
                    <div>
                        <h2>Student Results Management</h2>
                        <h3>Add student scores and view class Statistics</h3>
                    </div>
                    <div className="flex items-center gap">
                        <label htmlFor="totalStudents" className="text-sm font-medium">
                            Class Size
                        </label>
                        <input 
                            type="number" 
                            id="totalStudents"
                            value={totalStudents}
                            onChange={(e) => setTotalStudents(Number.parseFloat(e.target.value) || 0)}
                            min={0}
                        />
                    </div>
                </div>
            </div>

            <section className="p-0">
                <div className="button-list w-full" value={activeTab}>

                </div>
            </section>

          </div>
        </div>
    )









}