import fs from 'fs';
import pkg from 'jsonwebtoken'
const {verify} = pkg

export function log(req, res, next) {
    const date = new Date();
    let id = undefined;
    let level = undefined;

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    verify(req.headers['x-access-token'], 'heheBoy', (err, decoded) => {
        if (err)
            id = '[ NOT AUTHENTICATED ]';
        else
            id = decoded.userId;

        const log = `[${date.toLocaleString()}] ID: ${id} made a new request\nmethod: ${req.method} in: ${req.url}\n`;
        fs.appendFile(`logs/${day}-${month}-${year}.log`, log, (err) => {
            if (err)
                throw err;
        });

        next();
    });
}
