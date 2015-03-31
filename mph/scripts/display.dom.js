mph.display = (function() {
    var dom = mph.dom,
        $ = dom.$,
        cols, rows,
        mphSize,
        firstRun = true,
        mphSprites;

    function createBackground() {
        var x, y, cell,
            background = document.createElement("div");
        for (x=0;x<cols;x++) {
            for (y=0;y<cols;y++) {
                if ((x+y) % 2) {
                    cell = document.createElement("div");
                    cell.style.left = x + "em";
                    cell.style.top = y + "em";
                    background.appendChild(cell);
                }
            }
        }
        dom.addClass(background, "board-bg");
        return background;
    }

    function setup() {
        var boardElement = $("#game-screen .game-board")[0],
            container = document.createElement("div"),
            sprite,
            x, y;

        cols = mph.settings.cols;
        rows = mph.settings.rows;
        mphSize = mph.settings.mphSize;
        mphSprites = [];

        for (x=0;x<cols;x++) {
            mphSprites[x] = [];
            for (y=0;y<cols;y++) {
                sprite = document.createElement("div");
                dom.addClass(sprite, "mph");
                sprite.style.left = x + "em";
                sprite.style.top = y + "em";
                sprite.style.backgroundImage =
                    "url(images/mphs" + mphSize + ".png)";
                sprite.style.backgroundSize =
                     (mph.settings.nummphTypes * 100) + "%";
                mphSprites[x][y] = sprite;
                container.appendChild(sprite);
            }
        }
        dom.addClass(container, "dom-container");
        boardElement.appendChild(container);
        boardElement.appendChild(createBackground());
    }

    function initialize(callback) {
        if (firstRun) {
            setup();
            firstRun = false;
        }
        callback();
    }

    function drawmph(type, x, y) {
        var sprite = mphSprites[x][y];
        sprite.style.backgroundPosition = type + "em 0em";
        sprite.style.display = "block";
    }

    function redraw(mphs, callback) {
        var x, y;
        for (x = 0; x < cols; x++) {
            for (y = 0; y < rows; y++) {
                drawmph(mphs[x][y], x, y, 0, 0)
            }
        }
        callback();
    }

    return {
        initialize : initialize,
        redraw : redraw
    };
})();
