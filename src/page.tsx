import { ResultPublisher } from "./components/ResultPublisher"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 dark:text-blue-400 mb-2">
          College Result Publisher
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
          Track student performance and class statistics
        </p>
        <ResultPublisher />
      </div>
    </main>
  )
}

