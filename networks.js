var NeuralNetwork = /** @class */ (function () {
    function NeuralNetwork(neuronCounts) {
        this.levels = [];
        for (var i = 0; i < neuronCounts.length - 1; i++) {
            this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
        }
    }
    NeuralNetwork.feedForward = function (givenInputs, network) {
        var outputs = Level.feedForward(givenInputs, network.levels[0]);
        for (var i = 1; i < network.levels.length; i++) {
            outputs = Level.feedForward(outputs, network.levels[i]);
        }
        return outputs;
    };
    return NeuralNetwork;
}());
var Level = /** @class */ (function () {
    function Level(inputCount, outputCount) {
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount);
        this.weights = [];
        for (var i = 0; i < inputCount; i++) {
            this.weights[i] = new Array(outputCount);
        }
        Level.randomize(this);
    }
    Level.randomize = function (level) {
        for (var i = 0; i < level.inputs.length; i++) {
            for (var j = 0; j < level.outputs.length; j++) {
                level.weights[i][j] = Math.random() * 2 - 1;
            }
        }
        for (var m = 0; m < level.biases.length; m++) {
            level.biases[m] = Math.random() * 2 - 1;
        }
    };
    Level.feedForward = function (givenInputs, level) {
        for (var i = 0; i < level.inputs.length; i++) {
            level.inputs[i] = givenInputs[i];
        }
        for (var i = 0; i < level.outputs.length; i++) {
            var sum = 0;
            for (var j = 0; j < level.inputs.length; j++) {
                sum += level.inputs[j] * level.weights[j][i];
            }
            level.outputs[i] = sum > level.biases[i] ? 1 : 0;
        }
        return level.outputs;
    };
    return Level;
}());
