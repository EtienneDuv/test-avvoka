import Quill from 'quill';
import {QImageBlot} from './customFormats/qImgBlot';

Quill.register(QImageBlot);

const toolBarConfig = [
  ['qImage'],
  ['bold', 'italic', 'underline'],
  [{'size': ['small', false, 'large', 'huge']}],
  ['blockquote', 'code-block'],
  [{'list': 'ordered'}, {'list': 'bullet'}],

  [{'indent': '-1'}, {'indent': '+1'}],

  [{'background': []}],
  [{'font': []}],
  [{'align': []}],

  ['clean'],
];

const quill = new Quill('#editor', {
  modules: {
    toolbar: toolBarConfig
  },
  theme: 'snow'
});

const qImageButton = document.querySelector('.ql-qImage');
qImageButton?.addEventListener('click', () => {
  // Prompt user for image and text input
  const imageUrl = prompt('Enter the URL for the image');
  const text = prompt('Enter the description for the image');

  // Insert custom format into the editor
  const position = quill.getSelection()?.index;
  if (position) {
    quill.insertEmbed(position, 'qImage', {image: imageUrl, text: text});
  }
});

// HTML Preview
quill.on('text-change', (_delta: unknown, _oldDelta: unknown, source: string) => {
  if (source == 'api') console.log('An API call triggered this change.');
  if (source == 'user') {
    const editorContent = document.querySelector('#editor > .ql-editor')?.innerHTML;
    const targetElement = document.querySelector('#editor-html');

    const cleanedContent = editorContent
      ?.replace(/(?<start><img src="data:image.*?base64,)[^"]+"/g, '$<start>...')
      .replace(/<p><br><\/p>/g, '~~~~~')
      .replace(/<p>(?<content>.+?)<\/p>/g, '<p>$<content></p>\n')
      .replace(/~~~~~/g, '<p><br></p>\n');

    if (targetElement && cleanedContent) {
      targetElement.textContent = cleanedContent;
    }
  }
});