import { selectOne } from './_functions'

export default () => {
    try {
        const videoOpenBtn = selectOne('.video__play')
        const videoBackdrop = selectOne('.video-modal')

        videoOpenBtn.addEventListener('click', e => {
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = '17px'
            videoBackdrop.classList.remove('d-none')
        })

        videoBackdrop.addEventListener('click', e => {
            document.body.style.overflow = ''
            document.body.style.paddingRight = 0
            e.currentTarget.classList.add('d-none')
        })
    } catch (e) {}
}
