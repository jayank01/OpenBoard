let canvasBoard = document.querySelector("canvas");
let options = document.querySelector(".options");
let options_flag = true; 
let toolbar = document.querySelector(".toolbar");
let body = document.querySelector("body");
canvasBoard.height = window.innerWidth;
canvasBoard.width = window.innerWidth;
let tool = canvasBoard.getContext("2d");
tool.strokeStyle = "black";
let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let rectangle = document.querySelector("#rectangle");
let line = document.querySelector("#line");
let btn = document.querySelector("#sticky");
let size_opt = document.querySelectorAll(".size-box");
let red = document.querySelector(".red");
let blue = document.querySelector(".blue");
let green = document.querySelector(".green");
let size_box = document.querySelectorAll(".size-box");
let sizes = ["size1", "size2", "size3", "size4"];
let p_sz = 5;
let e_sz = 5;
let r_sz = 5;
let l_sz = 5;

let def = null;
let iX, iY, fX, fY;
let Top = canvasBoard.getBoundingClientRect().top;
let Left = canvasBoard.getBoundingClientRect().left;

options.addEventListener("click", function (e) {
    options_flag = !options_flag;
    let icon = options.children[0];
    if( options_flag ) {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
        toolbar.style.display = "flex";
    }else {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
        toolbar.style.display = "none";
    }
});

pencil.addEventListener("click", function (e) {
    if (def == "pencil") {
        size_opt[2].style.display = "flex";
    } else {
        for (let i = 0; i < size_opt.length; i++) {
            size_opt[i].style.display = "none";
        }
        def = "pencil";
        tool.strokeStyle = "black";
        tool.lineWidth = p_sz;
        let flag = false;
        body.addEventListener("mousedown", function (e) {
            flag = true;
            tool.beginPath();
            tool.moveTo(e.clientX - Left, e.clientY - Top);
        });
        body.addEventListener("mouseup", function (e) {
            flag = false;
        });
        body.addEventListener("mousemove", function (e) {
            if (!flag) {
                return;
            }
            console.log( flag );
            fX = e.clientX - Left;
            fY = e.clientY - Top;
            if (def != "pencil") return;
            tool.beginPath();
            tool.moveTo(iX, iY);
            tool.lineTo(fX, fY);
            tool.stroke();
            iX = fX;
            iY = fY;
        });
    }
});

eraser.addEventListener("click", function (e) {
    if (def == "eraser") {
        size_opt[3].style.display = "flex";
    } else {
        for (let i = 0; i < size_opt.length; i++) {
            size_opt[i].style.display = "none";
        }
        def = "eraser";
        tool.strokeStyle = "white";
        tool.lineWidth = e_sz;
        let flag = false;
        body.addEventListener("mousedown", function (e) {
            flag = true;
            tool.beginPath();
            tool.moveTo(e.clientX - Left, e.clientY - Top);
        });
        body.addEventListener("mouseup", function (e) {
            flag = false;
        });
        body.addEventListener("mousemove", function (e) {
            if (flag == false) {
                return;
            }
            fX = e.clientX - Left;
            fY = e.clientY - Top;
            if (def != "eraser") return;
            tool.beginPath();
            tool.moveTo(iX, iY);
            tool.lineTo(fX, fY);
            tool.stroke();
            iX = fX;
            iY = fY;
        });
    }
});

rectangle.addEventListener("click", function (e) {
    if (def == "rectangle") {
        size_opt[1].style.display = "flex";
    } else {
        for (let i = 0; i < size_opt.length; i++) {
            size_opt[i].style.display = "none";
        }
        def = "rectangle";
        tool.strokeStyle = "black";
        tool.lineWidth = r_sz;
        body.addEventListener("mousedown", function (e) {
            iX = e.clientX - Left;
            iY = e.clientY - Top;
        });
        body.addEventListener("mouseup", function (e) {
            fX = e.clientX - Left;
            fY = e.clientY - Top;
            let height = fY - iY;
            let width = fX - iX;
            if (def != "rectangle") return;
            tool.strokeRect(iX, iY, width, height);
        });
    }
});

line.addEventListener("click", function (e) {
    if (def == "line") {
        size_opt[0].style.display = "flex";
    } else {
        for (let i = 0; i < size_opt.length; i++) {
            size_opt[i].style.display = "none";
        }
        def = "line";
        tool.strokeStyle = "black";
        tool.lineWidth = l_sz;
        body.addEventListener("mousedown", function (e) {
            iX = e.clientX - Left;
            iY = e.clientY - Top;
        });
        body.addEventListener("mouseup", function (e) {
            fX = e.clientX - Left;
            fY = e.clientY - Top;
            if (def != "line") return;
            tool.beginPath();
            tool.moveTo(iX, iY);
            tool.lineTo(fX, fY);
            tool.stroke();
        });
    }
});

red.addEventListener("click", function () {
    defC = "lightpink";
    tool.strokeStyle = defC;
});
blue.addEventListener("click", function () {
    defC = "lightblue";
    tool.strokeStyle = defC;
});
green.addEventListener("click", function () {
    defC = "lightgreen";
    tool.strokeStyle = defC;
});

size_box[0].addEventListener("click", function (e) {
    let sz = e.target.classList[1];
    let test = sizes.includes(sz);
    if (test) {
        if (sz == "size1") {
            p_sz = 5;
        } else if (sz == "size2") {
            p_sz = 10;
        } else if (sz == "size3") {
            p_sz = 15;
        } else if (sz == "size4") {
            p_sz = 20;
        }
    }
    tool.lineWidth = p_sz;
});

size_box[1].addEventListener("click", function (e) {
    let sz = e.target.classList[1];
    let test = sizes.includes(sz);
    if (test) {
        if (sz == "size1") {
            e_sz = 5;
        } else if (sz == "size2") {
            e_sz = 10;
        } else if (sz == "size3") {
            e_sz = 15;
        } else if (sz == "size4") {
            e_sz = 20;
        }
    }
    tool.lineWidth = e_sz;
});

size_box[2].addEventListener("click", function (e) {
    let sz = e.target.classList[1];
    let test = sizes.includes(sz);
    if (test) {
        if (sz == "size1") {
            r_sz = 5;
        } else if (sz == "size2") {
            r_sz = 10;
        } else if (sz == "size3") {
            r_sz = 15;
        } else if (sz == "size4") {
            r_sz = 20;
        }
    }
    tool.lineWidth = r_sz;
});

size_box[3].addEventListener("click", function (e) {
    let sz = e.target.classList[1];
    let test = sizes.includes(sz);
    if (test) {
        if (sz == "size1") {
            l_sz = 5;
        } else if (sz == "size2") {
            l_sz = 10;
        } else if (sz == "size3") {
            l_sz = 15;
        } else if (sz == "size4") {
            l_sz = 20;
        }
    }
    tool.lineWidth = l_sz;
});

btn.addEventListener("click", function (e) {
    def = null;
    let sticky = document.createElement("div");
    sticky.setAttribute("class", "sticky");
    sticky.innerHTML = `<div class="nav-bar">
        <div class="minimize"></div>
        <div class="close"></div>
    </div>
    <textarea name="" class="textarea"></textarea>`;
    document.body.appendChild(sticky);

    sticky.onmousedown = function (event) {

        let shiftX = event.clientX - sticky.getBoundingClientRect().left;
        let shiftY = event.clientY - sticky.getBoundingClientRect().top;

        sticky.style.position = 'absolute';
        sticky.style.zIndex = 1000;

        moveAt(event.pageX, event.pageY);

        // moves the ball at (pageX, pageY) coordinates
        // taking initial shifts into account
        function moveAt(pageX, pageY) {
            sticky.style.left = pageX - shiftX + 'px';
            sticky.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        // move the ball on mousemove
        document.addEventListener('mousemove', onMouseMove);

        // drop the ball, remove unneeded handlers
        sticky.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            sticky.onmouseup = null;
        };

    };

    sticky.ondragstart = function () {
        return false;
    };

    let minimize = sticky.querySelector(".minimize");
    let textarea = sticky.querySelector(".textarea");
    let flag = false;
    minimize.addEventListener("click", function (e) {
        if (!flag) {
            textarea.style.display = "none";
        } else {
            textarea.style.display = "flex";
        }
        flag = !flag;
    });

    let close = sticky.querySelector(".close");
    close.addEventListener("click", function (e) {
        sticky.remove();
    });
});
