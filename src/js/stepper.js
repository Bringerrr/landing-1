const stepperAnimation = () => {
    const stepper = document.getElementById('stepper')

    if (stepper) {

        const steps = stepper.getElementsByClassName('step')
        const stepperLine = document.getElementById('stepper-line')

        const pos = stepper.getBoundingClientRect().top;
        const browserHeight = isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
        const browserWidth = window.innerWidth;
        const stepperHeigh = stepper.offsetHeight;

        const linePaddings = browserWidth < 500 ? 170 : 100

        const getProgressValue = (browser, elemPos, elemHeight) => {
            const result = ((browser - elemPos) / elemHeight) * 100;
            if (result > 100) return 100
            if (result < 0) return 0
            return result
        }

        const progressValue = getProgressValue(browserHeight, pos, stepperHeigh);

        if (progressValue >= 0 || progressValue <= 100) {

            for (let index = 0; index < steps.length; index++) {
                const step = steps[index];
                const pos = step.getBoundingClientRect().top;
                const stepProgressValue = getProgressValue(browserHeight, pos, step.offsetHeight);
                if (stepProgressValue >= 0) {
                    const odd = index % 2 !== 0
                    const transitionAnimationStart = 40
                    let currAnimation = transitionAnimationStart - transitionAnimationStart * (stepProgressValue / 100)
                    const currOpacity = 0.3 + stepProgressValue / 100;

                    if (odd) {
                        currAnimation = currAnimation
                    } else {
                        currAnimation = -currAnimation
                    }

                    if (browserWidth <= 860) {
                        currAnimation = Math.abs(currAnimation)
                    }

                    step.style.transform = `translateX(${currAnimation}%)`
                    step.style.opacity = currOpacity;
                    step.style.transition = `transform 1.2s, opacity 1.2s`
                }
            }
        }

        stepperLine.style.height = `calc(${progressValue}% - ${linePaddings}px)`
        stepperLine.style.transition = `height 1.2s`
    }
}

window.addEventListener(
    'scroll',
    stepperAnimation
)

window.addEventListener(
    'resize',
    stepperAnimation
)