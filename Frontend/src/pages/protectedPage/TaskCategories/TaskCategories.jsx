import React, { use, useEffect, useState } from 'react'
import './TaskCategories.css'
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction, createCategoryActionReset, deleteCategoryAction, deleteCategoryActionReset, getCategoriesAction, updateCategoryAction, updateCategoryActionReset } from '../../../Redux/ProtectedRoute/Category/action';
import { toast } from 'react-toastify';

export default function TaskCategories() {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [deletingCategory, setDeletingCategory] = useState(null)
  const [categoryName, setCategoryName] = useState('')
  const [nameError, setNameError] = useState('')

  const categoriesData = store?.getCategoriesReducer?.data;
  const categoryLoading = store?.getCategoriesReducer?.loading
  const updateCategoryReducer = store?.updateCategoryReducer
  const updateCategoryLoading = store?.updateCategoryReducer?.loading

   const createCategoryReducer = store?.createCategoryReducer
  const createCategoryLoading = store?.createCategoryReducer?.loading

  const deleteCategoryReducer = store?.deleteCategoryReducer
  const deleteCategoryLoading = store?.deleteCategoryReducer?.loading

  console.log('categoriesData:', categoriesData);
  console.log('categoryLoading:', categoryLoading);

  // Handle the new response format with status, message, response structure
  const categories = categoriesData?.response 
    ? (Array.isArray(categoriesData.response) ? categoriesData.response : [])
    : categoriesData && Array.isArray(categoriesData) ? categoriesData : [];

  console.log('categories:', categories);
  console.log('categories.length:', categories.length);

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
      dispatch(deleteCategoryAction({ id: deletingCategory._id }))
    }
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
    setDeletingCategory(null)
  }

  const handleSubmit = () => {
    if (!categoryName.trim()) {
      setNameError('Category name is required')
      return
    }
    setNameError('')
    
    // Get userId from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const userId = user.id
    
    if (editingCategory) {
      console.log('Updating category:', editingCategory._id, categoryName)
      dispatch(updateCategoryAction({ id: editingCategory._id, name: categoryName }))
    } else {
      console.log('Creating category:', categoryName, 'userId:', userId)
      dispatch(createCategoryAction({ name: categoryName, userId: userId }))
    }
  }

  const handleCloseModal = () => {
    setShowCategoryModal(false)
    setEditingCategory(null)
    setCategoryName('')
    setNameError('')
  }

  useEffect(()=>{  
    dispatch(getCategoriesAction())
  },[])

useEffect(() => {
  if (createCategoryReducer) {
    if (createCategoryReducer?.data?.message) {
      toast.success(createCategoryReducer?.data?.message)
      dispatch(getCategoriesAction())
      handleCloseModal()
      dispatch(createCategoryActionReset())
    } else if (createCategoryReducer?.error) {
      toast.error(createCategoryReducer?.error?.message || 'Failed to create category')
    }
  }
}, [createCategoryReducer, dispatch])

useEffect(() => {
  if (updateCategoryReducer) {
    if (updateCategoryReducer?.data?.message) {
      toast.success(updateCategoryReducer?.data?.message)
      dispatch(getCategoriesAction())
      handleCloseModal()
      dispatch(updateCategoryActionReset())
    } else if (updateCategoryReducer?.error) {
      toast.error(updateCategoryReducer?.error?.message || 'Failed to update category')
    }
  }
}, [updateCategoryReducer, dispatch])

useEffect(() => {
  if (deleteCategoryReducer) {
    if (deleteCategoryReducer?.data?.message) {
      toast.success(deleteCategoryReducer?.data?.message)
      dispatch(getCategoriesAction())
      handleCloseDeleteModal()
      dispatch(deleteCategoryActionReset())
    } else if (deleteCategoryReducer?.error) {
      toast.error(deleteCategoryReducer?.error?.message || 'Failed to delete category')
    }
  }
}, [deleteCategoryReducer, dispatch])
  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#333' }}>Task Categories</h1>
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
        }}>Add Category</button>

        {/* Categories Section */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0, color: '#333', borderBottom: '3px solid #ff5722', paddingBottom: '5px', display: 'inline-block' }}>Categories</h2>
          </div>

          {categoryLoading ? (
            <p>Loading...</p>
          ) : (!categoriesData || !categories || categories.length === 0) ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <p style={{ fontSize: '18px', margin: 0 }}>No categories found. Add your first category to get started!</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '15px', textAlign: 'left', borderRight: '1px solid #ddd', fontWeight: '600', color: '#333' }}>SN</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderRight: '1px solid #ddd', fontWeight: '600', color: '#333' }}>Category Name</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#333' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((item, index) => (
                  <tr key={item._id} style={{ borderBottom: index < categories.length - 1 ? '1px solid #ddd' : 'none' }}>
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
                {editingCategory ? 'Edit Category' : 'Add Category'}
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
                Category Name *
              </label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
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
              <button onClick={handleSubmit} disabled={createCategoryLoading || updateCategoryLoading} style={{
                backgroundColor: '#ff5722',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer',
                opacity: (createCategoryLoading || updateCategoryLoading) ? 0.7 : 1
              }}>
                {(createCategoryLoading || updateCategoryLoading) ? 'Saving...' : (editingCategory ? 'Update' : 'Add')}
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
              Delete Category
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
              <button onClick={confirmDelete} disabled={deleteCategoryLoading} style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer',
                opacity: deleteCategoryLoading ? 0.7 : 1
              }}>
                {deleteCategoryLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

   
    </div>
  )
}
          
         