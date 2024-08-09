window.onload = function () {

    var monForm = document.getElementById("taskForm");

    var tasktable = document.getElementById("TaskList");
    var name = document.getElementById("name");
    var type = document.getElementById("type");
    var desc = document.getElementById("description");

    monForm.onsubmit = function (e) {

        e.preventDefault();
        
        if (name.value != "") {

            var newrow = tasktable.insertRow();

            var taskname = newrow.insertCell(0);
            var tasktype = newrow.insertCell(1);
            var taskdesc = newrow.insertCell(2);

            taskname.textContent = name.value;
            tasktype.textContent = type.value;
            taskdesc.textContent = desc.value;

            // Rénitialise les champs du formulaire
            monForm.reset();

        } else {

            alert(`Champ "Nom de la tâche" vide`)
        
        }
    }
}
