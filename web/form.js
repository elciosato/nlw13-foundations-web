import { api } from "./api";

const form = document.querySelector("#form");

const input = document.querySelector("#url");

const content = document.querySelector("#content");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const videoURL = input.value;

  content.classList.add("placeholder");

  if (!videoURL.includes("/shorts/")) {
    return (content.textContent = "This video doesn't seem to be a short");
  }

  const [_, params] = videoURL.split("/shorts/");

  const [videoId] = params.split("?");

  content.textContent = "Transcription..";

  const responseTranscription = await api.get(`/transcription/${videoId}`);

  const { transcription } = responseTranscription.data;
  console.log(transcription);
  content.textContent = transcription;

  const responseSummary = await api.post("/summary", { text: transcription });

  const { summary } = responseSummary.data;
  console.log(summary);
  content.textContent = summary;

  content.classList.remove("placeholder");
});
