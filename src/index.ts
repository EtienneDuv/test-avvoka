import Quill from 'quill';

const quill = new Quill('#editor', {
  modules: {
    toolbar: [
      [{header: [1, 2, false]}],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block']
    ]
  },
  theme: 'snow'
});

quill.on('text-change', (delta, oldDelta, source) => {
  if (source == 'api') console.log('An API call triggered this change.');
  if (source == 'user') {
    const editorContent = document.getElementById('editor')?.getElementsByClassName('ql-editor')[0]?.outerHTML;
    const targetElement = document.getElementById('editor-html');

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