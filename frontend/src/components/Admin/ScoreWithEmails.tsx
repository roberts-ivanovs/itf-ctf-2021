import React, { ReactElement, useEffect, useState } from 'react';
import { Requester } from '../../utils/Requester';
import { BasicAPI, Score } from '../../utils/types';

export function ScoreboardWithEmails(): ReactElement {
  const [entries, setEntries] = useState<Array<Score>>([]);

  useEffect(() => {
    async function getEntries(): Promise<void> {
      const res = await Requester.getAllScores();
      setEntries(res.data);
    }
    void getEntries();
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Score</th>
        </tr>
      </thead>
      <tbody>
        {entries.sort((a, b) => b.score - a.score).map((e, num) => (
          <tr key={e.user.id}>
            <th scope="row">{num + 1}</th>
            <td>{e.user.name} {e.user.email}</td>
            <td>
              <abbr title={`Atbidlēja pareizi uz "${e.flags.map((i) => i.name).join('", "')}"`}>
                {e.score.toPrecision(2)}

              </abbr>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
