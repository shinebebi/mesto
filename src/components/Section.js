export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    addNewItem (item) {
        this._container.prepend(item)
    }

    addItem(item) {
        this._container.append(item);
    }

    renderItems() {
        this._renderedItems.forEach(item => {
            this._renderer(item);
        });
    }
}