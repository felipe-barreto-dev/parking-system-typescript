interface Vehicle {
    name: string,
    licensePlate: string,
    created_at: Date
}

(function () {

    const $ = (query: string): HTMLInputElement | null => document.querySelector(query);

    function parking() {

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
                    <button class="delete" data-license-plate="${vehicle.licensePlate}">X</button>
                </th>
            `;

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
            created_at: new Date()
        }

        parking().fillParkingSpace(vehicle, true)
    });

})();