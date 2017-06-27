module.exports = {
    formElement: function(type, id, className, text, src, href) {
        let element = document.createElement(type);
        element.id = id;
        element.className = className;
        element.innerHTML = text;
        if (type === 'img') {
            element.src = src;

        }
        if (type === 'a') {
            element.href = href;
        }
        return element;
    },
    appendElement: function(parent, child) {
        parent.appendChild(child);
        return parent;
    },
    appendElements: function(parent, children) {
        children.forEach(function(child) {
            parent.appendChild(child);
        })
        return parent;
    },
    wireUp: function(element, method, callback) {
        element.addEventListener(method, callback);
        return element;
    }
}