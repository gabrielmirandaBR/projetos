// API utilizada:  https://www.scorebat.com/video-api/v1/

const input = document.querySelector('#competitions');
const btn = document.querySelector('#btn-search');
const teams = document.querySelector('.teams');
const select = document.getElementById('competitions');

const createOptions = ({ competition: { name } }) => { // falta excluir os options com o mesmo nome
  const option = document.createElement('option');

  option.value = name;
  option.innerText = name;
  option.id = 'competition-name';

  select.appendChild(option);
};

const fechNamesCompetitions = () => {
  fetch('https://www.scorebat.com/video-api/v1/')
  .then((response) => response.json())
  .then((names) => names
    .forEach((name) => {
      createOptions(name);
    }))
  .catch(() => alert('Erro ao conectar com o servidor'));
};

const renderTeam = (competitionName, date, highlights) => {
  const div = document.createElement('div');
  const spanMatch = document.createElement('span');
  const video = document.createElement('div');
  const dateMatch = document.createElement('span');
  
  div.className = 'is-flex-direction-column is-align-items-center card has-background-white-bis';
  spanMatch.className = 'is-flex is-align-items-center is-justify-content-center pt-4 title is-4';
  spanMatch.innerHTML = competitionName;
  dateMatch.className = 'is-flex is-align-items-center is-justify-content-center subtitle mt-2';
  dateMatch.innerHTML = `Data: ${new Date(date).toLocaleDateString()}`; 
  video.innerHTML = highlights;
  video.className = 'video-container';
  
  teams.appendChild(div);
  div.appendChild(spanMatch);
  div.appendChild(dateMatch);
  div.appendChild(video);
};

const getInformationsMatch = (data) => {
  teams.innerHTML = '';

  data
    .forEach(({ title, date, competition: { name }, embed }) => {
      if (name === input.value) {
        renderTeam(`Partida: ${title}`, `${date}`, `${embed}`);
      }
    });
};

const fechFootballCompetitions = () => {
  fetch('https://www.scorebat.com/video-api/v1/')
  .then((response) => response.json())
  .then((competitions) => {
    btn.addEventListener('click', () => {
      getInformationsMatch(competitions);
    });
  })
  .catch(() => alert('Erro ao conectar com o servidor'));
};

fechFootballCompetitions();

window.onload = () => {
  fechNamesCompetitions();
};
