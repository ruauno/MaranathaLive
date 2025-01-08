document.addEventListener("DOMContentLoaded", () => {
  const statusElement = document.querySelector('button[name="noSignal"]');
  const playButton = document.querySelector('button[name="play"]');
  const pauseButton = document.querySelector('button[name="pause"]');
  const audio = document.querySelector('video[name="mioVideo"]');

  // Fetch lo stato dal file JSON
  fetch('data/status.json')
    .then(response => response.json())
    .then(data => {
      if (data.status === "Online") {
        statusElement.style.visibility = 'hidden';
        playButton.style.visibility = 'visible';
        pauseButton.style.visibility = 'hidden';
        playButton.disabled = false;
      } else {
        statusElement.innerText = data.message || "Servizio Inattivo";
        statusElement.style.visibility = 'visible';
        playButton.style.visibility = 'hidden';
        pauseButton.style.visibility = 'hidden';
        playButton.disabled = true;
        pauseButton.disabled = true;
      }
    })
    .catch(error => {
      console.error("Errore nel caricamento dello stato:", error);
    });

  // Controlli audio
  playButton.addEventListener('click', () => {
    audio.play();
    playButton.disabled = true;
    pauseButton.disabled = false;
    pauseButton.style.visibility = 'visible';
  });

  pauseButton.addEventListener('click', () => {
    audio.pause();
    playButton.disabled = false;
    pauseButton.disabled = true;
  });
});
