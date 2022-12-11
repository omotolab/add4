export default class MarkThis {

    static get isInline() {
        return true;
    }

   /*  get state() {
        return this._state;
    }

    set state(state) {
        this._state = state;

        this.button.classList.toggle(this.api.styles.inlineToolButtonActive, state);
    } */


    constructor({ api }) {
        this.api = api;
        this.button = null;
        this.state = false;
    }

    render() {
        this.button = document.createElement('button');
        this.button.type = 'button';
        // this.button.textContent = 'M';
        this.button.innerHTML = '<span uk-icon="lock"></span>';
        this.button.classList.add(this.api.styles.inlineToolButton);

        return this.button;
    }

    surround(range) {
        if (this.state) {
            // If highlights is already applied, do nothing for now
            this.unwrap(range);
            return;
        }

        this.wrap(range);
    }

    wrap(range) {
        const selectedText = range.extractContents();
        const mark = document.createElement('MARK');

        mark.classList.add('cdx-marker');
        mark.appendChild(selectedText);
        range.insertNode(mark);

        this.api.selection.expandToTag(mark);
    }

    unwrap(range) {
        const mark = this.api.selection.findParentTag('MARK');
        const text = range.extractContents();

        mark.remove();

        range.insertNode(text);
    }

    checkState(selection) {

        const text = selection.anchorNode;

        if (!text) {
            return;
        }

        const anchorElement = text instanceof Element ? text : text.parentElement;


        this.state = !!anchorElement.closest('MARK');

        // const mark = this.api.selection.findParentTag(this.tag);
        // this.state = !!mark;

    }
}