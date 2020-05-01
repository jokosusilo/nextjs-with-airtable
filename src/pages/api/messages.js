import { getAllMessages } from '../../utils';

export default (req, res) => {
  return Promise.resolve(getAllMessages())
    .then((data) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(data));
    })
    .catch((error) => {
      console.log(error);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({}));
    });
};
