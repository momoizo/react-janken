import Nightmare from 'nightmare'

Nightmare.action('getTexts', function(selector, done){
    this.evaluate_now((selector) => {
        return [].slice.call(document.querySelectorAll(selector)).map((e) => e.innerText)
    }, done, selector)
})

export const touchTap = (selector) => {
    return (nightmare) => {
        nightmare
        .mousedown(selector)
        .mouseup(selector)
    }
}