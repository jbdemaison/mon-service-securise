Array.prototype.supprimeItem = function (itemASupprimer) {
  const index = this.findIndex(function (item) { return item === itemASupprimer; });
  this.splice(index, 1);
};

Array.prototype.supprimeItemAvecId = function (id) {
  const index = this.findIndex(function (item) { return item.id === id; });
  if (index >= 0) this.splice(index, 1);
};
