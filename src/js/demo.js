const { body } = document;

const burger = document.getElementById("burger");
const signInButtons = document.getElementsByClassName("signInBtn");

const mainBlock = document.getElementById("mainBlock");
const back = document.getElementById("back");

const closeModalIcon = document.getElementById("closeModal");
const modalContent = document.getElementById("modalContent");
const modalContainer = document.getElementById("modalContainer");

const closeModalDrawerIcon = document.getElementById("closeModalDrawer");

const onScroll = () => {
  const section = document.getElementById("scrollSection");

  if (section) {
    const width = window.innerWidth;
    const turnedOff = width < 1020;
    const scrollBlocks = section.getElementsByClassName("scrollBlock");
    const image = section.getElementsByClassName("scrollBackground")[0];
    const imagePos = image.getBoundingClientRect().top;

    for (let index = 0; index < scrollBlocks.length; index++) {
      const element = scrollBlocks[index];
      const elemPos = element.getBoundingClientRect().top;
      const elemHeight = element.offsetHeight;

      const offsetTop = Math.abs(elemPos - imagePos);
      const scaleValue = turnedOff ? 1 : 1 - (0.2 * offsetTop) / elemHeight;
      const opacityValue = turnedOff ? 1 : 1 - (0.5 * offsetTop) / elemHeight;

      element.style.transform = `scale(${scaleValue})`;
      element.style.transformOrigin = "right";
      element.style.opacity = opacityValue;
    }
  }
};

const drawerOpen = () => {
  body.style.overflow = "hidden";

  mainBlock.classList.add("modalOpened");
  modalContainer.classList.add("drawerOpened");
  modalContainer.classList.remove("opened");
};

const modalOpen = () => {
  body.style.overflow = "hidden";

  console.log("modalOpen");

  mainBlock.classList.add("modalOpened");
  modalContainer.classList.add("opened");
  modalContainer.classList.remove("drawerOpened");
};

const closeModal = () => {
  body.style.overflow = "";

  mainBlock.classList.remove("modalOpened");
  modalContainer.classList.remove("opened");
  modalContainer.classList.remove("drawerOpened");
};

const closeModalBackground = (EO) => {
  if (
    !EO.target.contains(modalContent) ||
    EO.target !== modalContent ||
    EO.target !== closeModalIcon
  ) {
    body.style.overflow = "";
    closeModal();
  }
};

document.addEventListener("scroll", onScroll);

for (let index = 0; index < signInButtons.length; index++) {
  const button = signInButtons[index];
  button.addEventListener("click", modalOpen);
  console.log("button", button);
}

closeModalIcon.addEventListener("click", closeModal);
back.addEventListener("click", closeModalBackground);

closeModalDrawerIcon.addEventListener("click", closeModal);
burger.addEventListener("click", drawerOpen);
