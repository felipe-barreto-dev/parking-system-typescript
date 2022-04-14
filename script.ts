interface Vehicle {
    name: string,
    licensePlate: string,
    created_at: Date | string
}

(function () {

    const $ = (query: string): HTMLInputElement | null => document.querySelector(query);

    function calcParkedTime(time: number): string {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);

        return `${minutes}m e ${seconds}s`;
    }

    function parking() {

        //Remove vehicle from filled parking space
        function removeVehicle(licensePlate: string) {
            const vehicleToRemove = readParkingSpacesFilled().find(vehicle => vehicle.licensePlate === licensePlate);

            const now = new Date();
            const parkedTime = calcParkedTime(now.getTime() - new Date(vehicleToRemove.created_at).getTime());

            if (confirm(`O veículo permaneceu por ${parkedTime}. Deseja encerrar?`)) {
                saveFilledParkingSpace(readParkingSpacesFilled().filter((vehicle) => vehicle.licensePlate !== licensePlate))
                renderFilledParkingSpaces()
            } else {
                return;
            }
        }

        //Render the filled parking spaces saved on the localStorage in the table
        function renderFilledParkingSpaces() {
            $("#parking")!.innerHTML = "";

            const parking = readParkingSpacesFilled();

            if (parking.length <= 0) {
                return
            } else {
                parking.forEach((vehicle) => {
                    fillParkingSpace(vehicle)
                });
            }
        }

        //Read the parking spaces filled saved on the localStorage
        function readParkingSpacesFilled(): Vehicle[] {
            return localStorage.parking ? JSON.parse(localStorage.parking) : [];
        };

        //Save the vehicle on the localStorage
        function saveFilledParkingSpace(vehicles: Vehicle[]) {
            localStorage.setItem("parking", JSON.stringify(vehicles));
        };

        //Fill parking space with the vehicle sent for parameter
        function fillParkingSpace(vehicle: Vehicle, save?: boolean) {
            const row = document.createElement("tr");

            row.innerHTML = `
                <th>${vehicle.name}</th>
                <th>${vehicle.licensePlate}</th>
                <th>${vehicle.created_at}</th>
                <th>
                    <button class="delete" data-plate="${vehicle.licensePlate}">X</button>
                </th>
            `;

            row.querySelector(".delete")?.addEventListener("click", function(){
                removeVehicle(this.dataset.plate)
            })

            $("#parking")?.appendChild(row);

            if (save) saveFilledParkingSpace([...readParkingSpacesFilled(), vehicle]);
            
        }
        
        return {fillParkingSpace, readParkingSpacesFilled, saveFilledParkingSpace, renderFilledParkingSpaces} 

    };

    parking().renderFilledParkingSpaces();

    $("#register")?.addEventListener("click", () => {
        const name = $("#name")?.value;
        const licensePlate = $("#licensePlate")?.value;

        if (!name || !licensePlate) {
            alert("Os campos de nome e placa são obrigatórios");
            return
        } 

        const vehicle = {
            name,
            licensePlate,
            created_at: new Date().toISOString()
        }

        parking().fillParkingSpace(vehicle, true)
    });

})();