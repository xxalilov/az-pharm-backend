export default () => {
    try {
        new Splide('.single-slider', {
            type: 'loop',
            speed: 400,
            autoplay: true,
            arrows: true,
            interval: 2000,
            pauseOnHover: true,
            pauseOnFocus: true,
            perPage: 1,
            perMove: 1,
            gap: '30px',
            pagination: false,
        }).mount()
        new Splide('.feedback-slider', {
            type: 'loop',
            speed: 400,
            autoplay: true,
            arrows: false,
            interval: 2000,
            pauseOnHover: true,
            pauseOnFocus: true,
            perPage: 2,
            perMove: 2,
            gap: '20px',
            pagination: false,
            breakpoints: {
                '1000': {
                    perPage: 2,
                    arrows: false,
                    gap: '12px'
                },
                '700': {
                    perPage: 1,
                    arrows: false,
                    gap: '12px'
                }
            }
        }).mount()
    } catch (e) {}
}
