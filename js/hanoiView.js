(function (){
  if (typeof window.Hanoi === "undefined") {
    window.Hanoi = {};
  }

  View = Hanoi.View = function (game, $el) {
    this.$fromTower;
    this.$toTower;
    this.game = game;
    this.display = $el;

    this.render();
    this.bindEvents();
  };

  View.prototype.render = function () {
    var i, j, $li, $tower, $square,
        $grid = $("<ul></ul>");

    $grid.addClass('grid');

    for (i = 0; i < 3; i++) {
      $tower = $('<ul></ul>').addClass("tower");

      for (j = 0; j < 3; j++) {
        $square = $('<li></li>');

        $tower.append($square);
      }

      $grid.append($('<li></li>').append($tower));
      $tower.attr("tower", i);
      $tower.addClass("group");
    }

    this.display.append($grid);

    $firstStack = $(".tower").first().children();

    $firstStack.each(function (id, square) {
      $(square).addClass('stacked');
    });
  };

  View.prototype.bindEvents = function () {
    this.display.find('.grid').on("click", "ul.tower", function (event) {
      if (typeof this.$fromTower === "undefined") {
        this.$fromTower = $(event.currentTarget);

        return;
      } else if (typeof this.$fromTower !== "undefined"){
        this.$toTower = $(event.currentTarget);

        this.makeMove();
      }
    }.bind(this));
  };

  View.prototype.makeMove = function () {
    var fromTowerId = parseInt(this.$fromTower.attr("tower")),
        toTowerId = parseInt(this.$toTower.attr("tower"));

    if (this.game.move(fromTowerId, toTowerId)) {
      this.$fromTower.children().first().toggleClass("stacked");
      this.$toTower.children().first().toggleClass("stacked");
    } else {
      alert("Invalid Move");
    }

    if (this.game.isWon()) {
      this.display.addClass("won");
    }

    this.$fromTower = undefined;
    this.$toTower = undefined;
  };

})();
