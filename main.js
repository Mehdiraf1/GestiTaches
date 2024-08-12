import {savetask, loadtask, addTaskToTable} from './tasks.js';
import {fetchTask} from './api.js';

window.onload = function () {

    var monForm = document.getElementById("taskForm");
    var tasktable = document.getElementById("TaskList");
    var name = document.getElementById("name");
    var status = document.getElementById("status");
    
    /* Ajout d'une tâche avec le form */
    monForm.onsubmit = function (e) {

        e.preventDefault();
        
        if (name.value != "") {

            // Ajouter la tâche du formulaire
            addTaskToTable(tasktable, name.value, status.value);

            // Sauvegarder dans localStorage
            savetask(tasktable);

            // Rénitialise les champs du formulaire
            monForm.reset();

        } else {
            alert(`Champ "Nom de la tâche" vide`)
        }
    }

    /* Chargement des éléments du tableau */
    loadtask(tasktable); // Charger les données depuis localStorage
       
    // Vérifiez si les tâches de l'API ont déjà été chargées
    if (!localStorage.getItem("apiTasksLoaded")) {
        fetchTask(tasktable); // Charger les tâches depuis l'API JSONPlaceholder
        localStorage.setItem("apiTasksLoaded", "true");
    }
}
