let monto = document.getElementById('monto');
let tiempo = document.getElementById('tiempo');
let interes = document.getElementById('interes');
let btnCalcular = document.getElementById('btnCalcular');
let llenarTabla = document.querySelector('#lista-tabla tbody');


btnCalcular.addEventListener('click', () => {
    calcularCuota(monto.value, interes.value, tiempo.value);
})


function calcularCuota(monto, interes, tiempo){

    if(monto>0&&interes>0&&tiempo>0){

    while(llenarTabla.firstChild){
        llenarTabla.removeChild(llenarTabla.firstChild);
    }

    let ncuota = [];
    let fechas = [];
    let fechaActual = Date.now();
    let mes_actual = moment(fechaActual);
    mes_actual.add(1, 'month');    

    let pagoInteres=0, pagoCapital = 0, cuota = 0;

    cuota = monto * (Math.pow(1+interes/100, tiempo)*interes/100)/(Math.pow(1+interes/100, tiempo)-1);

    for(let i = 1; i <= tiempo; i++) {

        ncuota[i]= i;
        pagoInteres = parseFloat(monto*(interes/100));
        pagoCapital = cuota - pagoInteres;
        monto = parseFloat(monto-pagoCapital);

        //Formato fechas
        fechas[i] = mes_actual.format('DD-MM-YYYY');
        mes_actual.add(1, 'month');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ncuota[i]}</td>
            <td>${fechas[i]}</td>
            <td>${cuota.toFixed(2)}</td>
            <td>${pagoCapital.toFixed(2)}</td>
            <td>${pagoInteres.toFixed(2)}</td>
            <td>${monto.toFixed(2)}</td>
        `;
        llenarTabla.appendChild(row)
    }
}else{
    alert("Faltan ingresar Datos");
}
}



//Modo oscuro-claro
let modo=localStorage.getItem("modo") || "light";//asignacion condicional
console.log(modo);

let principal=document.getElementById("principal");
let boton=document.getElementById("mode");
document.body.className=modo;
principal.className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center "+modo;
localStorage.setItem("modo",modo);

boton.onclick=()=>{
    if(modo=="light"){
        document.body.className="dark";
        principal.className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center dark";
        modo="dark";
        boton.innerText="Light Mode";
    }else{
        document.body.className="light";
        principal.className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center light";
        modo="light";
        boton.innerText="Dark Mode";
    }
    localStorage.setItem("modo",modo);
}




btnCalcular.addEventListener('click', () => {
   
    Toastify({
        text: "Prestamo Simulado!",
        duration: 3000
    }).showToast();
})


//Dolar

const url= 'https://www.dolarsi.com/api/api.php?type=valoresprincipales'

fetch(url)

.then(response => response.json())

.then(data=> {


let dolaroficial= document.getElementById('mostrardolaroficial')
dolaroficial.innerHTML= `
<p>${data[0].casa.nombre}</p>
<p>Compra: $${data[0].casa.compra}</p>
<p>Venta: $${data[0].casa.venta}</p>
`;

let dolarblue= document.getElementById('mostrardolarblue')
dolarblue.innerHTML= `
<p>${data[1].casa.nombre}</p>
<p>Compra: $${data[1].casa.compra}</p>
<p>Venta: $${data[1].casa.venta}</p>
`;

})





// .then(data=> {console.log(data[1].casa.compra)})
