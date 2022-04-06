import { selectOne, selectAll } from './_functions'

export default () => {
   try {
      const darkLayer = selectOne('.dark-layer'),
         nav = selectOne('.site-nav'),
         navLinks = selectAll('.site-nav__link'),
         navToggler = selectOne('.hamburger')

      function navOpen() {
         darkLayer.classList.remove('d-none')
         nav.classList.remove('site-nav-close')
         selectOne('body').style.overflow = 'hidden'
      }

      function navClose() {
         darkLayer.classList.add('d-none')
         nav.classList.add('site-nav-close')
         selectOne('body').style.overflow = ''
      }

      navToggler.addEventListener('click', e => {
         navOpen()
      })

      darkLayer.addEventListener('click', e => {
         navClose()
      })

      navLinks.forEach(link => {
         link.addEventListener('click', e => {
            navClose()
         })
      })
   } catch (e) {}
}