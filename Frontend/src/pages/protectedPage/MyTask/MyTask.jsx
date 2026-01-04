import React, { useState } from 'react'

export default function MyTask() {
  const tasks = [
    {
      id: 1,
      title: 'Submit Documents',
      priority: 'Extreme',
      status: 'Not Started',
      objective: 'To submit required documents for something important',
      description: 'Review the list of documents required for submission and ensure all necessary documents are ready.',
      deadline: 'End of Day',
      additionalNotes: []
    },
    {
      id: 2,
      title: 'Complete assignments',
      priority: 'Moderate',
      status: 'In Progress',
      objective: 'Complete all pending assignments',
      description: 'The assignments must be completed to pass final year.',
      deadline: 'End of Month',
      additionalNotes: []
    },
    {
      id: 3,
      title: 'Review Code',
      priority: 'High',
      status: 'Not Started',
      objective: 'Review parallel processing implementation',
      description: 'Review and optimize parallel processing code for better performance.',
      deadline: 'Tomorrow',
      additionalNotes: []
    },
    {
      id: 4,
      title: 'Database Migration',
      priority: 'Critical',
      status: 'In Progress',
      objective: 'Migrate database to new server',
      description: 'Perform parallel database migration with zero downtime.',
      deadline: 'This Week',
      additionalNotes: []
    }
  ]

  const [selectedTask, setSelectedTask] = useState(tasks[0])

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">My Tasks</h2>
        
        <div className="space-y-3">
          {tasks.map((task) => (
            <div 
              key={task.id}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedTask?.id === task.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedTask(task)}
            >
              <div className="flex items-start gap-3">
                <div className={`w-3 h-3 rounded-full mt-1 ${
                  task.status === 'Not Started' ? 'bg-red-400' : 'bg-blue-400'
                }`}></div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{task.title}</h3>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {task.description.substring(0, 60)}...
                  </p>
                  
                  <div className="flex justify-between items-center mt-2 text-xs">
                    <span className={`px-2 py-1 rounded ${
                      task.priority === 'Extreme' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      Priority: {task.priority}
                    </span>
                    <span className={`px-2 py-1 rounded ${
                      task.status === 'Not Started' ? 'bg-gray-100 text-gray-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      Status: {task.status}
                    </span>
                  </div>
                </div>
                
                <div className="w-12 h-8 bg-gray-200 rounded flex-shrink-0"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 p-6">
        {selectedTask ? (
          <div className="bg-white rounded-lg border border-gray-200 p-6 h-full">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-12 bg-gray-200 rounded flex-shrink-0"></div>
              <div>
                <h1 className="text-xl font-semibold">{selectedTask.title}</h1>
                <div className="flex gap-4 mt-2 text-sm">
                  <span className={`px-2 py-1 rounded ${
                    selectedTask.priority === 'Extreme' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    Priority: {selectedTask.priority}
                  </span>
                  <span className={`px-2 py-1 rounded ${
                    selectedTask.status === 'Not Started' ? 'bg-gray-100 text-gray-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    Status: {selectedTask.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Task Title:</h3>
                <p className="text-gray-700">{selectedTask.title}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-1">Objective:</h3>
                <p className="text-gray-700">{selectedTask.objective}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-1">Task Description:</h3>
                <p className="text-gray-700 leading-relaxed">{selectedTask.description}</p>
              </div>

              {selectedTask.additionalNotes.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Additional Notes:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {selectedTask.additionalNotes.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h3 className="font-medium text-gray-900 mb-1">Deadline for Submission:</h3>
                <p className="text-gray-700">{selectedTask.deadline}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-8">
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                ✕
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                ✓
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a task to view details
          </div>
        )}
      </div>
    </div>
  )
}
