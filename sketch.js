const TOTAL = 500;
let birds = [];
let savedBirds = [];
let pipes = [];
let counter = 0;
let slider;
let gen = 1;
let gap = 200;
let highScore = 0;
let bestscore = 0;
let NNV;
let debug = false;
let showBest=false;
let scores=[]
let bestScores = [];
let avgscore=[];
let diffc=24000
let increDiff=true;
// Add an event listener to the slider to detect changes in its value
// Get the debug button element
const debugBtn = document.getElementById('debug-btn');
//debug = false;

debugBtn.addEventListener('click', function () {
  if (debug) {
    debugBtn.classList.remove('on');
    debugBtn.classList.add('off');
    debug = false;
  } else {
    debugBtn.classList.remove('off');
    debugBtn.classList.add('on');
    debug = true;
  }
});
const showbestBtn = document.getElementById('toggle-best-bird');
//debug = false;

showbestBtn.addEventListener('click', function () {
  if (showBest) {
    showbestBtn.classList.remove('on');
    showbestBtn.classList.add('off');
    showBest= false;
  } else {
    showbestBtn.classList.remove('off');
    showbestBtn.classList.add('on');
    showBest = true;
  }
});

function pickBest(b) {
  let bestbird = null;
  let bestFitness = 0
  for (let i = 0; i < b.length; i++) {
    if (b[i].fitness >= bestFitness) {
      bestFitness = b[i].fitness
      bestbird = b[i];
      // bestbird.stc=255;
      // bestbird.sw=2;
    }
    return bestbird;
  }
}
function keyPressed() {
  if (key === 'S') {
    let bird = pickBest(birds);
    saveJSON(bird.brain, 'bird.json');
  }
}
function setup() {
  createCanvas(windowWidth*0.25, windowHeight*0.7);
  slider = document.getElementById("mySlider");
  frameRate(120)
  //slider = createSlider(1, 50, 1,1);
  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
}
// Initialize the chart data
const chartData = {
  labels: [],
  datasets: [{
    label: 'Best Score',
    data: [],
    borderColor: 'rgba(255, 0, 0, 1)',
    borderWidth: 1,
    fill: false
  }]
};

// Initialize the chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Generation'
      }
    }],
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Best Score'
      }
    }]
  }
};

// Create a new chart instance
const chartCanvas = document.getElementById('chart-canvas');
const chart = new Chart(chartCanvas, {
  type: 'line',
  data: chartData,
  options: chartOptions
});

function updateChart(bestScore, generation) {
  // Add the data to the chart
  chartData.labels.push(generation.toString());
  chartData.datasets[0].data.push(bestScore);

  // Only keep the last 30 generations
  if (chartData.labels.length > 30) {
    chartData.labels.shift();
    chartData.datasets[0].data.shift();
  }

  // Update the chart
  chart.update();
}
function draw() {
  //updateChart(bestscore, gen);
  for (let n = 0; n < slider.value; n++) {
    if (counter % 100 == 0) {
      pipes.push(new Pipe());
    }
    //increment of difficulty toggle
    if (counter!=0 && counter % diffc == 0 && gap >= 100 && increDiff) {
      gap -= 1
      console.log(gap)
    }
    counter++;
    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      for (let j = birds.length - 1; j >= 0; j--) {
        if (pipes[i].hits(birds[j])) {
          scores.push(birds[j].score);
          savedBirds.push(birds.splice(j, 1)[0]);
        }
      }
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
        highScore++;
      }
    }
    if (highScore > bestscore) {
      bestscore = highScore;
    }
    for (let i = birds.length - 1; i >= 0; i--) {
      if (birds[i].edges()) {
        //birds.splice(i, 1);
        scores.push(birds[i].score);
        savedBirds.push(birds.splice(i, 1)[0]);
      }
    }
    for (let bird of birds) {
      bird.think(pipes);
      bird.getReward(pipes);
      bird.update();
    }
    if (birds.length === 0) {
      counter = 0;
      gap = 200;
      //console.clear()
      nextGeneration()
      pipes = [];
      highScore = 0;
    }
  }
  // All the drawing stuff
  background(60, 180, 180);
  for (let pipe of pipes) {
    pipe.show();
  }
  for (let bird of birds) {
    if(!showBest){
      bird.show();
    }
    else{
      best = pickBest(birds)
      best.show()
    }
  }
  if (birds.length > 0) {
    best = pickBest(birds)
    bestnn = best.brain;
    best.show()
  }
  NNV = new NNvisual(width / 2 - 100, height - 150, 200, 100, 10, bestnn);
  NNV.show()
  push()
  textSize(32);
  noStroke()
  textAlign(RIGHT, CENTER);
  fill(120, 50, 120)
  text(`Gen: ${gen}`, width - 50, 50)
  //text(gen, 120, 50)
  fill(255, 0, 0)
  textAlign(RIGHT, CENTER);
  text(`Score: ${highScore}`, width - 50, 100)
  //text(highScore, width - 50, 50);
  fill(100, 100, 50)
  text(`Best Score: ${bestscore}`, width - 50, 150)
  //text(bestscore, width - 75, height - 50);
  pop()
}
