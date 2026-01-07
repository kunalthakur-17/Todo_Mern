import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDashboardAction } from '../../../Redux/ProtectedRoute/Dashboard/action'

export default function Dashboard() {
  const dispatch = useDispatch()
  const { loading, data } = useSelector(state => state.getDashboardReducer)

  useEffect(() => {
    dispatch(getDashboardAction())
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3 text-blue-600">Recent Tasks</h3>
          {data?.recentTasks?.map(task => (
            <div key={task._id} className="mb-2 p-2 border-l-4 border-blue-200">
              <div className="text-sm font-medium">{task.title}</div>
              <div className="text-xs text-gray-500">{task.categoryId?.name} • {task.statusId?.name}</div>
            </div>
          ))}
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3 text-green-600">Categories</h3>
          {data?.recentCategories?.map(cat => (
            <div key={cat._id} className="text-sm mb-1 p-1 bg-green-50 rounded">{cat.name}</div>
          ))}
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3 text-orange-600">Priorities</h3>
          {data?.recentPriorities?.map(priority => (
            <div key={priority._id} className="text-sm mb-1 p-1 bg-orange-50 rounded">{priority.name}</div>
          ))}
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3 text-purple-600">Statuses</h3>
          {data?.recentStatuses?.map(status => (
            <div key={status._id} className="text-sm mb-1 p-1 bg-purple-50 rounded">{status.name}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
