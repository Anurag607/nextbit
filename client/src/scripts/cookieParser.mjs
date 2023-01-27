import cookie from 'cookie'

export default function parseCookies(req) {
    // console.log(typeof cookie.parse(`${req ? req.headers.cookie : document.cookie}`))
    return cookie.parse(req ? `${req.headers.cookie}` : document.cookie)
}