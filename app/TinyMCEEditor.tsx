'use client'

import React, {useRef, useState} from 'react';
import {Editor} from '@tinymce/tinymce-react';


export const TinyMCEEditor: React.FC<{ onContentChange: (content: string) => void }> = ({onContentChange}) => {
    const editorRef = useRef<any>(null);
    const [content, setContent] = useState<string>("");

    const handleContentChange = (content: string) => {
        setContent(content);
        onContentChange(content);
    };

    return (
        <>
            <Editor apiKey="j8dxs8puyiugoamq11vn3bctaonh1jhzvd0cewcb1jiyl2c6"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue="<p>This is the initial content of the editor.</p>"
                    id="5712"
                    init={{
                        height: 500 ,
                        width: 1000,
                        menubar: true,
                        convert_urls : false,
                        license_key: 'gpl',
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
                        automatic_uploads: true,
                        file_picker_types: 'image',
                        statusbar: true,
                        branding: false,
                        // file_picker_callback: function (callback, value, meta) {
                        //     var input = document.createElement('input');
                        //     input.setAttribute('type', 'file');
                        //     input.setAttribute('accept', 'image/*');
                        //     input.onchange = function () {
                        //         var file = this.files[0];
                        //         var formData = new FormData();
                        //
                        //         formData.append('imageFile', file);
                        //
                        //         $.ajax({
                        //             url: '/admin/web-image/upload',
                        //             type: 'POST',
                        //             data: formData,
                        //             processData: false,
                        //             contentType: false,
                        //             beforeSend: function (xhr) {
                        //             },
                        //             success: function (imageUrl) {
                        //                 // Викликати callback з отриманим URL зображення
                        //                 callback(imageUrl, { title: file.name });
                        //             },
                        //             error: function (xhr, status, error) {
                        //                 // Обробка помилки
                        //             }
                        //         });
                        //     };
                        //
                        //     input.click();
                        // },
                        // images_upload_handler: function (blobInfo, success, failure) {
                        //     var xhr, formData;
                        //
                        //     xhr = new XMLHttpRequest();
                        //     xhr.withCredentials = false;
                        //     xhr.open('POST', '/admin/web-image/upload');
                        //
                        //     xhr.onload = function () {
                        //         var imageUrl = xhr.responseText;
                        //         console.log(imageUrl);
                        //         if (xhr.status === 200 && imageUrl) {
                        //             success(imageUrl);
                        //         } else {
                        //             failure('Помилка завантаження зображення');
                        //         }
                        //     };
                        //
                        //     xhr.onerror = function () {
                        //         failure('Помилка завантаження зображення');
                        //     };
                        //
                        //     formData = new FormData();
                        //     formData.append('imageFile', blobInfo.blob(), blobInfo.filename());
                        //
                        //     xhr.send(formData);
                        // },
                        setup: function (editor) {
                            editor.on('change', function () {
                                handleContentChange(editor.getContent());
                            });
                        }
                    }}
                    tinymceScriptSrc="/tinymce/tinymce.min.js"
            />
        </>
    );
};

export default TinyMCEEditor;

