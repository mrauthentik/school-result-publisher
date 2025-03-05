import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Student } from "./ResultPublisher"

interface ClassStatisticsProps {
  students: Student[]
  totalStudents: number
  classAverage: number
}

export function ClassStatistics({ students, totalStudents, classAverage }: ClassStatisticsProps) {
  // Calculate grade distribution
  const gradeDistribution = {
    "A+": 0,
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    F: 0,
  }

  students.forEach((student) => {
    if (student.average >= 90) gradeDistribution["A+"]++
    else if (student.average >= 80) gradeDistribution["A"]++
    else if (student.average >= 70) gradeDistribution["B"]++
    else if (student.average >= 60) gradeDistribution["C"]++
    else if (student.average >= 50) gradeDistribution["D"]++
    else gradeDistribution["F"]++
  })

  const chartData = Object.entries(gradeDistribution).map(([grade, count]) => ({
    grade,
    count,
    percentage: students.length ? Math.round((count / students.length) * 100) : 0,
  }))

  // Calculate highest and lowest scores
  const highestScore = students.length ? Math.max(...students.map((s) => s.average)) : 0
  const lowestScore = students.length ? Math.min(...students.map((s) => s.average)) : 0

  // Calculate pass rate
  const passCount = students.filter((s) => s.average >= 50).length
  const passRate = students.length ? Math.round((passCount / students.length) * 100) : 0

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Class Statistics</CardTitle>
          <CardDescription>Overall performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Class Size</p>
              <p className="text-2xl font-bold">{totalStudents || "Not set"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Students Added</p>
              <p className="text-2xl font-bold">{students.length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Class Average</p>
              <p className="text-2xl font-bold">{classAverage}%</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Pass Rate</p>
              <p className="text-2xl font-bold">{passRate}%</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Highest Score</p>
              <p className="text-2xl font-bold">{highestScore}%</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Lowest Score</p>
              <p className="text-2xl font-bold">{lowestScore}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Grade Distribution</CardTitle>
          <CardDescription>Breakdown of grades across the class</CardDescription>
        </CardHeader>
        <CardContent>
          {students.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="grade" />
                <YAxis />
                <Tooltip
                  formatter={(value,name, props) => [`${value} students (${props.payload.percentage}%)`, "Count"]}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[200px] text-muted-foreground">No data available</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

