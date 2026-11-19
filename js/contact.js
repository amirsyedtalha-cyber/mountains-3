const mountain = new URLSearchParams(window.location.search).get("mountain");
const messageField = document.getElementById("message");

if (mountain && messageField) {
  messageField.value = `I would like to book an expedition for ${mountain}`;
}
