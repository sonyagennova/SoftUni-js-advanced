import { login } from "./login.js";

let main = document.querySelector("main");
let nav = document.querySelector("nav");

export let guests = document.querySelector(".guest");
export let loggedInUsers = document.querySelector(".user");

loggedInUsers.innerHTML = "";

export let pages = {
    home: document.getElementById("home"),
    dashboard: document.getElementById("dashboard"),
    add: document.getElementById("create"),
    login: document.getElementById("login"),
    register: document.getElementById("register")
};

nav.addEventListener("click", (e) => {
    if(e.target.tagName == "A"){
        e.preventDefault();
        let address = e.target.href;

        let url = new URL(address);

        console.log(url.pathname);

        if(url.pathname == "/"){
            let path = location.pathname;
            main.innerHTML = "";
            history.pushState({}, '', path);
            main.appendChild(pages.home);
        }

        if(url.pathname == "/facts"){
            main.innerHTML = "";
            main.appendChild(pages.dashboard);

            history.pushState({}, '', url.pathname);
            //console.log(displayShoes())
            //displayShoes();
        } else if(url.pathname == "/add"){
            main.innerHTML = "";
            main.appendChild(pages.addPair);
            history.pushState({}, '', url.pathname);
        } else if(url.pathname == "/login"){
            main.innerHTML = "";
            main.appendChild(pages.login);
            history.pushState({}, '', url.pathname);

            let form = pages.login.querySelector("form");
            form.removeEventListener("submit", login);
            form.addEventListener("submit", login);

            let a = form.querySelector("a");
            a.removeEventListener("click", (e) => { e.preventDefault(); main.innerHTML = ""; main.appendChild(pages.register) });
            a.addEventListener("click", (e) => { e.preventDefault(); main.innerHTML = ""; main.appendChild(pages.register) });

        } else if(url.pathname == "/register"){
            main.innerHTML = "";
            main.appendChild(pages.register);
            history.pushState({}, '', url.pathname);

            let form = pages.register.querySelector("form");
            form.removeEventListener("submit", register);
            form.addEventListener("submit", register);

            let a = form.querySelector("a");
            a.removeEventListener("click", (e) => { e.preventDefault(); main.innerHTML = ""; main.appendChild(pages.login) });
            a.addEventListener("click", (e) => { e.preventDefault(); main.innerHTML = ""; main.appendChild(pages.login) });
        } else if(url.pathname == "/logout"){
            history.pushState({}, '', url.pathname);
            logout();
        }
    }
})

document.getElementById("logo").addEventListener("click", (e) => {
    e.preventDefault();
    history.pushState({}, '', "/");
    main.innerHTML = "";
    main.appendChild(pages.home);
})

main.innerHTML = "";
main.appendChild(pages.home);