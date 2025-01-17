const fs = require('fs');
const path = require('path');

// Define the folder containing HTML files
const folderPath = 'C:\\Users\\PRUDENCE SCHOOL\\Desktop\\LEARNING HTML\\HTML BASICS'; // Replace with your folder path

// Define the digital signature to add
const digitalSignature = `
<!--
    Signature: 41e36d9f6558a42201186066cb38a90433ecff14a695c01674d2dacf4adfbad407cd6cc11a1d012a04bce204707f3791c462c35dd59844773e4254936f7d6f349ae22b0888869d2ad7091d0d4c8418cd9bd3cb2833424bdd9a9715f2e758c555203538a4db38842fa6c37465c70a47409fe243aff2b2f464baf0e196dc9d1af6308c4a770a06cc05a364cd9a7482c046429ffc9670ece82b23ee7f50cba8de7f464c68b4b3d085aa8458cb1bc8fd790e56c379d9ab23c412ebcf8555c8f0da9ef9e05322278396ffaae0d86d46ea74dcbac7cc63168210c023bb09e56497818ea42b6fffff9b07172f06b4a24ff794a195ce088f71734a5331610276c75c59b6
-->
`;

// Function to add the signature to all HTML files in the folder
function addSignatureToFiles() {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(folderPath, file);
            // Check if the file is an HTML file
            if (path.extname(file).toLowerCase() === '.html') {
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        console.error(`Error reading file ${file}:`, err);
                        return;
                    }

                    // Append the digital signature
                    const newData = `${data.trim()}\n${digitalSignature}`;
                    
                    fs.writeFile(filePath, newData, 'utf8', err => {
                        if (err) {
                            console.error(`Error writing file ${file}:`, err);
                        } else {
                            console.log(`Signature added to ${file}`);
                        }
                    });
                });
            } else {
                console.log(`Skipping non-HTML file ${file}`);
            }
        });
    });
}

// Run the function
addSignatureToFiles();
