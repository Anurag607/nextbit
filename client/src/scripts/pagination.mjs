
const deselectAll = (index) => {
    const page = document.querySelectorAll('.menubtn')
    page.forEach((el,i) => {
        if(i !== parseInt(index)) {
            el.style.color = 'rgba(0,0,0,0.225)'
        }
    })
}

const selectPage = (index) => {
    const page = document.querySelectorAll('.menubtn')
    page[parseInt(index)].style.color = 'rgba(0,0,0,0.725)'
    deselectAll(index)
}

export {selectPage, deselectAll}