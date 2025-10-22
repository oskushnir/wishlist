import { Button } from "@/components/Button"

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center space-y-6 p-8">
        <div className="text-8xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
          404
        </div>
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Button linkTo="/" title="Go Back" className="text-white bg-indigo-600 hover:bg-indigo-700 font-medium" />
      </div>
    </div>
  )
}