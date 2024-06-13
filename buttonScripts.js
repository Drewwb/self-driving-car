function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}

function discardAndRun(){
    localStorage.removeItem("bestBrain");
    window.location.reload();
}

        // // Pretrained brain JSON string
        // const pretrainedBrainJSON = '{"levels":[{"inputs":[0,0.2005919349682106,0.20059,0.272,-0.008039522438592961,0.5099622278112563],"outputs":[1,0,1],"biases":[0.5,0.5,0.5],"weights":[[0.2,0.3,0.5],[0.1,0.4,0.6],[0.3,0.7,0.9]]}]}';

        // // Function to load pretrained model and save to local storage
        // function loadPretrainedModel() {
        //     const pretrainedBrain = JSON.parse(pretrainedBrainJSON);
        //     const bestBrain = new NeuralNetwork([]);
        //     bestBrain.levels = pretrainedBrain.levels.map(level => {
        //         const newLevel = new Level(level.inputs.length, level.outputs.length);
        //         newLevel.inputs = level.inputs;
        //         newLevel.outputs = level.outputs;
        //         newLevel.biases = level.biases;
        //         newLevel.weights = level.weights;
        //         return newLevel;
        //     });
        //     localStorage.setItem("bestBrain", JSON.stringify(bestBrain));
        //     window.location.reload();
        // }

function saveAndRun() {
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
    window.location.reload();
}
