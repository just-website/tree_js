export const createTextarea = (data) => {
    return `
        <div class="textarea">
            <div class="${data.contentClassName}" id="textarea" contenteditable="true" placeholder="insert json"></div>
            <button class="${data.buttonClassName}">Применить</button>
        </div>
    `
}