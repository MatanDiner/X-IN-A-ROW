player = Math.floor(Math.random() * 2) // choose the first player
movingFlag = false;//prevent to renew the game with new number after choosing a number already

cellHeight = 70;
h = false;
counter_col_red = 0;
counter_col_yellow = 0;
counter_row_red = 0;
counter_row_yellow = 0;
cellWidth = 100;
prevent_move = 0;
id_yellow = 0;
id_red = 0;


function cell(_id, _color) {
    this.id = _id;
    this.color = _color;

}


function initializeArray(num) {
    arrcell = new Array(num);
    for (k = 0; k < num; k++) {
        arrcell[k] = new Array(num);
        for (t = 0; t < num; t++) {
            arrcell[k][t] = new cell(0, " ");
        }
    }
}

function findEmpty(col) {
    for (var i = num1 - 1; i >= 0; i--) {
        if (arrcell[col][i].id == 0) {
            arrcell[col][i].id = 1;
            if (player == 0)
                arrcell[col][i].color = "red";
            else
                arrcell[col][i].color = "yellow";

            return i + 1;
        }
    }
}


function buildTable(num, seq) {
    str = "<table id='tbl_id'>";
    for (var i = 0; i < num; i++) {
        str += "<tr>";
        for (var j = 0; j < num; j++) {
            str += "<td id='ij'  onclick='pos(" + j + ")'>";
            //str += " <img id='blue' src='imeg/תמונה3.png' />";
            str += "</td>";
        }
        str += "</tr>";
    }
    str += "</table>";
    r = document.getElementById("ph");

    r.innerHTML = str;
    tableArr = document.getElementsByTagName('td');
    for (var i = 0; i < num1 * num1; i++) {
        tableArr[i].innerHTML = " <img id='blue' src='imeg/תמונה3.png' />";
    }
    hide_start = document.getElementById("start")
    hide_start.style.visibility = "hidden";
    w_turn = document.getElementById("whoturn");
    w_turn.innerHTML = "The turn now belongs to:";
    w_turn.style.color = "white";
    w_turn.style.visibility = "visible";

    m_turn = document.getElementById("myturn");
    m_turn.style.visibility = "visible";
    v_stop = document.getElementById("stop");
    v_stop.style.visibility = "visible";


    if (player == 0) {  // red player 
        m_turn.innerHTML = "red player";
        m_turn.style.color = "red";
    }
    else {
        m_turn.innerHTML = "yellow player";
        m_turn.style.color = "yellow";
    }
}


function createtable() {
    if (movingFlag == true) return;
    movingFlag = true;
    num1 = document.getElementById('select1').value;
    sequence = document.getElementById('select2').value;
    if (num1 == "backto7") {
        num1 = 7;
    }
    if (sequence == "backto4") {
        sequence = 4;
    }


    if (num1 < sequence) {
        alert("the sequence for winning in the game does not match to the number of cells in the table that you have chosen")
        document.getElementById('select1').value = "backto7";
        document.getElementById('select2').value = "backto4";
        movingFlag = false;
        return;
    }
    initializeArray(num1);
    buildTable(num1, sequence);

}




function pos(col) {
    if (arrcell[col][0].id == 1) {
        alert("the colum is fulled already,you must choose anoter place!!")
        return;
    }
    if (prevent_move == 0) {
        emptyCellIndex = findEmpty(col);
        stopHeight = emptyCellIndex * cellHeight + (emptyCellIndex - 1) * 32.5;


        if (player == 0) { // red player

            m_turn.innerHTML = "yellow player";
            m_turn.style.color = "yellow";

            c_disk = document.getElementById("disk");
            id_red++;
            redpicture = "<img  id='redcell" + id_red + "' src='imeg/עיגול אדום1.png' />";
            c_disk.innerHTML += redpicture;


            redImg = document.getElementById("redcell" + id_red + "");



            posX = col * cellWidth + 10;

            redImg.style.left = posX + "px";

            activePlayer = redImg;
        }
        else
            if (player == 1) {
                m_turn.innerHTML = "red player";
                m_turn.style.color = "red";
                c_disk = document.getElementById("disk");
                id_yellow++;
                yellowpicture = "<img id='yellowcell" + id_yellow + "' src='imeg/תמונה2.png' />";
                c_disk.innerHTML += yellowpicture;



                yellowImg = document.getElementById("yellowcell" + id_yellow + "");



                posY = col * cellWidth + 10;
                yellowImg.style.left = posY + "px";

                activePlayer = yellowImg;
            }

        move(200, col);

        if (player == 1) {
            player = 0;

        }

        else {
            player = 1;

        }
    }
}






function move(velY, col) {

    c = col;

    dt = 30;
    Y = 0;
    vy1 = velY / 1000
    prevent_move = 1;
    if (h == false) {
        h = setInterval("changepos(c)", dt);
    }
}


function changepos(col) {
    Y = Y + vy1 * dt;
    activePlayer.style.top = Y + "px";
    if (Y > stopHeight) {
        stop();
        prevent_move = 0;
        counter_col = win_by_col(col);
        emptyCellIndex--;
        counter_row = win_by_row(emptyCellIndex);
        counter_diagonal = win_by_diagonal(col, emptyCellIndex);


        if (counter_col == 0 || counter_row == 0 || counter_diagonal == 0) {



            declarewin = document.getElementById("declere");
            declarewin.innerHTML = "red player won!!";
            declarewin.style.color = "red";
            declarewin.style.visibility = "visible";
            prevent_move = 1;



            setTimeout("remove()", 5000);

        }
        else
            if (counter_col == 1 || counter_row == 1 || counter_diagonal == 1) {



                declarewin = document.getElementById("declere");
                declarewin.innerHTML = "yellow player won!!";
                declarewin.style.color = "yellow";
                declarewin.style.visibility = "visible";
                prevent_move = 1;



                setTimeout("remove()", 5000)

            }
    }

}

function stop() {
    if (h != false) {
        clearInterval(h);
        h = false;
    }

}
function newgame() {

    for (var i = id_yellow; i > 0; i--) {
        yellow_child = document.getElementById("yellowcell" + i + "");
        yellow_par = yellow_child.parentNode;
        yellow_par.removeChild(yellow_child);
    }
    for (var j = id_red; j > 0; j--) {
        red_child = document.getElementById("redcell" + j + "");
        red_par = red_child.parentNode;
        red_par.removeChild(red_child);
    }
    tbl_child = document.getElementById("tbl_id");
    partbl = tbl_child.parentNode;
    partbl.removeChild(tbl_child);
    movingFlag = false;

    w_turn.style.visibility = "hidden";
    m_turn.style.visibility = "hidden";
    hide_start.style.visibility = "visible";
    v_stop.style.visibility = "hidden";

    id_yellow = 0;
    id_red = 0;
    prevent_move = 0;
}
function remove() {
    newgame();
    declarewin.style.visibility = "hidden";

}


function win_by_col(col) {

    for (var j = 0; j < num1; j++) {
        if (arrcell[col][j].color == "red") {
            counter_col_red++;
            counter_col_yellow = 0;
            if (counter_col_red == sequence)
                return 0;
        }
        else

            if (arrcell[col][j].color == "yellow") {
                counter_col_yellow++;
                counter_col_red = 0;
                if (counter_col_yellow == sequence)
                    return 1;
            }

    }
    counter_col_red = 0;
    counter_col_yellow = 0;
    return 2;
}


function win_by_row(row) {

    for (var j = 0; j < num1; j++) {
        if (arrcell[j][row].color == "red") {
            counter_row_red++;
            counter_row_yellow = 0;
            if (counter_row_red == sequence)
                return 0;
        }
        else
            if (arrcell[j][row].color == "yellow") {
                counter_row_yellow++;
                counter_row_red = 0;
                if (counter_row_yellow == sequence)
                    return 1;
            }
            else
                if (arrcell[j][row].color == " ") {
                    counter_row_yellow = 0;
                    counter_row_red = 0;
                }
    }
    counter_row_yellow = 0;
    counter_row_red = 0;
    return 2;
}





conter_diagonal_red_one = 0;
conter_diagonal_red_two = 0;
conter_diagonal_yellow_one = 0;
conter_diagonal_yellow_two = 0;
function win_by_diagonal(col, row) {
    if (arrcell[col][row].color == "red") {
        conter_diagonal_red_one = 1;
        conter_diagonal_red_two = 1;
        conter_diagonal_yellow_one = 0;
        conter_diagonal_yellow_two = 0;
    }
    else {
        conter_diagonal_yellow_one = 1;
        conter_diagonal_yellow_two = 1;
        conter_diagonal_red_one = 0;
        conter_diagonal_red_two = 0;
    }
    for (var j = col + 1, i = row + 1; j < num1 && i < num1; j++ , i++) {
        if ((arrcell[j][i].color == "red") && (arrcell[col][row].color == "red")) {
            conter_diagonal_red_one++;
            conter_diagonal_yellow_one = 0;
            if (conter_diagonal_red_one == sequence)
                return 0;
        }
        else
            if ((arrcell[j][i].color == "yellow") && (arrcell[col][row].color == "yellow")) {
                conter_diagonal_yellow_one++;
                conter_diagonal_red_one = 0;
                if (conter_diagonal_yellow_one == sequence) { return 1; }
            }
            else
                if ((arrcell[j][i].color == " ") || ((arrcell[j][i].color == "red") && (arrcell[col][row].color == "yellow")) || ((arrcell[j][i].color == "yellow") && (arrcell[col][row].color == "red"))) {
                    break;
                }
    }
    for (var j = col - 1, i = row - 1; j >= 0 && i >= 0; j-- , i--) {
        if ((arrcell[j][i].color == "red") && (arrcell[col][row].color == "red")) {
            conter_diagonal_red_one++;
            conter_diagonal_yellow_one = 0;
            if (conter_diagonal_red_one == sequence)
                return 0;
        }
        else
            if ((arrcell[j][i].color == "yellow") && (arrcell[col][row].color == "yellow")) {
                conter_diagonal_yellow_one++;
                conter_diagonal_red_one = 0;
                if (conter_diagonal_yellow_one == sequence) { return 1; }
            }
            else
                if ((arrcell[j][i].color == " ") || ((arrcell[j][i].color == "red") && (arrcell[col][row].color == "yellow")) || ((arrcell[j][i].color == "yellow") && (arrcell[col][row].color == "red"))) {
                    break;
                }
    }
    for (var j = col + 1, i = row - 1; j < num1 && i >= 0; j++ , i--) {
        if ((arrcell[j][i].color == "red") && (arrcell[col][row].color == "red")) {
            conter_diagonal_red_two++;
            conter_diagonal_yellow_two = 0;
            if (conter_diagonal_red_two == sequence)
                return 0;
        }
        else
            if ((arrcell[j][i].color == "yellow") && (arrcell[col][row].color == "yellow")) {
                conter_diagonal_yellow_two++;
                conter_diagonal_red_two = 0;
                if (conter_diagonal_yellow_two == sequence) { return 1; }
            }
            else
                if ((arrcell[j][i].color == " ") || ((arrcell[j][i].color == "red") && (arrcell[col][row].color == "yellow")) || ((arrcell[j][i].color == "yellow") && (arrcell[col][row].color == "red"))) {
                    break;
                }
    }
    for (var j = col - 1, i = row + 1; j >= 0 && i < num1; j-- , i++) {
        if ((arrcell[j][i].color == "red") && (arrcell[col][row].color == "red")) {
            conter_diagonal_red_two++;
            conter_diagonal_yellow_two = 0;
            if (conter_diagonal_red_two == sequence)
                return 0;
        }
        else
            if ((arrcell[j][i].color == "yellow") && (arrcell[col][row].color == "yellow")) {
                conter_diagonal_yellow_two++;
                conter_diagonal_red_two = 0;
                if (conter_diagonal_yellow_two == sequence) { return 1; }
            }
            else
                if ((arrcell[j][i].color == " ") || ((arrcell[j][i].color == "red") && (arrcell[col][row].color == "yellow")) || ((arrcell[j][i].color == "yellow") && (arrcell[col][row].color == "red"))) {
                    break;
                }
    }

    return 2;
}

