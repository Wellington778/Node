import fs from 'fs';

export function log(req, res, next) {
    const date = new Date();
    let id = req.session.userId || '[ NOT LOGGED ]';

    // data format
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // string to append in file
    const log = `[${date.toLocaleString()}] ID: ${id} made a new request\nmethod: ${req.method} in: ${req.url}\n`;
    fs.appendFile(`logs/${day}-${month}-${year}.log`, log, (err) => {
        if (err)
            throw err;
    });

    next();
}
