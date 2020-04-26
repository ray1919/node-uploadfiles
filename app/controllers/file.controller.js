const uploadFolder = __basedir + '/uploads/';
const fs = require('fs');
const { execFile } = require('child_process');

exports.uploadFile = (req, res) => {
    // console.log(req);
    res.send('File uploaded successfully! -> filename = ' + req.file.filename);
}

exports.listUrlFiles = (req, res) => {
    fs.readdir(uploadFolder, (err, files) => {
        let host = "192.168.253.27";
        let port = "3030";
        for ( let i = 0; i < files.length; ++i) {
            files[i] = "http://" + host + ":" + port + "/api/file/" + files[i];
        }

        res.send(files)
    })
}

exports.downloadFile = (req, res) => {
    let filename = req.params.filename;
    let filepath = uploadFolder + filename;
    if (filepath.substr(-4,4) === "docx") {
        pdfpath = filepath.replace(/docx$/, "pdf");
        if (fs.existsSync(pdfpath)) {
            res.download(pdfpath);
        } else {
            const child = execFile('OfficeToPDF', [filepath.replace(/\//g,"\\")], (error, stdout, stderr) => {
                if (error) {
                    throw error;
                }
                res.download(pdfpath);
                console.log(pdfpath);
            });
        }
    } else {
        res.download(filepath);
    }
}
