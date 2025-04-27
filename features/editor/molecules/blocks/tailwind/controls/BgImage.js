import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { useEditor } from '../../../../hooks/use-editor';
const imageMimeType = /image\/(png|jpg|jpeg)/i;
const BlockBgImage = ({ title, data, attr, updateCss }) => {
    const { editor, resetSelectedBlock, editBlockBackgroundImage } = useEditor();
    const [file, setFile] = useState(null);
    const classes = () => {
        let css = '';
        css = editor?.current.css && Object.values(editor.current.css).join(" ");
        return css;
    };
    const getStyle = () => {

        let stl = {};
        if (!_.isUndefined(editor?.current.style) && editor?.current.style !== '') {
            stl = editor?.current.style.split(';').reduce((acc, rule) => {
                const [property, value] = rule.split(':');
                if (property && value) {
                    acc[property.trim()] = value.trim();
                }
                return acc;
            }, {});
        }
        if (editor?.current.background && editor?.current.background.url !== '') {
            stl['backgroundImage'] = `url(${editor?.current.background.url})`;
        }
        return stl;
    };
    const changeHandler = (e) => {
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
            // toast("Image mime type is not valid");
            return;
        }
        setFile(file);
    }

    useEffect(() => {
        let fileReader, isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    // setFileDataURL(result)
                    editBlockBackgroundImage(result);
                    if (editor.selectedBlocks.length > 0) {
                        for (let index = 0; index < editor.selectedBlocks.length; index++) {
                            const element = editor.selectedBlocks[index];
                            editBlockBackgroundImage(result, element)
                            resetSelectedBlock();
                        }
                    }
                }
            }
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }

    }, [file]);
    return editor.current && (
        <div className="w-full ">
            <div className='relative'>

                <label htmlFor="upload-avatar" className="border  border-gray-300 relative flex flex-col cursor-pointer items-center justify-center bg-slate-50 p-2 dark:bg-slate-900">

                    <div style={getStyle()} className={`h-32 w-32 ${classes()}`} />
                    <input type="file" onChange={changeHandler} accept="image/jpeg, image/png, image/jpg" className="hidden" id="upload-avatar" />
                    <div className=" text-sm font-bold my-2 border bg-slate-100 opacity-95 px-3 py-0.5 rounded-lg">Click to change...</div>
                </label>
            </div>
        </div>
    )
}
export default BlockBgImage;
