import sliderSettings from './_slider-settings'
import maskPhone from './_mask-phone'
import navAction from './_nav-action'
import index from './index'
import video from './_video'

document.addEventListener('DOMContentLoaded', () => {
   sliderSettings()
   maskPhone()
   navAction()
   video()
   index()
   AOS.init()
})
