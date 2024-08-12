window.onload = function () {

    var monForm = document.getElementById("taskForm");

    var tasktable = document.getElementById("TaskList");
    var name = document.getElementById("name");
    var status = document.getElementById("status");
    

    /*______________________LocalStorage_____________________________*/
    // fonction de sauvegarde dans localStorage
    function savetask() {

        var tasks = []
        for (var i = 1; i < tasktable.rows.length; i++) {

            var task = {
                name: tasktable.rows[i].cells[0].textContent,
                status: tasktable.rows[i].cells[1].textContent,
            };

            tasks.push(task);
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }


    // fonction de chargement de données depuis localStorage
    function loadtask() {

        var tasks = JSON.parse(localStorage.getItem("tasks"));
        
        if (tasks == null) {
            tasks = []
        }
        
        if (tasks.length > 0) {

            tasks.forEach(function(task) {

                var newrow = tasktable.insertRow();

                var taskname = newrow.insertCell(0);
                var taskstatus = newrow.insertCell(1);
                var taskdelete = newrow.insertCell(2);

                taskname.textContent = task.name;
                taskstatus.textContent = task.status;


                var deleteButton = document.createElement("button"); // Créer un élement html <button>
                deleteButton.type = "button";
                deleteButton.textContent = "Supprimer";
                deleteButton.addEventListener("click", function() {
                    var ligne = this.parentNode.parentNode; 
                    ligne.parentNode.removeChild(ligne); 
                    savetask();
                });

            taskdelete.appendChild(deleteButton);
            });
        };
    }

    /*________________________________________________________________*/

    // fonction pour ajouter la tâche récupérée depuis l'API
    function addTaskToTable(name, status) {
        
        var newrow = tasktable.insertRow();

        var taskname = newrow.insertCell(0);
        var taskstatus = newrow.insertCell(1);
        var taskdelete = newrow.insertCell(2);

        taskname.textContent = name;
        taskstatus.textContent = status;


        var deleteButton = document.createElement("button"); // Créer un élement html <button>
        deleteButton.type = "button";
        deleteButton.textContent = "Supprimer";
        deleteButton.addEventListener("click", function() {
            var ligne = this.parentNode.parentNode; 
            ligne.parentNode.removeChild(ligne); 
            savetask();
        });

            taskdelete.appendChild(deleteButton);
    };

    // Fonction pour récupérer les suggestions de tâches depuis l'API JSONPlaceholder 
    function fetchTask() {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
            .then(response => response.json())
            .then(data => {
                data.forEach(task => {
                    
                    if (task.completed == true) {
                        task.status = "Fini";
                    } else {
                        task.status = "En cours";
                    }
                    
                    addTaskToTable(task.title, task.status);
                    
                });
            })
            .catch(error => console.error('Erreur lors de la récupération des tâches suggérées:', error));
    }

    /*___________________________DOM__________________________________*/
    monForm.onsubmit = function (e) {

        e.preventDefault();
        
        if (name.value != "") {

            var newrow = tasktable.insertRow();

            var taskname = newrow.insertCell(0);
            var taskstatus = newrow.insertCell(1);
            var taskdelete = newrow.insertCell(2);

            taskname.textContent = name.value;
            taskstatus.textContent = status.value;

            // Création d'un bouton supprimer

            var deleteButton = document.createElement("button"); // Créer un élement html <button>
            deleteButton.type = "button";
            deleteButton.textContent = "Supprimer";
            deleteButton.addEventListener("click", function() {
                var ligne = this.parentNode.parentNode; // ligne = <tr> qui contient notre bouton
                ligne.parentNode.removeChild(ligne); // ligne.parentNode = <tbody>
                savetask(); // sauvegarder dans localStorage après suppression
            });

            // Ajouter le bouton à notre cellule
            taskdelete.appendChild(deleteButton);

            // Sauvegarder dans localStorage
            savetask();

            // Rénitialise les champs du formulaire
            monForm.reset();

        } else {

            alert(`Champ "Nom de la tâche" vide`)
        
        }
    }
    /*_______________________________________________________________*/

    

    /*________________Chargement des éléments du tableau_____________*/
    // Charger les données depuis localStorage
    loadtask();
    // Charger les tâches depuis l'API JSONPlaceholder
    fetchTask();
    /*______________________________________________________________*/
}
