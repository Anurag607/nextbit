import Cookie from 'js-cookie'

const search = () => {
    const searchbar = document.querySelector(`#searchbox`)
    const searchico = document.querySelector(`#searchico`)

    if (searchico.dataset.switch === 'off') {
        searchico.dataset.switch = 'on'
        searchbar.style.width = '12.5rem'
        searchbar.style.opacity = '1'
        searchbar.style.transitionTimingFunction = 'ease-out'
        searchbar.style.cursor = "text"
        Cookie.set('query', searchbar.value, { path: '/' })
    }
    else {
        searchico.dataset.switch = 'off'
        searchbar.style.width = '0rem'
        searchbar.style.opacity = '0'
        searchbar.style.transitionTimingFunction = 'ease-in'
        searchbar.style.cursor = "default"
    }
}

export default search