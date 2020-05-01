import useSWR from 'swr';
import { fetcher } from '../utils'

const TableData = () => {
    const { data, error } = useSWR('api/messages', fetcher, {
      refreshInterval: 100,
    });

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    return (
        <>
        <table>
            <thead>
                <tr>
                <th className="">No</th>
                <th className="">Name</th>
                <th className="">Subject</th>
                <th className="">Message</th>
                </tr>
            </thead>
            <tbody>
            {data.map((message, index) => (
                <tr key={message.id}>
                    <td>{index + 1}</td>
                    <td>{message.name}</td>
                    <td>{message.subject}</td>
                    <td>{message.message}</td>
                </tr>
            ))}
            </tbody>
        </table>

        <style jsx>{`
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
      `}</style>
      </>
    )
}

export default TableData