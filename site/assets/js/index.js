class MarkdownElement extends HTMLElement {
    async connectedCallback() {
        const src = this.getAttribute("src");
        if (!src) return;
        const res = await fetch(src);
        this.innerHTML = marked.parse(await res.text());
    }
}

customElements.define('markdown-', MarkdownElement);

/**
 * @type {IntersectionObserverInit}
 */
const observerOptions = {
    threshold: 0.25
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);


class BoxElement extends HTMLElement {

    class = 'box';
    async connectedCallback() {
        await new Promise(requestAnimationFrame);

        const div = document.createElement(this.class);
        for (let attr of this.attributes) {
            div.setAttribute(attr.name, attr.value);
        }
        div.classList.add('box');
        div.innerHTML = this.innerHTML;

        this.replaceWith(div);
        observer.observe(div);
    }
}

class ContainerElement extends BoxElement {
    class = 'container'
}

customElements.define('box-', BoxElement);
customElements.define('container-', ContainerElement);

class ButtonElement extends HTMLElement {

}
