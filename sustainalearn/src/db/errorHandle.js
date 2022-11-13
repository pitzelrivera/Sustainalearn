// stop where you are. don't look at this. i hate it. its ugly.

function readError(error) {
    var message = "";
    var table = "";
    var param = "";
    var value = "";
    //console.log(error);

    if ((error.data.sqlMessage).includes("Cannot add or update a child row: a foreign key constraint fails")) {
        let tableIndex = (error.data.sqlMessage).indexOf("`, CONSTRAINT `");
        let paramIndex = (error.data.sqlMessage).indexOf("` FOREIGN KEY (");

        table = (error.data.sqlMessage).slice(92, tableIndex);
        param = (error.data.sqlMessage).slice(tableIndex + 15, paramIndex);

        paramIndex = (error.data.sql).indexOf(param);
        let valuesIndex = (error.data.sql).indexOf("VALUES");
        var count = 0;

        for (let i = 0; i < valuesIndex; i++) {
            if (i === paramIndex) { break; }
            if ((error.data.sql)[i] === ',') { count++; }
        }

        var countAgain = 0;
        for (let i = valuesIndex + 8; i < (error.data.sql).length; i++) {
            if ((error.data.sql)[i] === ',') {
                countAgain++;
                i++;
            }
            if (countAgain === count) {
                for (let j = i; j < (error.data.sql).length; j++) {
                    if ((error.data.sql)[j] === '\'' && j !== i) {
                        value = (error.data.sql).slice(i+1, j);
                        break;
                    }
                }
                break;
            }
        }

        message = "Insert to " + table + " failed: " + param + "(" + value + ") invalid!";
    }

    if ((error.data.code).includes("ER_DUP_ENTRY")) {
        let paramIndex = (error.data.sqlMessage).indexOf(" for key ") + 10;

        param = (error.data.sqlMessage).slice(paramIndex, (error.data.sqlMessage).length - 1);
        if (param === "PRIMARY") { param = "id"; }

        value = (error.data.sqlMessage).slice(17, paramIndex - 11);

        let tableIndex = ((error.data.sql).slice(0, (error.data.sql).indexOf("VALUES"))).indexOf("(") -1;
        table = (error.data.sql).slice(12, tableIndex);

        message = "Insert to " + table + " failed: " + param + "(" + value + ") is a duplicate!";
    }

    return message;
};

export default readError;