import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function EditorForm() {

    const submit = (e) => {
        // e.preventDefalut();

        console.log('데이터 가져오기');
        console.log(CKEditor.editor.getData());
        
    }

 
    return (
        <div>
            <br/> <br/><br/><br/><br/><br/><br/>
            <CKEditor
                editor={ ClassicEditor }
                data="<p>질문 내용을 입력하세요.</p>"
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    
                    console.log( { event, editor, data } );
                } }
                onBlur={ ( event, editor ) => {
                    console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    console.log( 'Focus.', editor );
                } }
            >
                
            </CKEditor>
            <button onClick={submit}> submit </button>

        </div>
    );
    
}

export default EditorForm;
