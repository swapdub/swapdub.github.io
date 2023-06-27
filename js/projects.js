let project;

fetch("/pages/projects.json")
  .then((j) => j.json())
  .then((j) => (project = j))
  // .then(() => console.log(project))
  .then(() => writeProj(project));

function writeProj(data) {
  let div = document.getElementById("personal");
  var content = "";
  for (let index = 0; index < data.length; index++) {
    const lang = data[index];
    content = `<h3>${lang.title}</h3>`;
    var projectHTML = "";
    for (let n = 0; n < lang.projects.length; n++) {
      projectHTML =
        projectHTML +
        `
          <li>
          <a
            href="${lang.projects[n].URL}"
            target="blank"
            rel="noopener noreferrer"
            ><h4>${lang.projects[n].Name}</h4></a
          >
          <p>${lang.projects[n].Description}</p>
          </li>`;
    }
    div.innerHTML = div.innerHTML + "<ul>" + content + projectHTML + "</ul>";
  }
}
