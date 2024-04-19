window.onload=()=>{
    const buttonSwitch = document.querySelector(".switch");
    const buttonSwitch_2 = document.querySelector(".switch_2");
    const producto = document.querySelector(".producto")
    const descripcion = document.querySelector(".descripcion_producto")
    buttonSwitch.onclick=()=>{
        console.log("llego click!")
        document.body.classList.toggle("dark");
        buttonSwitch.classList.toggle("active");
        producto.classList.toggle("dark");
        descripcion.classList.toggle("dark");
    }
    buttonSwitch_2.onclick=()=>{
        console.log("llego click 2!")
        document.body.classList.toggle("dark");
        buttonSwitch_2.classList.toggle("active")
        producto.classList.toggle("dark");
        descripcion.classList.toggle("dark");
    }
}