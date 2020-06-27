
// Escribir una clase Collection que representa una colección de elementos. Esta clase debe:

// - Poder construirse o vacía (sin elementos) o con una lista inicial de elemenetos
// - Debe tener un método `add` para poder agregar un elemento
// - Debe tener un método `delete` para poder eliminar un elemento
// - Debe tener un método `has` para poder determinar un elemento existe en la colección

export class Collection {

    constructor(listaNueva = []) {
        this.lista = listaNueva;
    }
    add(elem) {
        if (elem) {
            this.lista.push(elem);
        }
    }
    delete(elem) {
        const pos = this.lista.indexOf(elem, 0);
        if (!this.has(elem)) return this.lista.splice(pos, 1);
        return;
    }
    has(elem) {
        return (this.lista.indexOf(elem, 0) !== -1)
    }
}