import { MDXEditor, thematicBreakPlugin, toolbarPlugin,headingsPlugin,UndoRedo, BoldItalicUnderlineToggles, 
    ListsToggle,
    InsertTable, 
    tablePlugin,
    listsPlugin,
    markdownShortcutPlugin,
    InsertThematicBreak,
  



} from '@mdxeditor/editor'
import type { FormEvent 　} from 'react'
import React, { useEffect } from 'react'
import type {MDXEditorMethods} from '@mdxeditor/editor'


type EditorProps = {
    memories: string
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void
    handleChange: ((markdown: string) => void)
}

export default function Editor({memories, handleSubmit, handleChange} : EditorProps) {

        const ref = React.useRef<MDXEditorMethods>(null)

        useEffect(() => {
            ref.current?.setMarkdown(memories)
        
        
        }, []);


        return (
            <div>
        
          
            <MDXEditor
            ref = {ref}
            contentEditableClassName="prose"
            markdown={memories}
            onChange= {() => handleChange(ref.current?.getMarkdown() || "")}
            className="m-10 w-[80%]"

            plugins={[
                thematicBreakPlugin(),
                headingsPlugin(),
                tablePlugin(),
                listsPlugin(),
                markdownShortcutPlugin(),
                toolbarPlugin({
                toolbarClassName: 'toto',
                
                toolbarContents: () => (
                    <>
                    
                    <UndoRedo/>
                    <BoldItalicUnderlineToggles />
                    <InsertTable/>
                    <ListsToggle/>
                    <InsertThematicBreak/>
                
                    <button className="flex gap-1" id= "save-button" type="submit"  onClick ={() => handleSubmit}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/></svg>
                        Save
                    </button>
                
                    
                    
                    </>
                )
                })
            ]}
            />

        
           

            </div>
        )


     
}