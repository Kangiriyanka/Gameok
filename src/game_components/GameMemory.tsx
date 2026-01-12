import '../assets/styles/game.css'
import '../assets/styles/memories.css'
import '../assets/styles/game-saves.css'

import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import SaveFileUploader from './SaveFileUploader'

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
  const [inputKey, setInputKey] = useState(0)


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
      setInputKey(prev => prev + 1)
      
      

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

  

  const handleFileChange = (file: File) => {
  setFile(file)
  setUploadSuccess(false)
  
}

  return (
    <div className="page-header">
      <div className="flex items-center gap-3">
        <h1 className="flex items-center">{title}</h1>

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

        <h1 className="flex items-center !text-[var(--n64-c-light-clr)]">Memories</h1>
        {memories ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {memories}
          </ReactMarkdown>
        ) : (
          <p className="text-xl">No memories added yet.</p>
        )}

  

         <h1 className="flex mt-20 !text-[var(--n64-c-light-clr)]">Saves</h1>

        <div className="upload-container mt-5 mb-5">
          

          

          <div className="saved-files-container">
            {saveFiles.length > 0 ? (
              // List style none doesn't work if you put a div inside
              <div>
              <ul className="save-files-list !list-none ">
              
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
                      onClick={async (e) => {
                        try {
                          e.preventDefault()

                        const confirmed = window.confirm(
                          'Are you sure you want to delete this save file?'
                        )
                         if (confirmed) {
                        
                        }
                          await deleteSaveFile(saveFile.id)
                          const saves = await fetchSaveFiles(id!)
                          setSaveFiles(saves)
                        } catch (error) {
                          console.error(error)
                        }
                      }}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
  <rect x="4" y="5" width="16" height="2" fill="currentColor" rx="1"/>
  <path d="M6 7 L7 21 C7 21.5 7.5 22 8 22 L16 22 C16.5 22 17 21.5 17 21 L18 7 Z" 
        fill="currentColor"/>
  <path d="M9 5 L9 3 C9 2.5 9.5 2 10 2 L14 2 C14.5 2 15 3 15 3 L15 5" 
        stroke="var(--n64-start-clr)" stroke-width="2" fill="none"/>
  <line x1="10" y1="9" x2="10" y2="19" stroke="var(--n64-start-clr)" stroke-width="1.5"/>
  <line x1="14" y1="9" x2="14" y2="19" stroke="var(--n64-start-clr)" stroke-width="1.5"/>
</svg>
                    </button>
                    </div>
                  </li>
                ))}
                
                
       
              </ul>

               

 
               <SaveFileUploader key = {inputKey} onFileChange={handleFileChange} onUpload={handleUpload} disabled={!file} />


              </div>
              
            ) : (
              <div>
              <p>No save files uploaded yet.</p>
               <SaveFileUploader onFileChange={handleFileChange} onUpload={handleUpload} disabled={!file} />
              </div>

              
            )}
          </div>
        </div>
      </article>
    </div>
  )
}

export default GameMemory