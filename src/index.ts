import "./index.css";
import logo from "../public/j.jpeg";
import demo from "../public/demo.jpeg";
const a = "Hello World";
console.log(a);

const img = new Image();
img.src = logo;

document.getElementById("imgBox")?.appendChild(img);

const imgDemo = new Image();
imgDemo.src = demo;
console.log(demo, "123456");

document.getElementById("demo-img")?.appendChild(imgDemo);

// @log("hello")
class Author {
  [x: string]: string | (() => void);
  constructor() {
    this.name = "hyw";
    this.fn = () => {};
  }
  info() {
    console.log(this.name);
  }
}

const obj = new Author();
console.log(obj.name, obj.name);

// module.exports = Author;
