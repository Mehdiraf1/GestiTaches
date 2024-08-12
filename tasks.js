    // fonction de sauvegarde dans localStorage
    export function savetask(table) {
        
        var tasks = []
        for (var i = 1; i < table.rows.length; i++) {

            var task = {
                name: table.rows[i].cells[0].textContent,
                status: table.rows[i].cells[1].textContent,
            };

            tasks.push(task);
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // fonction de chargement de données depuis localStorage
    export function loadtask(table) {

        var tasks = JSON.parse(localStorage.getItem("tasks"));
        
        if (tasks == null) {
            tasks = []
        }
        
        if (tasks.length > 0) {

            tasks.forEach(function(task) {
                addTaskToTable(table, task.name, task.status);
            });

        };
    };

    // fonction pour ajouter la tâche récupérée depuis l'API
    export function addTaskToTable(table, name, status) {
    
        var newrow = table.insertRow();

        var taskname = newrow.insertCell(0);
        var taskstatus = newrow.insertCell(1);
        var taskdelete = newrow.insertCell(2);

        taskname.textContent = name;
        taskstatus.textContent = status;

        // Création d'un bouton supprimer

        var deleteButton = document.createElement("button"); // Créer un élement html <button>
        deleteButton.type = "button";
        deleteButton.textContent = "Supprimer";
        deleteButton.addEventListener("click", function() {
            var ligne = this.parentNode.parentNode; // ligne = <tr> qui contient notre bouton
            ligne.parentNode.removeChild(ligne); // ligne.parentNode = <tbody>
            savetask(table); // sauvegarder dans localStorage après suppression
        });

        // Ajouter le bouton à notre cellule
        taskdelete.appendChild(deleteButton);

    };