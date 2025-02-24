'use client'

import React, { useEffect, useRef, useState } from 'react';
import {Editor} from '@tinymce/tinymce-react';


interface TinyMCEEditorProps {
    onContentChange: (content: string) => void;
    initialValue?: string;
    height?: string;
    id?: string;
}

export const TinyMCEEditor: React.FC<TinyMCEEditorProps> = ({onContentChange, initialValue, height, id}) => {

    const editorHeight = height ? height : "calc(100vh - 200px)"
    const editorId = id ? id : "5712"
    const editorRef = useRef<any>(null);
    const editorContainerRef = useRef<HTMLDivElement>(null); // Для відстеження миші
    const [content, setContent] = useState(initialValue);

    const handleEditorChange = (newContent: string) => {
        setContent(newContent);
        // if(content) onContentChange(content);
    };

    const handleMouseLeave = () => {
        if (editorRef.current) {
            const updatedContent = editorRef.current.getContent();
            onContentChange(updatedContent);
        }
    };

    useEffect(() => {
        if (editorContainerRef.current) {
            editorContainerRef.current.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if (editorContainerRef.current) {
                editorContainerRef.current.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, []);

    return (
        <div ref={editorContainerRef}>
            <Editor apiKey="j8dxs8puyiugoamq11vn3bctaonh1jhzvd0cewcb1jiyl2c6"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue={initialValue}
                    // value={content}
                    id={editorId}
                    init={{
                        height: editorHeight,
                        width: "100%",
                        min_width: 800,
                        menubar: true,
                        // convert_urls: false,
                        license_key: 'gpl',
                        cleanup: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'help', 'wordcount'
                        ],
                        toolbar:
                            'undo redo | formatselect |' +
                            ' bold italic underline forecolor | link image media table mergetags |' +
                            ' addcomment showcomments | spellcheckdialog code typography |' +
                            ' align lineheight | checklist numlist bullist indent outdent |' +
                            ' emoticons charmap | removeformat'
                        ,
                        contextmenu: 'link image table',
                        // toolbar:
                        //     'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                        content_style: 'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }',
                        image_title: true,
                        file_picker_types: 'image',
                        images_file_types: 'jpg,jpeg,png,webp',
                        statusbar: true,
                        branding: false,
                        skin: 'oxide-dark',
                        images_upload_url: '/api/tinymce-img-upload',
                        automatic_uploads: true,
                        images_upload_base_path: "/api/i/1/image/",
                        // setup: function (editor) {
                        //     editor.on('change', function () {
                        //         handleEditorChange(editor.getContent());
                        //         // onContentChange(editor.getContent());
                        //         // handleContentChange(editor.getContent());
                        //     });
                        // },
                    }}
                    tinymceScriptSrc="/tinymce/tinymce.min.js"
            />
        </div>
    );
};

export default TinyMCEEditor;