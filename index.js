let todobox=document.getElementById("todobg");
let abt=document.getElementById("aboutw");


function ale(){
    alert("The main purpose to develop this website is to help students find their syllabus copy, previous year papers and track their study and revision with the To-do application in it.")
}
function about(){
    abt.classList.toggle("d-none");
    let menubox=document.getElementById("p1menuitems");
    menubox.classList.add("d-none");
    let mypro=document.getElementById("contact");
    todobox.classList.add("d-none");
    mypro.classList.add("d-none");
}
function aboutback(){
    abt.classList.add("d-none");
}
function itemsdisplay(){
    let menubox=document.getElementById("p1menuitems");
    menubox.classList.toggle("d-none");
    let mypro=document.getElementById("contact");
    mypro.classList.add("d-none");
}

function p1todo(){
    todobox.classList.remove("d-none");
    let menubox=document.getElementById("p1menuitems");
    menubox.classList.toggle("d-none");
    abt.classList.add("d-none");
   
}
function p1todo1(){
    todobox.classList.toggle("d-none");
    let p=document.getElementById("contact");
    p.classList.add("d-none")
    abt.classList.add("d-none");
}

function p1todoclose(){
    todobox.classList.add("d-none");
}
let b1=document.getElementById("but1");
let b2=document.getElementById("but2");
let b1box=document.getElementById("tools");
let b2box=document.getElementById("profiles");

function btn1(){
    b1.classList.add("clickbtn");
    b1.classList.remove("c_btn");
    b2.classList.add("c_btn");
    b2box.classList.add("d-none");
    b1box.classList.remove("d-none");
}

function btn2(){
    b2.classList.add("clickbtn");
    b2.classList.remove("c_btn");
    b1.classList.add("c_btn");
    b1box.classList.add("d-none");
    b2box.classList.remove("d-none");
}

let mypro=document.getElementById("contact");

function contactme(){
    mypro.classList.toggle("d-none");
    let menubox=document.getElementById("p1menuitems");
    menubox.classList.add("d-none");
    todobox.classList.add("d-none")
    abt.classList.add("d-none");
}

function contactback(){
    mypro.classList.add("d-none");
}


let save=document.createElement("button");
let itemsbody=document.getElementById("todoitems");
let inp=document.getElementById("todoinp");

let putsav=document.getElementById("todosbtm");

function getitems(){
    let tasks=localStorage.getItem("task");
    let str=JSON.parse(tasks);
    if(str===null){
        return [];
    }
    return str;
}
let list=getitems();
let cnt=list.length;

if(list.length!==0){
    save.textContent="Save";
    save.classList.add("savebtn");
    putsav.appendChild(save);
}

for(let i of list){
    create(i);
}

function remove(del){
    let item=document.getElementById(del);
    itemsbody.removeChild(item);
    let idx=list.findIndex(function(i){
        if("item"+i.unqid===del){
            return true;
        }
        else{
            return false;
        }
    });
    list.splice(idx,1);
    if(list.length===0){
        putsav.removeChild(save);
        localStorage.setItem("task",JSON.stringify(list));
    }
}

function strike(li,boc,lab){
    let line=document.getElementById(lab);
    line.classList.toggle("strike");
    let idx=list.findIndex(function(i){
        if("item"+i.unqid===li){
            return true;
        }
        else{
            return false;
        }
    });
    if(list[idx].isChecked===true){
        list[idx].isChecked=false;
    }
    else{
        list[idx].isChecked=true;
    }
    localStorage.setItem("task",JSON.stringify(list));
}

function create(todo){
    let li=document.createElement("li");
    li.id="item"+todo.unqid;
    li.classList.add("items")

    let todocheck=document.createElement("input");
    todocheck.id="checkbox"+todo.unqid;
    todocheck.type="checkbox";
    todocheck.checked=todo.isChecked;

    let div1=document.createElement("div");
    div1.classList.add("delabel")
    let label=document.createElement("label");
    label.classList.add("label");
    label.id="label"+todo.unqid;
    label.setAttribute("for",todocheck.id);
    label.textContent=todo.work;

    if(todo.isChecked===true){
        label.classList.add("strike");
    }

    todocheck.onclick=function(){
        strike(li.id,todocheck.id,label.id);
    }

    let delbtn=document.createElement('button');
    delbtn.classList.add("delbtn");
    let del=document.createElement("i");
    del.classList.add("fa", "fa-trash")
    delbtn.appendChild(del);

    
    delbtn.onclick=function(){
        remove(li.id);
    }


    div1.appendChild(label);
    div1.appendChild(delbtn);

    li.appendChild(todocheck);
    li.appendChild(div1);

    itemsbody.appendChild(li);
}

function add(){
    if(inp.value === ""){
        alert("Enter your Task!");
        return;
    }
    save.textContent="Save";
    save.classList.add("savebtn");
    putsav.appendChild(save);
    cnt+=1;
    let todo = {
        work:inp.value,
        unqid:cnt,
        isChecked:false,
    }
    list.push(todo);
    create(todo);
    inp.value="";


}

save.onclick=function(){
    localStorage.setItem("task",JSON.stringify(list));
    alert("Saved Successfully");
}