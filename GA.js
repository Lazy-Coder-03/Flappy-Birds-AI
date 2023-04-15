function nextGeneration() {
  gen++
  updateChart(bestscore, gen-1);
  //console.log(scores)
  let sum = 0
  let avg = 0
  for(let i=0;i<scores.length;i++){
    sum+=scores[i]
  }
  avg=sum/TOTAL
  //console.clear()
  //console.log(avg);
  calculateFitness();
  for (let i = 0; i < TOTAL; i++) {
    birds[i] = pickOne();
  }
  savedBirds = [];
  scores=[]
  best = pickBest(birds);
  bestnn = best.brain;
  bestScores.push(best.score);
  // Update the chart
}
function pickOne() {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r = r - savedBirds[index].fitness;
    index++;
  }
  index--;
  let bird = savedBirds[index];
  let child = new Bird(bird.brain, bird.re, bird.gr, bird.bl, bird.stcr, bird.stcg, bird.stcb);
  child.mutate();
  return child;
}
function calculateFitness() {
  let sum = 0;
  for (let b of savedBirds) {
    //e=map(b.distMiddle(pipes),0,width,1,0);
    sum += b.score;
    //console.log(e);
  }
  for (let b of savedBirds) {
    b.fitness = (b.score / sum);
  }
}