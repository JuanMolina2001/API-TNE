function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function parseInfo(data) {
    if (data.includes("Persona no encontrada")) {
        return null
      }
    const text = data.split('<!DOCTYPE')[0]
    const newText = text.replace("<script language='javascript'>", '')
        .replace('</script><script >', '')
        .replace('</script>', '')
        .replaceAll("'", '"')
        .replace(/\n/g, "")
        .replace(/\t/g, "")
        .split(';')
    const result = newText.map((d, index) => {
        const data = d.split('=')
        if (data[1] === undefined || data[1].includes('green')) {
            return
        }
        let key = data[0].trim().replace('parent.document.getElementById("', '').replace('parent.document.frm_tne.', '').replace('parent.document.getElementById( ', '').replace(').style.color', '').replace(').value', '').replace('.value', '').replace('form_', '').replace('pers_', '').replaceAll("'", '')
        if (key.includes('_')) {
            key = key.split('_')
            key = [key[0], capitalizeFirstLetter(key[1])].join('').trim()
        }
        return `${index === 0 ? '{' : ''}"${key.replaceAll('"', "")}":${data[1]},`;
    }).join('').replace(/,([^,]*)$/, "}");
    return JSON.parse(result)
}
module.exports = parseInfo;