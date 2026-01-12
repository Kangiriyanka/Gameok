import { useState } from 'react'

type SaveFileUploaderProps = {
  onFileChange: (file: File) => void
  onUpload: () => void
  disabled: boolean
}

function SaveFileUploader({
  onFileChange,
  onUpload,
  disabled,
}: SaveFileUploaderProps) {
  const [labelText, setLabelText] = useState('Choose a save file')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      setLabelText(file.name)
      onFileChange(file)
    }
  }

  return (
    <div className="flex flex-col items-center gap-5 mt-5">
      <label htmlFor="save-file-input" className="file-button">
        {labelText}
      </label>

      <input
        type="file"
        id="save-file-input"
        className="file-input-hidden"
        onChange={handleChange}
      />

      <button
        className="button-10"
        onClick={onUpload}
        disabled={disabled}
      >
        Save
      </button>
    </div>
  )
}

export default SaveFileUploader