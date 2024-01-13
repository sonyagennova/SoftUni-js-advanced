class Circle {
    constructor(radius){
        this.radius = radius;     
    }

  
    get radius() {
        if(this._radius * 2 !== this.diameter){
            this._radius = this.diameter / 2;
            let _area = this.radius * this.radius * Math.PI;
            this.area = _area;
        }
        return this._radius;
    }

    set radius(value){
        this._radius = value;
        let _diameter = value * 2;
        this.diameter = _diameter;
        let _area = value * 2 * Math.PI;
        this.area = _area;
    }


}

let c = new Circle(2);

console.log(`Radius: ${c.radius}`);

console.log(`Diameter: ${c.diameter}`);

console.log(`Area: ${c.area}`);

c.diameter = 1.6;

console.log(`Radius: ${c.radius}`);

console.log(`Diameter: ${c.diameter}`);

console.log(`Area: ${c.area}`);