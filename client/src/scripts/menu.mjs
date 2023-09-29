const menu = () => {
    const button = document.querySelectorAll('.menubtn')

    button.forEach((btn, i) => {
        btn.onclick = function () {
            this.style.color = "rgba(0,0,0,0.725)"
            this.style.borderColor = "rgba(0,0,0,0.725)"
            this.style.borderRadius = "0rem"
            button.forEach((btn, j) => {
                if (j != this.dataset.index) {
                    btn.style.color = "rgba(0,0,0,0.225)"
                    btn.style.borderColor = "rgba(0,0,0,0.225)"
                    btn.style.borderRadius = "10rem"
                }
            })
        }
    })
}

export default menu