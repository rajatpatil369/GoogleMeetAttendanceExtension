function getCurrentTimeAndDate(sep=' ') {
  const date = new Date();
  return `${date.toDateString()}${sep}[${date.toLocaleString().split(', ')[1]}]`;
}

function main() {
  console.log(`content.js: Taking attendance...`);
  do {
    temp = [];
    people = [`${window.location.href}\r\n\r\n${getCurrentTimeAndDate('\n')}\r\n\r\n`];
    total = parseInt(document.getElementsByClassName("rua5Nb")[0].textContent.slice(1, -1));
    // total = parseInt(document.getElementsByClassName("wnPUne N0PJ8e")[0].textContent);
    for (const div of document.getElementsByClassName("ZjFb7c")) {
      temp.push(`${div.textContent.trim().toLowerCase().split(' ').map((word) => `${word[0].toUpperCase()}${word.slice(1)}`).join(' ')}\r\n`);
    }
    file_name = `${getCurrentTimeAndDate().replaceAll(':', 'ː')}.txt`
  } while (! (total === temp.length))
  temp = Array.from(new Set(temp));
  len = temp.length.toString().length
  for (const name of temp) {
    people.push(`${temp.indexOf(name).toString().padStart(len, '0')}. ${name}`)
  }
  file_name = `${temp.length} - ${file_name}`;
  console.log(`content.js: Attendance taken. Downloading...`);
  const file = new Blob(people, {type: 'text/plain'});
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, file_name);
  } else {
    const a = document.createElement('a');
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = file_name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    );
  }
  console.log(`content.js: Done!`);
}

main();
