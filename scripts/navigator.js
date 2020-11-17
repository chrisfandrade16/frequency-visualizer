let navigator_links = document.querySelectorAll(".navigator-link");

function navigator_handler()
{
    if(location.hash === "#home")
    {
        navigator_links[0].style.setProperty("color", "lightslategray", "important");
        navigator_links[1].style.setProperty("color", "lightgray", "");
        navigator_links[2].style.setProperty("color", "lightgray", "");
        navigator_links[3].style.setProperty("color", "lightgray", "");
    }
    else if(location.hash === "#studio")
    {
        navigator_links[0].style.setProperty("color", "lightgray", "");
        navigator_links[1].style.setProperty("color", "lightslategray", "important");
        navigator_links[2].style.setProperty("color", "lightgray", "");
        navigator_links[3].style.setProperty("color", "lightgray", "");
    }
}

window.onload = navigator_handler;
window.addEventListener("hashchange", navigator_handler);