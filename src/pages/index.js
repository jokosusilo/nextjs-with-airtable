import { useState } from 'react'
import Airtable from 'airtable'
import Head from 'next/head'
import TableData from '../components/TableData'

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

const Index = () => {
  const [formData, setFormData] = useState({});
  const [alert, setAlert] = useState({});

  const handleInput = (e) => {
    const tempFormData = { ...formData };
    tempFormData[e.target.name] = e.target.value;
    setFormData(tempFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    base(process.env.AIRTABLE_TABLE_NAME).create(
      [
        {
          fields: formData,
        },
      ],
      function (err) {
        if (err) {
          setAlert({
            type: 'error',
            message:
              'Error happened while sending good message to airtable. Refresh.',
          });
          return;
        }
        setAlert({
          type: 'success',
          message: 'Good message has been submitted.',
        });
        document.getElementById('form').reset();
      }
    );
  };

  return (
    <div className="container">
      <Head>
        <title>Next.js with Airtable</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Next.js with Airtable</h1>

        {/* <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p> */}

        <div className="flex">
          <div className="card form">
            <h3>Send Message Here</h3>

            {alert.message != null && (
              <div className={`alert ` + alert.type}>{alert.message}</div>
            )}

            <form id="form" action="" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  autoComplete="off"
                  required
                  onChange={handleInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  autoComplete="off"
                  required
                  onChange={handleInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  type="text"
                  rows="4"
                  name="message"
                  autoComplete="off"
                  onChange={handleInput}
                ></textarea>
              </div>
              <div className="form-group">
                <input type="submit" id="submit" />
              </div>
            </form>
          </div>
          <div className="card result">
            <h3>Message List</h3>

            <TableData />
          </div>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .flex {
          display: flex;
          align-items: baseline;
          width: 1000px;
          margin-top: 3rem;
        }

        .form {
          flex: 0 0 300px;
        }

        .result {
          flex: 1 1 auto;
        }

        .alert {
          border-radius: 4px;
          color: #fff;
          padding: 4px 8px;
          font-size: 13px;
          margin-bottom: 8px;
        }
        .alert.success {
          background-color: #0070f3;
        }
        .alert.error {
          background-color: #e00;
        }

        label {
          font-size: 14px;
          display: block;
          margin-bottom: 4px;
        }

        input,
        textarea {
          display: block;
          padding: 6px 12px;
          font-size: 14px;
          width: 100%;
          margin-bottom: 20px;
          outline: none;
          border-radius: 4px;
          border: 1px solid #bbbbbb;
        }
        input:focus,
        textarea:focus {
          border-color: #000;
        }

        input[type='submit'] {
          display: inline-block;
          background-color: #000;
          color: #fff;
          cursor: pointer;
          border-radius: 4px;
          border: none;
        }
        input[type='submit']:hover {
          background-color: rgba(0, 0, 0, 0.8);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        table {
          width: 100%;
          font-size: 13px;
          border-collapse: collapse;
        }
        table thead th,
        table tbody td {
          padding: 8px 12px;
        }
        table thead tr {
          background: #fafafa;
          border: 1px solid #eaeaea;
        }
        table thead th {
          font-weight: 400;
        }
        table thead th:first-child {
          width: 1%;
        }
        table tbody td {
          border-bottom: 1px solid #eaeaea;
          color: #777;
        }

        footer {
          width: 100%;
          padding: 2rem;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        .card {
          margin: 1rem;
          // flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 4px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .flex {
            width: 100%;
            flex-direction: column;
          }
          .form,
          .result{
            width: 100%;
            margin: 0;
          }

          .form{
            margin-bottom: 1rem;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default Index