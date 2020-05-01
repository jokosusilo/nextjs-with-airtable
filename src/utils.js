import fetch from 'isomorphic-unfetch';

const Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

export function getAllMessages () {
  return new Promise((resolve, reject) => {
    const allAirtablePosts = [];

    base(process.env.AIRTABLE_TABLE_NAME)
      .select({
        sort: [
          {
            field: 'created_at',
            direction: 'desc',
          },
        ],
      })
      .eachPage(
        (records, fetchNextPage) => {
          records.forEach((record) => {
            const post = {
              id: record.id,
              name: record.get('name'),
              subject: record.get('subject'),
              message: record.get('message'),
            };

            allAirtablePosts.push(post);
          });

          fetchNextPage();
        },
        (error) => {
          if (error) {
            console.error(error);
            reject({ error });
          }
          resolve(allAirtablePosts);
        }
      );
  });

}

export async function fetcher (...args) {
  const res = await fetch(...args);

  return res.json();
}