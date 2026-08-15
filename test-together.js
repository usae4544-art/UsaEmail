async function test() {
  const res = await fetch('https://api.together.xyz/v1/videos/generations', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer key_Ce2v7SgaSGzN35ADRhjyQ',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "ali-vilab/wan-2.6-text-to-video",
      prompt: "A beautiful indian girl smiling"
    })
  });
  console.log(res.status, await res.text());
}
test();
