import fs from 'fs';
import XLSX from 'xlsx';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { logBlueMsg, logSuccessMsg } from './console/log.js';
export const readExcelFile = async () => {
    return new Promise((resolve, reject) => {
        try {
            const __dirname = dirname(fileURLToPath(import.meta.url));
            const filePath = path.join(__dirname, './data.xlsx');
            const stream = fs.createReadStream(filePath);
            const buffers = [];
            const dataList = [];
            stream.on('data', (chunk) => {
                buffers.push(chunk);
                logBlueMsg('new chunk Added Successfully');
            });
            stream.on('end', () => {
                logSuccessMsg('Stream Ended');
                const buffer = Buffer.concat(buffers);
                var workbook = XLSX.read(buffer, { type: "buffer" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const data = XLSX.utils.sheet_to_json(worksheet, {
                    header: 'A',
                    blankrows: false,
                    defval: '',
                });
                data.slice(4)
                    .forEach((row) => {
                    const newRow = [];
                    for (const value of Object.values(row)) {
                        if (value) {
                            newRow.push(value);
                        }
                    }
                    if (newRow.length === 10)
                        dataList.push(newRow);
                });
                resolve(dataList);
            });
            stream.on('error', (error) => {
                reject(error);
            });
        }
        catch (error) {
            // Reject the promise if an error occurs
            reject(error);
        }
    });
};
