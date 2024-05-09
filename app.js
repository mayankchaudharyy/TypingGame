let [ms, s, min, h] = [0, 0, 0, 0];
let dt = null;
let inp = document.getElementById("dec");
let btn = document.getElementById("btn");
let wpm = 0;
let display_wpm = document.querySelector(".wpm");
let rst = document.querySelector(".rst");

const arr = [
  "Mental health is a state of well-being in which an individual realizes his or her own abilities, can cope with the normal stresses of life, can work productively and fruitfully, and is able to make a contribution to his or her community. Mental health is a state of well-being in which an individual realizes his or her own abilities",
  "Social life is a life in which people interact with each other. It is the way in which people interact with each other that makes it a social life. There are many different ways in which people can interact with each other, and each of these ways has its own purpose. One of the most important things that social life does is teach",
  "Education is the process of learning and acquiring knowledge. It is a lifelong process that helps an individual to develop his or her potential and improve the quality of life. Education has always been an important part of human societies and it is one of the basic human rights. It helps people to develop their skills and knowledge",
  "Hard work is the most important key to success. The harder you work, the more chances of success you have. Hard work always pays off. It is always better to work hard than to work smart. Hard work is the most important key to success because it gives you the chance to achieve your goals. It also teaches you the value of time"
];
let ran = Math.floor(Math.random() * 4);
let text = document.getElementById("text");
text.innerText = arr[ran];

let input = document.getElementById("typing");

input.addEventListener("click",()=>{
  watchStart();
})


function watchStart(){
  if(dt !== null){
      clearInterval(dt);
  }
  dt = setInterval(inc, 100);
}


function inc(){
  ms += 10;
  if(ms === 100){
      ms = 0;
      s += 1;
      if(s === 60){
          s = 0;
          min += 1;
          if(min === 60){
              min = 0;
              h += 1;
          }
      }
  }
  h = (h>9)?h:'0'+h;
  min = (min>9)?min:'0'+min;
  s = (s>9)?s:'0'+s;
  ms = (ms < 10) ? "0" + ms : ms;
  // ms = ms < 10 ? "00" + ms : ms < 100 ? "0" + ms : ms;
  inp.innerText = `${h}h : ${min}m : ${s}s`;
  h = Number(h);
  min = Number(min);
  s = Number(s);
  ms = Number(ms);
}


btn.addEventListener("click",()=>{
  clearInterval(dt);
  checkWpm();
  inp.classList.add("anime");
  setTimeout(() => {
    inp.classList.remove("anime");
  }, 1000);
})


function checkWpm(){
  let val = input.value;
  if(val.length < 1){
    return;
  }
  console.log(val);
  val = val.toLowerCase();
  val = val.split(" ");
  val = val.filter(e =>  e);
  let ans = arr[ran].toLowerCase().split(" ").filter(e => e);
  for(let i = 0; i < ans.length; i++){
    if(ans[i] === val[i]){
      wpm += 1;
    }
  }
  let time = h * 60 + min + s /60;
  time = Math.ceil(time);
  wpm = Math.ceil(wpm/time);
  display_wpm.innerText = wpm;
}


rst.addEventListener("click",()=>{
  // inp.classList.remove("anime");
  clearInterval(dt);
  [ms, s, min, h] = [0, 0, 0, 0];
  inp.innerText="00h : 00m : 00s";
  display_wpm.innerText = 0;
  wpm = 0;
  input.value = "";
})