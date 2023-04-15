class NNvisual {
  constructor(x_, y_, w_, h_, r_, nn_) {
    this.x = x_
    this.y = y_
    this.w = w_
    this.h = h_
    this.rad = r_
    this.nn = nn_
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.s = 0;
  }
  show() {
    noFill()
    rect(this.x, this.y, this.w, this.h)
    for (let i = 0; i < this.nn.hidden_nodes; i++) {
      for (let j = 0; j < this.nn.input_nodes; j++) {
        let da = normaliseMatrix(this.nn.weights_ih)
        let d = da.data[i][j];
        //w = map(d,-1,1,0,5);
        if (d < 0) {
          this.r = 255;
          this.g = 0;
          this.b = 0;
          this.s = map(d, 0, -0.2, 0, 2);
        } else {
          this.r = 0;
          this.g = 255;
          this.b = 0;
          this.s = map(d, 0, 0.2, 0, 2);
        }
        push()
        translate(this.x, this.y);
        stroke(this.r, this.g, this.b);
        strokeWeight(this.s);
        line(this.w / 2, this.h / this.nn.hidden_nodes * (i + 0.5), this.w / 4, this.h / this.nn.input_nodes * (j + 0.5));
        pop()
      }
      //ellipse(width / 2, (height / nn.hidden_nodes) * (i + 0.5), 20)
      //console.table(da.data);
    }
    for (let i = 0; i < this.nn.input_nodes; i++) {
      push()
      translate(this.x, this.y);
      fill(255)
      ellipse(this.w / 4, (this.h / this.nn.input_nodes) * (i + 0.5), this.rad)
      pop();
    }
    for (let i = 0; i < this.nn.hidden_nodes; i++) {
      for (let j = 0; j < this.nn.output_nodes; j++) {
        let db = normaliseMatrix(this.nn.weights_ho);
        let c = db.data[j][i];
        if (c < 0) {
          this.r = 255;
          this.g = 0
          this.b = 0
          this.s = map(c, 0, -0.3, 0, 2)
        } else {
          this.r = 0
          this.g = 255
          this.b = 0
          this.s = map(c, 0, 0.3, 0, 2)
        }
        push()
        translate(this.x, this.y);
        stroke(this.r, this.g, this.b);
        strokeWeight(this.s);
        line(this.w / 2, (this.h / this.nn.hidden_nodes) * (i + 0.5), this.w * (3 / 4), (this.h / this.nn.output_nodes) * (j + 0.5))
        pop()
      }
      // ellipse(width / 2, (height / nn.hidden_nodes) * (i + 0.5), 20)
      //console.table(da.data);
    }
    for (let i = 0; i < this.nn.hidden_nodes; i++) {
      push()
      translate(this.x, this.y);
      fill(255)
      ellipse(this.w / 2, (this.h / this.nn.hidden_nodes) * (i + 0.5), this.rad)
      pop()
    }
    for (let i = 0; i < this.nn.output_nodes; i++) {
      push()
      translate(this.x, this.y);
      fill(255)
      ellipse(this.w * (3 / 4), (this.h / this.nn.output_nodes) * (i + 0.5), this.rad)
      pop()
    }
  }
}