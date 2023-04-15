var closest;
class Bird {
  constructor(brain, re, gr, bl, stcr, stcg, stcb) {
    this.x = 100;
    this.y = height / 2;
    this.yvel = 0;
    this.gravity = 0.7;
    this.r = 15;
    this.lift = -12;
    this.score = 0;
    this.fitness = 0;
    this.stc = 0;
    this.sw = 2;
    if (re && gr && bl && stcr && stcb && stcg) {
      this.re = re;
      this.gr = gr;
      this.bl = bl;
      this.stcr = stcr;
      this.stcg = stcg;
      this.stcb = stcb;
    } else {
      this.re = random(255);
      this.gr = random(255);
      this.bl = random(255);
      this.stcr = random(255);
      this.stcg = random(255);
      this.stcb = random(255);
    }
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(5, 7, 2);
    }
  }
  mutate() {
    let m = this.brain.mutate(0.1);
    if (m) {
      this.stcr = random(255);
      this.stcg = random(255);
      this.stcb = random(255);
      //console.clear()
      //console.log(this)
    }
  }
  edges() {
    return this.y + this.r > height || this.y - this.r < 0;
  }
  //   edges() {
  //     if (this.y + this.r > height) {
  //       this.y=height-this.r;
  //       //this.x = 100;
  //       //this.y = height / 2;
  //       this.gravity = 0;
  //       this.yvel = 0;
  //       this.score = 0;
  //     }
  //     if (this.y - this.r < 0) {
  //       this.y=this.r;
  //      // this.x = 100;
  //       //this.y = height / 2;
  //       this.score = 0;
  //       this.gravity = 0.1;
  //       this.yvel = 0;
  //     }
  //   }
  getReward(p) {
    closest = null;
    let closeD = Infinity;
    for (let i = 0; i < p.length; i++) {
      let d = pipes[i].topx + pipes[i].w - this.x;
      if (d < closeD && d > 0) {
        closest = pipes[i];
        closeD = d;
      }
    }
    let e = dist(this.x, this.y, closest.middlex, closest.middley);
    let amt = map(e, 0, width, 20, 0);
    this.score += amt;
    //     else if(e<gap/4){
    //       this.score+=5
    //     }
  }
  think(p) {
    let closest = null;
    let closeD = Infinity;
    for (let i = 0; i < p.length; i++) {
      let d = pipes[i].topx + pipes[i].w - this.x;
      if (d < closeD && d > 0) {
        closest = pipes[i];
        closeD = d;
      }
    }
    let inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = closest.toph / height;
    inputs[2] = closest.bth / height;
    inputs[3] = closest.topx / width;
    inputs[4] = this.yvel / 10;
    let outputs = this.brain.predict(inputs);
    if (outputs[0] > outputs[1]) {
      this.up();
    }
  }
  update() {
    this.yvel += this.gravity;
    this.y += this.yvel;
    //this.distMiddle(pipes);
    this.score++;
    //text(this.score, this.x - 25, this.y);
  }
  //void scoreadd(){
  //  if(
  //}
  up() {
    this.yvel += this.lift;
  }
  show() {
    push();
    fill(this.re, this.gr, this.bl, 150);
    strokeWeight(this.sw);
    stroke(this.stcr, this.stcg, this.stcb);
    ellipse(this.x, this.y, this.r * 2);
    textSize(10);
    fill(255);
    //text(nf(this.score,5,2),this.x-70,this.y);
    pop();
    if (debug) {
      stroke(51)
      line(this.x, this.y, closest.topx + 25, closest.toph);
      line(this.x, this.y, closest.topx + 25, height - closest.bth);
    }
  }
}
