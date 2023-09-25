/**
 * For usage, visit Chart.js docs https://www.chartjs.org/docs/latest/
 */
// Llamada a la API para obtener las edades de los empleados
axios.get('http://localhost:8080/api/edades-empleados')
    .then(response => {
        const edades = response.data;

        
        const edadesProcesadas = edades.map(edad => {
            
            return edad; 
        });

        // Generar colores aleatorios
        const backgroundColors = edadesProcesadas.map(() => generateRandomColor());
        console.log(edadesProcesadas)
        const pieConfig = {

            type: 'doughnut',
            data: {
                datasets: [{
                    data: edadesProcesadas,
                    backgroundColor: backgroundColors,
                    label: 'Dataset 1',
                }],
                labels: ['edad','edad','edad','edad'], // Puedes etiquetar las edades de acuerdo a tu contexto
            },
            options: {
                responsive: true,
                cutoutPercentage: 80,
                legend: {
                    display: false,
                },
            },
        };


        const pieCtx = document.getElementById('pie')
        window.myPie = new Chart(pieCtx, pieConfig)
    })
    .catch(error => console.error('Error fetching edades-empleados:', error));

/**
 * Limitar el foco a los elementos enfocables dentro de `element`.
 * @param {Ninguno}   
 * @return {color -> hex} Color en formato hex 
 */
function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



