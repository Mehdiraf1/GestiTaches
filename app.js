window.onload = function () {

    var monForm = document.getElementById("taskForm");

    var tasktable = document.getElementById("TaskList");
    var name = document.getElementById("name");
    var type = document.getElementById("type");
    var desc = document.getElementById("description");
    

    /*______________________LocalStorage_____________________________*/
    // fonction de sauvegarde dans localStorage
    function savetask() {

        var tasks = []
        for (var i = 1; i < tasktable.rows.length; i++) {

            var task = {
                name: tasktable.rows[i].cells[0].textContent,
                type: tasktable.rows[i].cells[1].textContent,
                description: tasktable.rows[i].cells[2].textContent
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
        };

        tasks.forEach(function(task) {

            var newrow = tasktable.insertRow();

            var taskname = newrow.insertCell(0);
            var tasktype = newrow.insertCell(1);
            var taskdesc = newrow.insertCell(2);
            var taskdelete = newrow.insertCell(3);

            taskname.textContent = task.name;
            tasktype.textContent = task.type;
            taskdesc.textContent = task.description;

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

    }


    // charger les données
    loadtask();

    /*________________________________________________________________*/

    /*___________________________DOM__________________________________*/
    monForm.onsubmit = function (e) {

        e.preventDefault();
        
        if (name.value != "") {

            var newrow = tasktable.insertRow();

            var taskname = newrow.insertCell(0);
            var tasktype = newrow.insertCell(1);
            var taskdesc = newrow.insertCell(2);
            var taskdelete = newrow.insertCell(3);

            taskname.textContent = name.value;
            tasktype.textContent = type.value;
            taskdesc.textContent = desc.value;

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

    

}
