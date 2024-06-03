const fs = require('fs').promises;

function logReqRes(fileName) {
    return async (req, res, next) => {
        try {
            await fs.appendFile(
                fileName,
                `\n${new Date().toISOString()}: ${req.ip} ${req.method}: ${req.path}\n`
            );
        } catch (err) {
            console.error(`Failed to write to ${fileName}:`, err);
        }
        next();
    };
}

module.exports = {
    logReqRes
};
