
const path = require('path');
const fs = require('fs');
const pdf = require('pdf-parse');

module.exports = async function parseResume() {
  try {
    const filePath = path.resolve(process.cwd(), 'public', 'resume.pdf');
    console.log('🛠️ Reading resume from:', filePath);

    if (!fs.existsSync(filePath)) {
      console.error('❌ File not found:', filePath);
      return '';
    }

    const fileBuffer = fs.readFileSync(filePath);
    const data = await pdf(fileBuffer);
    return data.text;
  } catch (error) {
    console.error('❌ Failed to read resume.pdf:', error);
    return '';
  }
};
