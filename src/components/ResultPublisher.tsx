import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter,CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { ScrollArea } from "./ui/scroll-area";
import { ClassStatistics } from "./ClassStatistics";
import { StudentResultsTable } from "./StudentResultTabel";
import { Label } from "./ui/label";
import {Input} from "./ui/input";
import { Button } from "./ui/button";
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

        if(name === "test1" || name === "test2" || name === "test3" ){
           const score = Math.min(Math.max(0, Number(value)), 10)
           setCurrentStudent({...currentStudent, [name]:score})
        }else{
            setCurrentStudent({...currentStudent, [name]: value})
        }
        //Logic to Validate Exam Score
        if(name === "exam"){
            const score = Math.min(Math.max(0, Number(value)), 70)
            setCurrentStudent({...currentStudent, [name]: score})
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
        const average = (currentStudent.test1 + currentStudent.test2 + currentStudent.test3 + currentStudent.exam) / totalStudents
        

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
         <Card className="md:col-span-12">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle> Student Results Management</CardTitle>
                        <CardDescription> Add student scores and view class statistics</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="totalStudents" className="text-sm font-medium">
                            Class Size:
                        </Label>
                        <Input
                            id="totalStudents"
                            type="number"
                            value={totalStudents}
                            onChange={(e) => setTotalStudents(Number.parseInt(e.target.value) || 0)}
                            className="w-20 h-8"
                            min={0}
                        />
                        <Label htmlFor="totalStudents" className="text-sm font-medium">
                           NO Subjects:
                        </Label>
                        <Input
                            id="totalStudents"
                            type="number"
                            value={totalStudents}
                            onChange={(e) => setTotalStudents(Number.parseInt(e.target.value) || 0)}
                            className="w-20 h-8"
                            min={0}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="input">Input Scores</TabsTrigger>
              <TabsTrigger value="results">View Results</TabsTrigger>
            </TabsList>
            <TabsContent value="input" className="p-4 pt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Student Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter student name"
                    value={currentStudent.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="regNumber">Registration Number</Label>
                  <Input
                    id="regNumber"
                    name="regNumber"
                    placeholder="Enter registration number"
                    value={currentStudent.regNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-4 mt-4">
                <div>
                  <Label htmlFor="test1">Test 1 (0-10)</Label>
                  <Input
                    id="test1"
                    name="test1"
                    type="number"
                    min={0}
                    max={10}
                    value={currentStudent.test1}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="test2">Test 2 (0-10)</Label>
                  <Input
                    id="test2"
                    name="test2"
                    type="number"
                    min={0}
                    max={10}
                    value={currentStudent.test2}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="test3">Test 3 (0-10)</Label>
                  <Input
                    id="test3"
                    name="test3"
                    type="number"
                    min={0}
                    max={10}
                    value={currentStudent.test3}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="exam">Exam (0-100)</Label>
                  <Input
                    id="exam"
                    name="exam"
                    type="number"
                    min={0}
                    max={100}
                    value={currentStudent.exam}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <Button className="mt-6 w-full" onClick={addStudent}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Student
              </Button>

              {students.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Added Students ({students.length})</h3>
                  <ScrollArea className="h-[200px] rounded-md border">
                    <div className="p-4">
                      {students.map((student) => (
                        <div key={student.id} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.regNumber}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="text-sm">
                              Avg: <span className="font-bold">{student.average}%</span>
                            </p>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeStudent(student.id)}
                              className="h-8 w-8 text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </TabsContent>

            <TabsContent value="results" className="p-4 pt-6">
              {students.length > 0 ? (
                <div className="space-y-6">
                  <ClassStatistics
                    students={students}
                    totalStudents={totalStudents}
                    classAverage={calculateClassAverage()}
                  />
                  <StudentResultsTable students={students} />
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No Students Added</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Add students in the Input Scores tab to view results
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4">
            <Button variant="outline" onClick={()=> setStudents([])}> Clear All</Button>
            <Button>
                <Save className="mr-2 h-4 w-4" />
            </Button>
        </CardFooter>
        </Card>
     </div>
    )









}