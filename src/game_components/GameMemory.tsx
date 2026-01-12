import '../assets/styles/game.css'
import '../assets/styles/memories.css'
import '../assets/styles/game-saves.css'

import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import {
  fetchSaveFiles,
  uploadSaveFile,
  useAutoDismiss,
  deleteSaveFile,
} from '../lib/utils'

function GameMemory() {
  const [memories, setMemories] = useState('')
  const [saveFiles, setSaveFiles] = useState([])
  const { id, title } = useParams()
  const [file, setFile] = useState<File | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  // Auto-dismiss upload success message
  useAutoDismiss(uploadSuccess, setUploadSuccess)

  // Fetch save files on mount
  useEffect(() => {
    if (!id) return

    fetchSaveFiles(id).then((saves) => {
      setSaveFiles(saves)
    })
  }, [id])

  // Upload save file
  const handleUpload = async () => {
    if (!file || !id) return

    try {
      await uploadSaveFile(file, id)
      setUploadSuccess(true)
      setFile(null)

      const saves = await fetchSaveFiles(id)
      setSaveFiles(saves)
    } catch (error) {
      console.error(error)
    }
  }

  // Fetch memories
  useEffect(() => {
    if (!id) return

    async function fetchMemories() {
      try {
        const response = await fetch(
          `/api/collection/get_game_memories/${id}/`,
          {
            method: 'GET',
            credentials: 'include',
          }
        )

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        setMemories(result.msg)
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }

    fetchMemories()
  }, [id])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
      setUploadSuccess(false)
    }
  }

  return (
    <div className="page-header">
      <div className="flex items-center gap-3">
        <h1 className="flex items-center">Memories of {title}</h1>

        <motion.div
          whileHover={{
            scale: 1.1,
            x: 2,
          }}
        >
          <Link
            to={{
              pathname: `/dashboard/games/edit-memory/${id}/${title}/`,
            }}
            state={{ edit_memories: memories }}
          >
            <svg
              className="fill-[var(--accent-clr)]"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
            >
              <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
            </svg>
          </Link>
        </motion.div>
      </div>

      <article className="memory-article">
        {memories ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {memories}
          </ReactMarkdown>
        ) : (
          <p className="text-xl">No memories added yet.</p>
        )}

        <hr className="border-0 h-1 bg-yellow-400 my-4 shadow-[0_0_4px_#f3f34f]" />

        <h1 className="flex items-center">Upload save files</h1>

        <div className="upload-container mt-5 mb-5">
          <input
            type="file"
            id="save-file-input"
            className="file-input-hidden"
            onChange={handleFileChange}
          />

          <label htmlFor="save-file-input" className="file-button">
            Choose File
          </label>

          <button
            className="ml-5 button-10"
            onClick={handleUpload}
            disabled={!file}
          >
            Save
          </button>

          <div className="saved-files-container">
            {saveFiles.length > 0 ? (
              <ul className="save-files-list">
              

                {saveFiles.map((saveFile: any, index: number) => (
                  <li key={saveFile.id}>
                    <div className= "save-file-row">
                    <a
                      href={saveFile.filepath}
                      onClick={(e) => {
                        e.preventDefault()

                        const confirmed = window.confirm(
                          'Do you want to download this save file?'
                        )

                        if (confirmed) {
                          window.location.href = saveFile.filepath
                        }
                      }}
                    >
                      {title}-{index + 1}-{saveFile.filename.split('-')[5]}
                    </a>

                    <button
                      onClick={async () => {
                        try {
                          await deleteSaveFile(saveFile.id)
                          const saves = await fetchSaveFiles(id!)
                          setSaveFiles(saves)
                        } catch (error) {
                          console.error(error)
                        }
                      }}
                    >
                     ✘
                    </button>
                    </div>
                  </li>
                ))}
                
                <h2 className="text-[#f3f34f] text-lg font-bold uppercase mb-4 border-b-2 border-yellow-400 pb-1">
  Total saves: {saveFiles.length}
</h2>
              </ul>
            ) : (
              <p>No save files uploaded yet.</p>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}

export default GameMemory