import { useState, useEffect, useMemo } from 'react'
import SimpleMDE from 'react-simplemde-editor'
import 'simplemde/dist/simplemde.min.css'

const BlogEditor = ({ initialData = {}, onSubmit, submitLabel = 'Save' }) => {
  // Initialize state only once from props
  const [title, setTitle]         = useState(initialData.title || '')
  const [content, setContent]     = useState(initialData.content || '')
  const [isPublished, setIsPublished] = useState(initialData.isPublished || false)
  const [errors, setErrors]       = useState({})

  // Only sync when actual initial values change (not object identity)
  useEffect(() => {
    if (initialData.title !== undefined) {
      setTitle(initialData.title)
      setContent(initialData.content || '')
      setIsPublished(initialData.isPublished || false)
    }
  }, [initialData.title, initialData.content, initialData.isPublished])  // ← stable deps[1]

  // Memoize editor options to keep editor instance stable
  const editorOptions = useMemo(() => ({
    placeholder: 'Write in Markdown…',
    spellChecker: false
  }), [])

  const validate = () => {
    const newErrors = {}
    if (!title.trim())   newErrors.title   = 'Title is required'
    if (!content.trim()) newErrors.content = 'Content is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onSubmit({ title: title.trim(), content, isPublished })
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter blog title"
            autoComplete="off"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        {/* Markdown Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content (Markdown)
          </label>
          <SimpleMDE
            value={content}
            onChange={setContent}
            options={editorOptions}
          />
          {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
        </div>

        {/* Publish Checkbox */}
        <div className="flex items-center">
          <input
            id="isPublished"
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isPublished" className="ml-2 text-sm text-gray-700">
            Publish immediately
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  )
}

export default BlogEditor
