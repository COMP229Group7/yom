// IIFE - Immediately Invoked Function Expression
(function (){

    function Start() {
        console.log("Application started..!");

        let deleteButtons = document.querySelectorAll('.btn-danger');

        for (button of deleteButtons) {
            button.addEventListener('click', (event) => {
                if (!confirm("Are you sure to delete?")) {
                    event.preventDefault();
                    window.location.assign('/users');
                }
            });
        }
    }
    window.addEventListener("load", Start);
}());