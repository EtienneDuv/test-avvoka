import Quill from 'quill';
const CustomFormat = Quill.import('blots/block');

export class QImageBlot extends CustomFormat {
  static create (value: { image: string; text: string; }) {
    const node = super.create();
    const img = document.createElement('img');
    img.setAttribute('src', value.image);
    node.appendChild(img);
    node.innerHTML += value.text;
    return node;
  }

  static value (node) {
    const img = node.querySelector('img');
    return {
      image: img.src,
      text : node.innerHTML.replace(img.outerHTML, '')
    };
  }
}

QImageBlot.blotName = 'qImage';
QImageBlot.tagName = 'q-img-text';
