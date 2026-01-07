
import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getPrioritiesAction, createPriorityAction, createPriorityActionReset, updatePriorityAction, updatePriorityActionReset, deletePriorityAction, deletePriorityActionReset } from '../../../Redux/ProtectedRoute/TaskPriority/action';

export default function TaskPriority() {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [deletingCategory, setDeletingCategory] = useState(null)
  const [categoryName, setCategoryName] = useState('')
  const [nameError, setNameError] = useState('')


  const getPrioritiesData = store?.getPrioritiesReducer?.data;
  const getPrioritiesLoading = store?.getPrioritiesReducer?.loading

  const updatePriorityReducer = store?.updatePriorityReducer
  const updatePriorityLoading = store?.updatePriorityReducer?.loading

   const createPriorityReducer = store?.createPriorityReducer
  const createPriorityLoading = store?.createPriorityReducer?.loading

  const deletePriorityReducer = store?.deletePriorityReducer
  const deletePriorityLoading = store?.deletePriorityReducer?.loading

  console.log('getPrioritiesData:', getPrioritiesData);
  console.log('getPrioritiesLoading:', getPrioritiesLoading);

  // Handle the new response format with status, message, response structure
  const getPriorities = getPrioritiesData?.response 
    ? (Array.isArray(getPrioritiesData.response) ? getPrioritiesData.response : [])
    : [];

  console.log('getPriorities:', getPriorities);

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
      dispatch(deletePriorityAction(deletingCategory._id))
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
      dispatch(updatePriorityAction({ id: editingCategory._id, name: categoryName }))
    } else {
      console.log('Creating priority:', categoryName, 'userId:', userId)
      dispatch(createPriorityAction({ name: categoryName, userId: userId }))
    }
  }

  const handleCloseModal = () => {
    setShowCategoryModal(false)
    setEditingCategory(null)
    setCategoryName('')
    setNameError('')
  }

  useEffect(()=>{  
    dispatch(getPrioritiesAction())
  },[])

useEffect(() => {
  if (createPriorityReducer) {
    if (createPriorityReducer?.data?.message) {
      toast.success(createPriorityReducer?.data?.message)
      dispatch(getPrioritiesAction())
      handleCloseModal()
      dispatch(createPriorityActionReset())
    } else if (createPriorityReducer?.error) {
      toast.error(createPriorityReducer?.error?.message || 'Failed to create priority')
    }
  }
}, [createPriorityReducer, dispatch])

useEffect(() => {
  if (updatePriorityReducer) {
    if (updatePriorityReducer?.data?.message) {
      toast.success(updatePriorityReducer?.data?.message)
      dispatch(getPrioritiesAction())
      handleCloseModal()
      dispatch(updatePriorityActionReset())
    } else if (updatePriorityReducer?.error) {
      toast.error(updatePriorityReducer?.error?.message || 'Failed to update priority')
    }
  }
}, [updatePriorityReducer, dispatch])

useEffect(() => {
  if (deletePriorityReducer) {
    if (deletePriorityReducer?.data?.message) {
      toast.success(deletePriorityReducer?.data?.message)
      dispatch(getPrioritiesAction())
      handleCloseDeleteModal()
      dispatch(deletePriorityActionReset())
    } else if (deletePriorityReducer?.error) {
      toast.error(deletePriorityReducer?.error?.message || 'Failed to delete priority')
    }
  }
}, [deletePriorityReducer, dispatch])
  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#333' }}>Task Priorities</h1>
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

          {getPrioritiesLoading ? (
            <p>Loading...</p>
          ) : getPriorities?.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '15px', textAlign: 'left', borderRight: '1px solid #ddd', fontWeight: '600', color: '#333' }}>SN</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderRight: '1px solid #ddd', fontWeight: '600', color: '#333' }}>Priority Name</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#333' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {getPriorities?.map((item, index) => (
                  <tr key={item._id} style={{ borderBottom: index < getPriorities.length - 1 ? '1px solid #ddd' : 'none' }}>
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
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <p style={{ fontSize: '18px', margin: 0 }}>No task priorities found. Add your first priority to get started!</p>
            </div>
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
              <button onClick={handleSubmit} disabled={createPriorityLoading || updatePriorityLoading} style={{
                backgroundColor: '#ff5722',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer',
                opacity: (createPriorityLoading || updatePriorityLoading) ? 0.7 : 1
              }}>
                {(createPriorityLoading || updatePriorityLoading) ? 'Saving...' : (editingCategory ? 'Update' : 'Add')}
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
              <button onClick={confirmDelete} disabled={deletePriorityLoading} style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer',
                opacity: deletePriorityLoading ? 0.7 : 1
              }}>
                {deletePriorityLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

   
    </div>
  )
}
          
         
         