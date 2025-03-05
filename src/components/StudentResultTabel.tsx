import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Student } from "./ResultPublisher"

interface StudentResultsTableProps {
  students: Student[]
}

export function StudentResultsTable({ students }: StudentResultsTableProps) {
  // Function to determine grade based on average
  const getGrade = (average: number) => {
    if (average >= 90) return { grade: "A+", color: "text-green-600" }
    if (average >= 80) return { grade: "A", color: "text-green-600" }
    if (average >= 70) return { grade: "B", color: "text-blue-600" }
    if (average >= 60) return { grade: "C", color: "text-yellow-600" }
    if (average >= 50) return { grade: "D", color: "text-orange-600" }
    return { grade: "F", color: "text-red-600" }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Student Name</TableHead>
            <TableHead>Reg. Number</TableHead>
            <TableHead className="text-center">Test 1</TableHead>
            <TableHead className="text-center">Test 2</TableHead>
            <TableHead className="text-center">Test 3</TableHead>
            <TableHead className="text-center">Exam</TableHead>
            <TableHead className="text-center">Average</TableHead>
            <TableHead className="text-center">Grade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => {
            const { grade, color } = getGrade(student.average)
            return (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.regNumber}</TableCell>
                <TableCell className="text-center">{student.test1}</TableCell>
                <TableCell className="text-center">{student.test2}</TableCell>
                <TableCell className="text-center">{student.test3}</TableCell>
                <TableCell className="text-center">{student.exam}</TableCell>
                <TableCell className="text-center font-bold">{student.average}%</TableCell>
                <TableCell className={`text-center font-bold ${color}`}>{grade}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

