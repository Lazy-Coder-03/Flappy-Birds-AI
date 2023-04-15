class Pipe {
  //gap=170;

  constructor() {
    this.w = 50;
    this.topx = width - this.w;
    this.topy = 0;
    this.toph = random(0, height - gap);
    this.re = 22;
    this.gr = 128;
    this.bl = 50;
    this.bty = this.toph + gap;
    this.bth = height - this.bty;
    this.xvel = -3;
    this.touching = false;
    this.middlex = this.topx + (this.w / 2)
    this.middley = this.toph + (gap / 2);

  }
  offscreen() {

    return (this.topx < -this.w);

  }
  hits(b) {
    if (b.y - b.r < this.toph || b.y + b.r > this.bty) {
      //
      if (b.x + b.r > this.topx && b.x - b.r < this.topx + this.w) {
        this.touching = true;
        //return true;
      }
    } else {
      this.touching = false;
      //return false;
    }
    return this.touching;
  }
  show() {
    // noStroke()

    fill(this.re, this.gr, this.bl);
    //ellipse(this.middlex,this.middley,5);
    stroke(0)
    rect(this.topx, this.topy, this.w, this.toph);
    rect(this.topx, this.bty, this.w, this.bth);
    rect(this.topx - 10, this.topy + this.toph - 25, 70, 25);
    rect(this.topx - 10, this.bty, 70, 25);
  }
  update() {
    // this.touching=false;
    this.topx += this.xvel;
    this.middlex += this.xvel

  }
}