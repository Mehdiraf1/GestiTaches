    import {addTaskToTable} from './tasks.js'

    // Fonction pour récupérer les suggestions de tâches depuis l'API JSONPlaceholder 
    export function fetchTask(table) {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
            .then(response => response.json())
            .then(data => {
                data.forEach(task => {
                    
                    if (task.completed == true) {
                        task.status = "Fini";
                    } else {
                        task.status = "En cours";
                    }
                    
                    addTaskToTable(table, task.title, task.status);

                });
            })
            .catch(error => console.error('Erreur lors de la récupération des tâches suggérées:', error));
    }
