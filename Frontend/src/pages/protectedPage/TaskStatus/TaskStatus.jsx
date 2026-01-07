
import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getStatusAction,createStatusAction,createStatusActionReset,updateStatusAction, updateStatusActionReset,deleteStatusAction, deleteStatusActionReset } from '../../../Redux/ProtectedRoute/TaskStatus/action';

export default function TaskStatus() {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [deletingCategory, setDeletingCategory] = useState(null)
  const [categoryName, setCategoryName] = useState('')
  const [nameError, setNameError] = useState('')


  const getStatusData = store?.getStatusReducer?.data;
  const getStatusLoading = store?.getStatusReducer?.loading

  console.log('getStatusData:', getStatusData);
  console.log('getStatusLoading:', getStatusLoading);

  const updateStatusReducer = store?.updateStatusReducer
  const updateStatusLoading = store?.updateStatusReducer?.loading

   const createStatusReducer = store?.createStatusReducer
  const createPriorityLoading = store?.createStatusReducer?.loading

  const deleteStatusReducer = store?.deleteStatusReducer
  const deleteStatusLoading = store?.deleteStatusReducer?.loading

  console.log(createStatusReducer,"createStatusReducer")

  // Handle the new response format with status, message, response structure
  const getStatus = getStatusData?.response 
    ? (Array.isArray(getStatusData.response) ? getStatusData.response : [])
    : getStatusData && Array.isArray(getStatusData) ? getStatusData : [];

  console.log('getStatus:', getStatus);
  console.log('getStatus.length:', getStatus.length);

  const handleEdit = (category) => {
    setEditingCategory(category)
    setCategoryName(category.name)
    setShowCategoryModal(true)
  }

  const handleDelete = (category) => {
    setDeletingCategory(category)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (deletingCategory) {
      dispatch(deleteStatusAction(deletingCategory._id))
    }
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
    setDeletingCategory(null)
  }

  const handleSubmit = () => {
    if (!categoryName.trim()) {
      setNameError('Priority name is required')
      return
    }
    setNameError('')
    
    // Get userId from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const userId = user.id
    
    if (editingCategory) {
      console.log('Updating priority:', editingCategory._id, categoryName)
      dispatch(updateStatusAction({ id: editingCategory._id, name: categoryName }))
    } else {
      console.log('Creating priority:', categoryName, 'userId:', userId)
      dispatch(createStatusAction({ name: categoryName, userId: userId }))
    }
  }

  const handleCloseModal = () => {
    setShowCategoryModal(false)
    setEditingCategory(null)
    setCategoryName('')
    setNameError('')
  }

  useEffect(()=>{  
    dispatch(getStatusAction())
  },[])

useEffect(() => {
  if (createStatusReducer) {
    if (createStatusReducer?.data?.message) {
      toast.success(createStatusReducer?.data?.message)
      dispatch(getStatusAction())
      handleCloseModal()
      dispatch(createStatusActionReset())
    } else if (createStatusReducer?.error) {
      toast.error(createStatusReducer?.error?.message || 'Failed to create priority')
    }
  }
}, [createStatusReducer, dispatch])

useEffect(() => {
  if (updateStatusReducer) {
    if (updateStatusReducer?.data?.message) {
      toast.success(updateStatusReducer?.data?.message)
      dispatch(getStatusAction())
      handleCloseModal()
      dispatch(updateStatusActionReset())
    } else if (updateStatusReducer?.error) {
      toast.error(updateStatusReducer?.error?.message || 'Failed to update priority')
    }
  }
}, [updateStatusReducer, dispatch])

useEffect(() => {
  if (deleteStatusReducer) {
    if (deleteStatusReducer?.data?.message) {
      toast.success(deleteStatusReducer?.data?.message)
      dispatch(getStatusAction())
      handleCloseDeleteModal()
      dispatch(deleteStatusActionReset())
    } else if (deleteStatusReducer?.error) {
      toast.error(deleteStatusReducer?.error?.message || 'Failed to delete priority')
    }
  }
}, [deleteStatusReducer, dispatch])
  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#333' }}>Task Status</h1>
          <button style={{ 
            backgroundColor: 'transparent', 
            border: 'none', 
            fontSize: '16px', 
            color: '#666',
            textDecoration: 'underline',
            cursor: 'pointer'
          }}>Go Back</button>
        </div>

        {/* Add Category Button */}
        <button onClick={() => setShowCategoryModal(true)} style={{
          backgroundColor: '#ff5722',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer',
          marginBottom: '40px'
        }}>Add Priority</button>

        {/* Categories Section */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0, color: '#333', borderBottom: '3px solid #ff5722', paddingBottom: '5px', display: 'inline-block' }}>Priorities</h2>
          </div>

          {getStatusLoading ? (
            <p>Loading...</p>
          ) : (!getStatusData || !getStatus || getStatus.length === 0) ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <p style={{ fontSize: '18px', margin: 0 }}>No task statuses found. Add your first status to get started!</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '15px', textAlign: 'left', borderRight: '1px solid #ddd', fontWeight: '600', color: '#333' }}>SN</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderRight: '1px solid #ddd', fontWeight: '600', color: '#333' }}>Priority Name</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#333' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {getStatus?.map((item, index) => (
                  <tr key={item._id} style={{ borderBottom: index < getStatus.length - 1 ? '1px solid #ddd' : 'none' }}>
                    <td style={{ padding: '15px', borderRight: '1px solid #ddd', color: '#333' }}>{index + 1}</td>
                    <td style={{ padding: '15px', borderRight: '1px solid #ddd', color: '#333' }}>{item.name}</td>
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

      {/* Add/Edit Category Modal */}
      {showCategoryModal && (
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
            width: '500px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#333' }}>
                {editingCategory ? 'Edit Priority' : 'Add Priority'}
              </h2>
              <button onClick={handleCloseModal} style={{
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '24px',
                color: '#666',
                cursor: 'pointer'
              }}>×</button>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '16px', fontWeight: '500', color: '#333' }}>
                Priority Name *
              </label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter priority name"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: nameError ? '2px solid #dc3545' : '2px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }}
              />
              {nameError && (
                <p style={{ color: '#dc3545', fontSize: '14px', margin: '5px 0 0 0' }}>{nameError}</p>
              )}
            </div>

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
              <button onClick={handleCloseModal} style={{
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer'
              }}>Cancel</button>
              <button onClick={handleSubmit} disabled={createPriorityLoading || updateStatusLoading} style={{
                backgroundColor: '#ff5722',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer',
                opacity: (createPriorityLoading || updateStatusLoading) ? 0.7 : 1
              }}>
                {(createPriorityLoading || updateStatusLoading) ? 'Saving...' : (editingCategory ? 'Update' : 'Add')}
              </button>
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
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 20px 0', color: '#333' }}>
              Delete Priority
            </h2>
            <p style={{ fontSize: '16px', color: '#666', margin: '0 0 30px 0' }}>
              Do you want to delete "{deletingCategory?.name}"? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
              <button onClick={handleCloseDeleteModal} style={{
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer'
              }}>Cancel</button>
              <button onClick={confirmDelete} disabled={deleteStatusLoading} style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer',
                opacity: deleteStatusLoading ? 0.7 : 1
              }}>
                {deleteStatusLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

   
    </div>
  )
}
          
         
         