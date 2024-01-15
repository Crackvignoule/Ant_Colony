class Model {
    constructor() {
    // TODO Changer les chiffres par des objets ex: emptycell, tree, ant, shadow, etc.
      this.grid = [
        [0, 1, 2],
        [0, -1, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];
    }

    // Binding.
    bindDisplayCNF (callback) {
      // Définition d'une nouvelle propriété pouvant être utilisée à partir d'une instance de Model.
      this.DisplayCNF = callback; // On veut pouvoir actualiser la View (depuis le Controller) quand nous récupérons les données.
    }

    getCNF () {
      fetch(this.URL)
        .then(response => response.json())
        .then(response => {
          let text = 'No Chuck Norris Fact found.';
          if (response.value) {
            text = response.value;
          }
          this.DisplayCNF(text);
        })
        .catch(error => {
          console.log("Error : " + error);
        });
    }
  }