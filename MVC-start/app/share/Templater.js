export class Templater {
    constructor(url) {
        this.url = url;
        this.templateStr = '';
        this.getTemplate();
    }
    getTemplate() {
        fetch(this.url)
            .then(prom => prom.text())
            .then(txt => this.templateStr = txt);
    }
    getHTML(data) {
        let str = this.templateStr;
        data.forEach(obj => {
            str = str.replace(new RegExp(`{{${obj.name}}}`, 'g'), obj.value);
        });
        return str;
    }
}