export default class PictureThis {

    static get isInline() {
        return true;
    }

     get state() {
         return this._state;
     }
 
     set state(state) {
         this._state = state;
 
         this.button.classList.toggle(this.api.styles.inlineToolButtonActive, state);
     }


    constructor({ api }) {
        this.api = api;
        this.button = null;
        // this.state = false;
        this._state = false;

        this.tag = 'PICTURE';
        // this.class = 'cdx-marker';
    }

    render() {
        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.innerHTML = '<span uk-icon="image"></span>';
        this.button.classList.add(this.api.styles.inlineToolButton);

        return this.button;
    }

    surround(range) {
        if (this.state) {
            // If highlights is already applied, do nothing for now
            // this.unwrap(range);
            return;
        }
        this.wrap(range);
    }

    async wrap(range) {
        const selectedText = range.extractContents();
        const picture = document.createElement('PICTURE');
        const serializer = new XMLSerializer();
        const text = serializer.serializeToString(selectedText).trim()
        const index = this.api.blocks.getCurrentBlockIndex()
        const block = this.api.blocks.getBlockByIndex(index)

        const response = await fetch(`/api/image?query=${encodeURIComponent(text)}`)
            .then((response) => response.json())
            .then((imageData) => {

                const imgEl = document.createElement('img')
                imgEl.setAttribute('src', imageData.src.landscape);
                imgEl.setAttribute('alt', imageData.alt);

                const captionEl = document.createElement('figcaption')
                captionEl.appendChild(selectedText);
                
                const figureEl = document.createElement('figure')
                figureEl.appendChild(imgEl);
                figureEl.appendChild(captionEl);
                
                picture.appendChild(figureEl);

                console.log('id', block)
                this.api.blocks.update(block.id, {
                    type: 'picture',
                    data: {
                        text,
                        imageData
                    }
                    
                })
        });

        // picture.classList.add('cdx-marker');

        range.insertNode(picture);
        this.api.selection.expandToTag(picture);
        

    }

    unwrap(range) {
        const picture = this.api.selection.findParentTag('PICTURE');
        const text = range.extractContents();

        console.log('unwrapping...')

        picture.remove();

        range.insertNode(text);
    }

    checkState(selection) {

        /*  const text = selection.anchorNode;
 
         if (!text) {
             return;
         }
 
         const anchorElement = text instanceof Element ? text : text.parentElement;
 
 
         this.state = !!anchorElement.closest('PICTURE'); */

        const picture = this.api.selection.findParentTag(this.tag);
        this.state = !!picture;

    }
    
}