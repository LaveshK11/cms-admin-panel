
import * as DOMPurify from 'dompurify';
import dynamic from 'next/dynamic';
import { useController } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css'; // Import the styles for the snow theme

const QuillNoSSRWrapper = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});


const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        ['clean'],
    ],
    clipboard: {
        matchVisual: false,
    },

};

const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
];

interface Props { control: any, name: string }

export default function TextEditor(props: Props) {
    const { field } = useController(props);

    function handleChange(content: string) {
        console.log(DOMPurify.sanitize('<math><mi//xlink:href="data:x,<script>alert(4)</script>">'))
        field.onChange(DOMPurify.sanitize(content));
    }

    return (
        <div>
            <QuillNoSSRWrapper modules={modules} formats={formats} theme="snow" onChange={handleChange} value={field.value} />
        </div>
    );
}
