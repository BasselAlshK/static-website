const controlItems = document.getElementsByClassName('control_itemOpen');

// Rx.Observable.fromEvent(controlItems, 'click')
//   .subscribe(item => console.log(item));
  function openDescriptioncHandler(id: string) {
    const descriptionPanel = document.getElementById(`description${id}`);
    const openDescriptionBtn = document.getElementById(`openDescriptionBtn${id}`);
    const closeDescriptionBtn = document.getElementById(`closeDescriptionBtn${id}`);

    descriptionPanel.classList.toggle("on");
    openDescriptionBtn.classList.toggle("off");
    closeDescriptionBtn.classList.toggle("on");
  }