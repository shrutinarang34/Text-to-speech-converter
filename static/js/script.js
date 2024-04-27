document
  .getElementById("convertForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const text = document.getElementById("text").value;
    if (text.trim() === "") {
      alert("Please enter some text");
      return;
    }
    fetch("/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ text }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          document.getElementById("audioControls").style.display = "block";
          document.getElementById("downloadButton").style.display = "block";
          const audioPlayer = document.getElementById("audioPlayer");
          audioPlayer.pause(); // Pause previous audio
          audioPlayer.currentTime = 0; // Reset audio playback
          audioPlayer.src = "static/audio/" + data.audio_file; // Use new filename
          audioPlayer.play();

          // Bind click event listener to the download button
          document
            .getElementById("downloadButton")
            .addEventListener("click", function () {
              const link = document.createElement("a");
              link.href = "static/audio/" + data.audio_file;
              link.download = data.audio_file;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            });
        } else {
          alert("Error converting text to speech");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error converting text to speech");
      });
  });
