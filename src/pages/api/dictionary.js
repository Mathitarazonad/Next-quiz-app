// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const {word} = req.query;
  const response = fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  .then(resp => res.send(resp.ok))
}

