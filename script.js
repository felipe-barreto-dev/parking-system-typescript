"use strict";
(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function parking() {
        //Render the filled parking spaces saved on the localStorage in the table
        function renderFilledParkingSpaces() {
            $("#parking").innerHTML = "";
            const parking = readParkingSpacesFilled();
            if (parking.length <= 0) {
                return;
            }
            else {
                parking.forEach((vehicle) => {
                    fillParkingSpace(vehicle);
                });
            }
        }
        //Read the parking spaces filled saved on the localStorage
        function readParkingSpacesFilled() {
            return localStorage.parking ? JSON.parse(localStorage.parking) : [];
        }
        ;
        //Save the vehicle on the localStorage
        function saveFilledParkingSpace(vehicles) {
            localStorage.setItem("parking", JSON.stringify(vehicles));
        }
        ;
        //Fill parking space with the vehicle sent for parameter
        function fillParkingSpace(vehicle, save) {
            var _a;
            const row = document.createElement("tr");
            row.innerHTML = `
                <th>${vehicle.name}</th>
                <th>${vehicle.licensePlate}</th>
                <th>${vehicle.created_at}</th>
                <th>
                    <button class="delete" data-license-plate="${vehicle.licensePlate}">X</button>
                </th>
            `;
            (_a = $("#parking")) === null || _a === void 0 ? void 0 : _a.appendChild(row);
            if (save)
                saveFilledParkingSpace([...readParkingSpacesFilled(), vehicle]);
        }
        return { fillParkingSpace, readParkingSpacesFilled, saveFilledParkingSpace, renderFilledParkingSpaces };
    }
    ;
    parking().renderFilledParkingSpaces();
    (_a = $("#register")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const name = (_a = $("#name")) === null || _a === void 0 ? void 0 : _a.value;
        const licensePlate = (_b = $("#licensePlate")) === null || _b === void 0 ? void 0 : _b.value;
        if (!name || !licensePlate) {
            alert("Os campos de nome e placa são obrigatórios");
            return;
        }
        const vehicle = {
            name,
            licensePlate,
            created_at: new Date()
        };
        parking().fillParkingSpace(vehicle, true);
    });
})();
