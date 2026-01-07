import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getTasksAction, createTaskAction, createTaskActionReset, updateTaskAction, updateTaskActionReset, deleteTaskAction, deleteTaskActionReset } from '../../../Redux/ProtectedRoute/Task/action';
import { getCategoriesAction } from '../../../Redux/ProtectedRoute/Category/action';
import { getPrioritiesAction } from '../../../Redux/ProtectedRoute/TaskPriority/action';
import { getStatusAction } from '../../../Redux/ProtectedRoute/TaskStatus/action';

export default function MyTask() {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [deletingTask, setDeletingTask] = useState(null)
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    categoryId: '',
    priorityId: '',
    statusId: ''
  })
  const [errors, setErrors] = useState({})

  const tasksData = store?.getTasksReducer?.data;
  const tasksLoading = store?.getTasksReducer?.loading
  const categoriesData = store?.getCategoriesReducer?.data;
  const prioritiesData = store?.getPrioritiesReducer?.data;
  const statusData = store?.getStatusReducer?.data;
  
  const updateTaskReducer = store?.updateTaskReducer
  const createTaskReducer = store?.createTaskReducer
  const deleteTaskReducer = store?.deleteTaskReducer

  console.log('tasksData:', tasksData);
  console.log('tasksLoading:', tasksLoading);

  // Handle the new response format
  const tasks = tasksData?.response 
    ? (Array.isArray(tasksData.response) ? tasksData.response : [])
    : tasksData && Array.isArray(tasksData) ? tasksData : [];

  const categories = categoriesData?.response 
    ? (Array.isArray(categoriesData.response) ? categoriesData.response : [])
    : categoriesData && Array.isArray(categoriesData) ? categoriesData : [];

  const priorities = prioritiesData?.response 
    ? (Array.isArray(prioritiesData.response) ? prioritiesData.response : [])
    : prioritiesData && Array.isArray(prioritiesData) ? prioritiesData : [];

  const statuses = statusData?.response 
    ? (Array.isArray(statusData.response) ? statusData.response : [])
    : statusData && Array.isArray(statusData) ? statusData : [];

  console.log('tasks:', tasks);
  console.log('tasks.length:', tasks.length);

  const handleEdit = (task) => {
    setEditingTask(task)
    setTaskData({
      title: task.title,
      description: task.description,
      categoryId: task.categoryId?._id || task.categoryId || '',
      priorityId: task.priorityId?._id || task.priorityId || '',
      statusId: task.statusId?._id || task.statusId || ''
    })
    setShowTaskModal(true)
  }

  const handleDelete = (task) => {
    setDeletingTask(task)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (deletingTask) {
      dispatch(deleteTaskAction(deletingTask._id))
    }
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
    setDeletingTask(null)
  }

  const handleSubmit = () => {
    let newErrors = {}
    
    if (!taskData.title.trim()) newErrors.title = 'Title is required'
    if (!taskData.description.trim()) newErrors.description = 'Description is required'
    if (!taskData.categoryId) newErrors.categoryId = 'Category is required'
    if (!taskData.priorityId) newErrors.priorityId = 'Priority is required'
    if (!taskData.statusId) newErrors.statusId = 'Status is required'
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setErrors({})
    
    if (editingTask) {
      dispatch(updateTaskAction({ id: editingTask._id, ...taskData }))
    } else {
      dispatch(createTaskAction(taskData))
    }
  }

  const handleCloseModal = () => {
    setShowTaskModal(false)
    setEditingTask(null)
    setTaskData({
      title: '',
      description: '',
      categoryId: '',
      priorityId: '',
      statusId: ''
    })
    setErrors({})
  }

  useEffect(() => {
    dispatch(getTasksAction())
    dispatch(getCategoriesAction())
    dispatch(getPrioritiesAction())
    dispatch(getStatusAction())
  }, [])

  useEffect(() => {
    if (createTaskReducer) {
      if (createTaskReducer?.data?.message) {
        toast.success(createTaskReducer?.data?.message)
        dispatch(getTasksAction())
        handleCloseModal()
        dispatch(createTaskActionReset())
      } else if (createTaskReducer?.error) {
        toast.error(createTaskReducer?.error?.message || 'Failed to create task')
      }
    }
  }, [createTaskReducer, dispatch])

  useEffect(() => {
    if (updateTaskReducer) {
      if (updateTaskReducer?.data?.message) {
        toast.success(updateTaskReducer?.data?.message)
        dispatch(getTasksAction())
        handleCloseModal()
        dispatch(updateTaskActionReset())
      } else if (updateTaskReducer?.error) {
        toast.error(updateTaskReducer?.error?.message || 'Failed to update task')
      }
    }
  }, [updateTaskReducer, dispatch])

  useEffect(() => {
    if (deleteTaskReducer) {
      if (deleteTaskReducer?.data?.message) {
        toast.success(deleteTaskReducer?.data?.message)
        dispatch(getTasksAction())
        handleCloseDeleteModal()
        dispatch(deleteTaskActionReset())
      } else if (deleteTaskReducer?.error) {
        toast.error(deleteTaskReducer?.error?.message || 'Failed to delete task')
      }
    }
  }, [deleteTaskReducer, dispatch])

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#333' }}>My Tasks</h1>
          <button style={{ 
            backgroundColor: 'transparent', 
            border: 'none', 
            fontSize: '16px', 
            color: '#666',
            textDecoration: 'underline',
            cursor: 'pointer'
          }}>Go Back</button>
        </div>

        {/* Add Task Button */}
        <button onClick={() => setShowTaskModal(true)} style={{
          backgroundColor: '#ff5722',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer',
          marginBottom: '40px'
        }}>Add Task</button>

        {/* Tasks Section */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0, color: '#333', borderBottom: '3px solid #ff5722', paddingBottom: '5px', display: 'inline-block' }}>Tasks</h2>
          </div>

          {tasksLoading ? (
            <p>Loading...</p>
          ) : (!tasksData || !tasks || tasks.length === 0) ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <p style={{ fontSize: '18px', margin: 0 }}>No tasks found. Add your first task to get started!</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '15px', textAlign: 'left', borderRight: '1px solid #ddd', fontWeight: '600', color: '#333' }}>SN</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderRight: '1px solid #ddd', fontWeight: '600', color: '#333' }}>Title</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderRight: '1px solid #ddd', fontWeight: '600', color: '#333' }}>Description</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderRight: '1px solid #ddd', fontWeight: '600', color: '#333' }}>Category</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderRight: '1px solid #ddd', fontWeight: '600', color: '#333' }}>Priority</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderRight: '1px solid #ddd', fontWeight: '600', color: '#333' }}>Status</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#333' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks?.map((item, index) => (
                  <tr key={item._id} style={{ borderBottom: index < tasks.length - 1 ? '1px solid #ddd' : 'none' }}>
                    <td style={{ padding: '15px', borderRight: '1px solid #ddd', color: '#333' }}>{index + 1}</td>
                    <td style={{ padding: '15px', borderRight: '1px solid #ddd', color: '#333' }}>{item.title}</td>
                    <td style={{ padding: '15px', borderRight: '1px solid #ddd', color: '#333' }}>{item.description?.substring(0, 50)}...</td>
                    <td style={{ padding: '15px', borderRight: '1px solid #ddd', color: '#333' }}>{item.categoryId?.name || 'N/A'}</td>
                    <td style={{ padding: '15px', borderRight: '1px solid #ddd', color: '#333' }}>{item.priorityId?.name || 'N/A'}</td>
                    <td style={{ padding: '15px', borderRight: '1px solid #ddd', color: '#333' }}>{item.statusId?.name || 'N/A'}</td>
                    <td style={{ padding: '15px' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => handleEdit(item)} style={{
                          backgroundColor: '#ff5722',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '4px',
                          fontSize: '14px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}>✏️ Edit</button>
                        <button onClick={() => handleDelete(item)} style={{
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '4px',
                          fontSize: '14px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}>🗑️ Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add/Edit Task Modal */}
      {showTaskModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            width: '600px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', margin: 0, color: '#333' }}>
                {editingTask ? 'Edit Task' : 'Add New Task'}
              </h2>
              <button onClick={handleCloseModal} style={{
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666'
              }}>×</button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>Title</label>
              <input
                type="text"
                value={taskData.title}
                onChange={(e) => {
                  setTaskData({ ...taskData, title: e.target.value })
                  if (errors.title) setErrors({ ...errors, title: '' })
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: errors.title ? '2px solid #dc3545' : '2px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none'
                }}
                placeholder="Enter task title"
              />
              {errors.title && <small style={{ color: '#dc3545' }}>{errors.title}</small>}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>Description</label>
              <textarea
                value={taskData.description}
                onChange={(e) => {
                  setTaskData({ ...taskData, description: e.target.value })
                  if (errors.description) setErrors({ ...errors, description: '' })
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: errors.description ? '2px solid #dc3545' : '2px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  minHeight: '100px',
                  resize: 'vertical'
                }}
                placeholder="Enter task description"
              />
              {errors.description && <small style={{ color: '#dc3545' }}>{errors.description}</small>}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>Category</label>
              <select
                value={taskData.categoryId}
                onChange={(e) => {
                  setTaskData({ ...taskData, categoryId: e.target.value })
                  if (errors.categoryId) setErrors({ ...errors, categoryId: '' })
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: errors.categoryId ? '2px solid #dc3545' : '2px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none'
                }}
              >
                <option value="">Select Category</option>
                {categories?.map((category) => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>
              {errors.categoryId && <small style={{ color: '#dc3545' }}>{errors.categoryId}</small>}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>Priority</label>
              <select
                value={taskData.priorityId}
                onChange={(e) => {
                  setTaskData({ ...taskData, priorityId: e.target.value })
                  if (errors.priorityId) setErrors({ ...errors, priorityId: '' })
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: errors.priorityId ? '2px solid #dc3545' : '2px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none'
                }}
              >
                <option value="">Select Priority</option>
                {priorities?.map((priority) => (
                  <option key={priority._id} value={priority._id}>{priority.name}</option>
                ))}
              </select>
              {errors.priorityId && <small style={{ color: '#dc3545' }}>{errors.priorityId}</small>}
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>Status</label>
              <select
                value={taskData.statusId}
                onChange={(e) => {
                  setTaskData({ ...taskData, statusId: e.target.value })
                  if (errors.statusId) setErrors({ ...errors, statusId: '' })
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: errors.statusId ? '2px solid #dc3545' : '2px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none'
                }}
              >
                <option value="">Select Status</option>
                {statuses?.map((status) => (
                  <option key={status._id} value={status._id}>{status.name}</option>
                ))}
              </select>
              {errors.statusId && <small style={{ color: '#dc3545' }}>{errors.statusId}</small>}
            </div>

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
              <button onClick={handleCloseModal} style={{
                padding: '12px 24px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                backgroundColor: 'white',
                color: '#666',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer'
              }}>Cancel</button>
              <button onClick={handleSubmit} style={{
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#ff5722',
                color: 'white',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer'
              }}>{editingTask ? 'Update Task' : 'Create Task'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            width: '400px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 20px 0', color: '#333' }}>Delete Task</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>Are you sure you want to delete "{deletingTask?.title}"? This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
              <button onClick={handleCloseDeleteModal} style={{
                padding: '10px 20px',
                border: '2px solid #ddd',
                borderRadius: '6px',
                backgroundColor: 'white',
                color: '#666',
                fontSize: '14px',
                cursor: 'pointer'
              }}>Cancel</button>
              <button onClick={confirmDelete} style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: '#dc3545',
                color: 'white',
                fontSize: '14px',
                cursor: 'pointer'
              }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
