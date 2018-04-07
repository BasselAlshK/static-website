const setDatePlaceHoler = () => {
    const dateNow = new Date();
    const yearNow = dateNow.getFullYear();
    const datePlaceholer = document.getElementById('datePlaceholer');
    datePlaceholer.innerHTML = yearNow.toString();
}

const documentReady = () => {
    setDatePlaceHoler();
};

if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
    documentReady();
} else {
    document.addEventListener("DOMContentLoaded", documentReady);
}

