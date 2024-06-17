function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}

function discardAndRun(){
    localStorage.removeItem("bestBrain");
    window.location.reload();
}

function loadPreTrained(){
    const preTrained = JSON.parse(localStorage.getItem("preTrained"));
    if (preTrained) {
        bestCar.brain = preTrained;
        localStorage.setItem("bestBrain", JSON.stringify(preTrained));
        console.log("Loaded Pre-Trained Model:", preTrained);
    } else {
        console.log("No Pre-Trained Model Found in Local Storage");
    }
    window.location.reload();
}

function saveAndRun() {
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
    window.location.reload();
}
