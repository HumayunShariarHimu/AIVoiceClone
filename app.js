let mediaRecorder;
let audioChunks = [];

document.getElementById("startBtn").onclick = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);
  audioChunks = [];

  mediaRecorder.ondataavailable = (event) => {
    audioChunks.push(event.data);
  };

  mediaRecorder.onstop = async () => {
    const blob = new Blob(audioChunks, { type: "audio/wav" });
    document.getElementById("player").src = URL.createObjectURL(blob);

    const formData = new FormData();
    formData.append("voice", blob);

    await fetch("/upload_voice", {
      method: "POST",
      body: formData
    });
  };

  mediaRecorder.start();
};

document.getElementById("stopBtn").onclick = () => {
  mediaRecorder.stop();
};

document.getElementById("speakBtn").onclick = async () => {
  const text = document.getElementById("text").value;
  const res = await fetch("/speak", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  const blob = await res.blob();
  document.getElementById("voiceOutput").src = URL.createObjectURL(blob);
};