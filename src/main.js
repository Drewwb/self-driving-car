
const carCanvas=document.getElementById("carCanvas");
carCanvas.width=200;
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road=new Road(carCanvas.width/2,carCanvas.width*0.9);


const N=100;
let difficulty = 0;
const cars=generateCars(N);
let bestCar=cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,0.1);
        }
    }
    console.log("Best Brain:", JSON.parse(localStorage.getItem("bestBrain")));
}

// Function to add a hardcoded pre-trained model to local storage
function addPreTrainedModel() {
    const preTrainedModel = {
        levels: [
            {
                inputs: [0, 0.6648181921614221, 0.5358759584799262, 0.5477108619660348, 0.18884754905664658, 0, 0.18113142813935035, 0.045014835304787115, 0, 0],
                outputs: [0, 0, 0, 1, 0, 1],
                biases: [0.09477739049559006, 0.3278892149813642, -0.04663405283565922, -0.3718615014695764, 0.5603367064734606, 0.45684639307544983],
                weights: [
                    [-0.38574343160221175, -0.015231531057221942, 0.12890365497651418, -0.2350020493082302, 0.024085330624547874, -0.43243636488192516],
                    [-0.431702208595754, 0.44588251806478985, -0.3970847804175509, 0.3465699627412219, -0.5767591262109393, 0.25409745835656766],
                    [0.25754447378659434, -0.12476343990225712, -0.2531339189665597, -0.33407272679622035, -0.1434044594665769, 0.44974199285976363],
                    [-0.383261721269258, 0.29798591721892465, 0.2780759113101624, 0.5764679124939521, 0.2629531464355296, 0.36628677943376414],
                    [-0.27754709252345433, 0.2796604630553845, 0.5965872409897821, -0.4462612596724912, 0.2388439810201422, -0.1981976214553292],
                    [0.5223852467493759, -0.06886975811803957, 0.14456268484923485, -0.269695428981531, 0.5153179747079626, -0.19944400109375615],
                    [0.6414814633033825, -0.6874212086047415, -0.5367096833955622, 0.6509283027921179, 0.2401532344999719, 0.20690060756928855],
                    [0.40531926165320914, -0.354554899214417, -0.47638309639589244, 0.20215268591386362, 0.4212878714530513, 0.10194780320598121],
                    [0.3050991457549197, 0.004135652646299198, 0.32981245059690917, -0.23189405976234043, 0.02566051927279195, -0.2736938486201243],
                    [0.5932119696608458, 0.29713645437642666, 0.5831929241493106, 0.07469276534615765, 0.34310484403229924, 0.08394328507916396]
                ]
            },
            {
                inputs: [0, 0, 0, 1, 0, 1],
                outputs: [1, 0, 0, 0],
                biases: [-0.29262179163149016, -0.001679945733767424, -0.056234122347608675, 0.12281105681448054],
                weights: [
                    [-0.2473028232069495, 0.284632827928654, -0.36227909398440994, -0.2163091094510612],
                    [0.05662267590346908, 0.09155341512658094, 0.1519487103166279, 0.21528550121049184],
                    [-0.17312955392331122, 0.10382426054490239, 0.2650629968695497, -0.2578047317097877],
                    [0.39495959827006333, -0.23770494815985518, -0.047643800429410216, -0.01405756524314692],
                    [-0.08127726792954221, -0.2281005664397261, 0.1347601275692863, 0.3698385386955627],
                    [-0.3906713435640336, -0.3171734036712657, -0.10572369414890642, -0.03730813657985488]
                ]
            }
        ]
    };

    localStorage.setItem("preTrained", JSON.stringify(preTrainedModel));
}

addPreTrainedModel();

const traffic=[];
spawnTraffic();
animate();



function generateCars(N){
    const cars=[];
    for(let i=1;i<=N;i++){
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"));
    }
    return cars;
}

function spawnTraffic() {
    const laneCount = 3; // Assuming 3 lanes, adjust as necessary
    const laneIndex = Math.floor(Math.random() * laneCount);
    const playerCarY = bestCar.y; // Get the y position of the player's car

    // Spawn the new car slightly ahead of the player's car
    const spawnY = playerCarY - carCanvas.height * 0.8; // Adjust 0.8 as needed

    traffic.push(new Car(road.getLaneCenter(laneIndex), spawnY, 30, 50, "DUMMY", 2));

    // Schedule the next spawn
    setTimeout(spawnTraffic, 1500); // Adjust the interval as needed
}

function removeOffScreenTraffic() {
    for (let i = traffic.length - 1; i >= 0; i--) {
        if (traffic[i].y > carCanvas.height + 100) { // Remove cars off the bottom of the screen
            traffic.splice(i, 1);
        }
    }
}

function animate(time){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    for(let i=0;i<cars.length;i++){
        cars[i].update(road.borders,traffic);
    }
    bestCar=cars.find(
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)
        ));

    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;

    carCtx.save();
    carCtx.translate(0,-bestCar.y+carCanvas.height*0.7);

    road.draw(carCtx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx,"red");
    }
    carCtx.globalAlpha=0.2;
    for(let i=0;i<cars.length;i++){
        cars[i].draw(carCtx,"blue");
    }
    carCtx.globalAlpha=1;
    bestCar.draw(carCtx,"blue",true);

    carCtx.restore();

    networkCtx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(networkCtx,bestCar.brain);

    // Remove cars that are off the screen
    removeOffScreenTraffic();

    requestAnimationFrame(animate);
}