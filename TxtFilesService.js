import fs from 'fs'
import path from 'path';

const TXT_FOLDER_PATH = 'Eurobet/files'

export default function emptyFilesFolder() {
    // Read the contents of the folder
    fs.readdir(TXT_FOLDER_PATH, (err, files) => {
        if (err) {
            console.error('Error reading folder:', err);
            return;
        }

        // Loop through the files in the folder
        files.forEach((file) => {
            const filePath = path.join(TXT_FOLDER_PATH, file);

            // Check if the file is a regular file (not a directory)
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error getting file stats:', err);
                    return;
                }

                if (stats.isFile()) {
                    // Empty the file by truncating it
                    fs.truncate(filePath, 0, (err) => {
                        if (err) {
                            console.error('Error emptying file:', err);
                        } else {
                            //intentionally left blank
                        }
                    });
                }
            });
        });
    })
}
