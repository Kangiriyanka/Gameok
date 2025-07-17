import { MDXEditor, toolbarPlugin, UndoRedo, BoldItalicUnderlineToggles, listsPlugin} from '@mdxeditor/editor'
import type { JSX } from 'react/jsx-runtime'


export default function Editor() {


        return (
            <MDXEditor
            markdown="Hello world"
            className="m-10 w-[80%]"
            plugins={[
                toolbarPlugin({
                toolbarClassName: 'Hi',
                toolbarContents: () => (
                    <>
                    <UndoRedo/>
                    <BoldItalicUnderlineToggles />
                    </>
                )
                })
            ]}
            />
        )


     
}