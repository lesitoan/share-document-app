
export const getCookieValue = (name) => {
    const regex = new RegExp(`(^| )${name}=([^;]+)`)
    const match = document.cookie.match(regex)
    if (match) {
        return match[2];
    }
}

export const setAvatar = () => {
    if (!getCookieValue('name')) return;
    const loginBox = document.querySelector('.login__box');
    if (loginBox) {
        document.querySelector('.login__box--1').classList.add("hidden");
        loginBox.innerHTML = `
            <li class="login__box--2">
                <a class="login__item">${getCookieValue('name')}</a>
                <div class="avatar">
                    <img src="/img/avatar.png" alt="">
                </div>
            </li>
            <div class="pop-up hidden">
                <ul class="pop-up__list">
                    <li class="pop-up__item pop-up__user-info">Thông tin</li>
                    <hr />
                    <li class="pop-up__item pop-up--logout">
                        <i class="fa-solid fa-right-from-bracket"></i>
                        Đăng xuất
                    </li>
                </ul>
            </div>
        `
    }

}
