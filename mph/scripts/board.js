mph.board = (function() {
    var settings,
        mphs,
        cols,
        rows,
        baseScore,
        nummphTypes;

    function randommph() {
        return Math.floor(Math.random() * nummphTypes);
    }

    function getmph(x, y) {
        if (x < 0 || x > cols-1 || y < 0 || y > rows-1) {
            return -1;
        } else {
            return mphs[x][y];
        }
    }
    
    function fillBoard() {
        var x, y,
            type;
        mphs = [];
        for (x = 0; x < cols; x++) {
            mphs[x] = [];
            for (y = 0; y < rows; y++) {
                type = randommph();
                while ((type === getmph(x-1, y) &&
                        type === getmph(x-2, y)) ||
                       (type === getmph(x, y-1) &&
                        type === getmph(x, y-2))) {
                    type = randommph();
                }
                mphs[x][y] = type;
            }
        }
        // recursive fill if new board has no moves
        if (!hasMoves()) {
            fillBoard();
        }
    }
    
    // returns the number mphs in the longest chain
    // that includes (x,y)
    function checkChain(x, y) {
        var type = getmph(x, y),
            left = 0, right = 0,
            down = 0, up = 0;

        // look right
        while (type === getmph(x + right + 1, y)) {
            right++;
        }

        // look left
        while (type === getmph(x - left - 1, y)) {
            left++;
        }

        // look up
        while (type === getmph(x, y + up + 1)) {
            up++;
        }

        // look down
        while (type === getmph(x, y - down - 1)) {
            down++;
        }

        return Math.max(left + 1 + right, up + 1 + down);
    }

    // returns true if (x1,y1) can be swapped with (x2,y2)
    // to form a new match
    function canSwap(x1, y1, x2, y2) {
        var type1 = getmph(x1,y1),
            type2 = getmph(x2,y2),
            chain;

        if (!isAdjacent(x1, y1, x2, y2)) {
            return false;
        }

        // temporarily swap mphs
        mphs[x1][y1] = type2;
        mphs[x2][y2] = type1;

        chain = (checkChain(x2, y2) > 2 
              || checkChain(x1, y1) > 2);

        // swap back
        mphs[x1][y1] = type1;
        mphs[x2][y2] = type2;

        return chain;
    }

    // returns true if (x1,y1) is adjacent to (x2,y2)
    function isAdjacent(x1, y1, x2, y2) {
        var dx = Math.abs(x1 - x2),
            dy = Math.abs(y1 - y2);
        return (dx + dy === 1);
    }
    
    // returns a two-dimensional map of chain-lengths
    function getChains() {
        var x, y,
            chains = [];

        for (x = 0; x < cols; x++) {
            chains[x] = [];
            for (y = 0; y < rows; y++) {
                chains[x][y] = checkChain(x, y);
            }
        }
        return chains;
    }
    
    // creates a copy of the mph board
    function getBoard() {
        var copy = [],
            x;
        for (x = 0; x < cols; x++) {
            copy[x] = mphs[x].slice(0);
        }
        return copy;
    }


    // returns true if at least one match can be made
    function hasMoves() {
        for (var x = 0; x < cols; x++) {
            for (var y = 0; y < rows; y++) {
                if (canmphMove(x, y)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    function check(events) {
        var chains = getChains(), 
            hadChains = false, score = 0,
            removed = [], moved = [], gaps = [];

        for (var x = 0; x < cols; x++) {
            gaps[x] = 0;
            for (var y = rows-1; y >= 0; y--) {
                if (chains[x][y] > 2) {
                    hadChains = true;
                    gaps[x]++;
                    removed.push({
                        x : x, y : y,
                        type : getmph(x, y)
                    });
                    
                    // add points to score
                    score += baseScore
                           * Math.pow(2, (chains[x][y] - 3));

                } else if (gaps[x] > 0) {
                    moved.push({
                        toX : x, toY : y + gaps[x],
                        fromX : x, fromY : y,
                        type : getmph(x, y)
                    });
                    mphs[x][y + gaps[x]] = getmph(x, y);
                }
            }
            
            // fill from top
            for (y = 0; y < gaps[x]; y++) {
                mphs[x][y] = randommph();
                moved.push({
                    toX : x, toY : y,
                    fromX : x, fromY : y - gaps[x],
                    type : mphs[x][y]
                });
            }
        }
        
        events = events || [];

        if (hadChains) {
            events.push({
                type : "remove",
                data : removed
            }, {
                type : "score",
                data : score
            }, {
                type : "move",
                data : moved
            });
            
            // refill if no more moves
            if (!hasMoves()) {
                fillBoard();
                events.push({
                    type : "refill",
                    data : getBoard()
                });
            }

            return check(events);
        } else {
            return events;
        }

    }
    
    // returns true if (x,y) is a valid position and if 
    // the mph at (x,y) can be swapped with a neighbor
    function canmphMove(x, y) {
        return ((x > 0 && canSwap(x, y, x-1 , y)) ||
                (x < cols-1 && canSwap(x, y, x+1 , y)) ||
                (y > 0 && canSwap(x, y, x , y-1)) ||
                (y < rows-1 && canSwap(x, y, x , y+1)));
    }

    // if possible, swaps (x1,y1) and (x2,y2) and
    // calls the callback function with list of board events
    function swap(x1, y1, x2, y2, callback) {
        var tmp, swap1, swap2,
            events = [];
        swap1 = {
            type : "move",
            data : [{
                type : getmph(x1, y1),
                fromX : x1, fromY : y1, toX : x2, toY : y2
            },{
                type : getmph(x2, y2),
                fromX : x2, fromY : y2, toX : x1, toY : y1
            }]
        };
        swap2 = {
            type : "move",
            data : [{
                type : getmph(x2, y2),
                fromX : x1, fromY : y1, toX : x2, toY : y2
            },{
                type : getmph(x1, y1),
                fromX : x2, fromY : y2, toX : x1, toY : y1
            }]
        };
        if (isAdjacent(x1, y1, x2, y2)) {
            events.push(swap1);
            if (canSwap(x1, y1, x2, y2)) {
                tmp = getmph(x1, y1);
                mphs[x1][y1] = getmph(x2, y2);
                mphs[x2][y2] = tmp;
                events = events.concat(check());
            } else {
                events.push(swap2, {type : "badswap"});
            }
            callback(events);
        }
    }
    
    
    function initialize(startmphs, callback) {
        settings = mph.settings
        nummphTypes = settings.nummphTypes,
        baseScore = settings.baseScore,
        cols = settings.cols;
        rows = settings.rows;
        if (startmphs) {
            mphs = startmphs;
        } else {
            fillBoard();
        }
        callback();
    }

   
    function print() {
        var str = "";
        for (var y = 0; y < rows; y++) {
            for (var x = 0; x < cols; x++) {
                str += getmph(x, y) + " ";
            }
            str += "\r\n";
        }
        console.log(str);
    }

    return {
        initialize : initialize,
        swap : swap,
        canSwap : canSwap,
        getBoard : getBoard,
        print : print
    };

})();
