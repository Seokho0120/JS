"use strict";

export default class Popup {
  constructor() {
    this.popUp = document.querySelector(".pop-up");
    this.popUpText = document.querySelector(".pop-up_message");
    this.popUpRefresh = document.querySelector(".pop-up_refresh");
    this.popUpRefresh.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(text) {
    this.popUpText.innerHTML = text;
    this.popUp.classList.remove("pop-up--hide");
  }

  hide() {
    this.popUp.classList.add("pop-up--hide");
  }
}
